
import { createClient } from '@supabase/supabase-js';

// Extend the Window interface to include Supabase-related properties
declare global {
  interface Window {
    SUPABASE_URL?: string;
    SUPABASE_ANON_KEY?: string;
  }
}

// When using Lovable's Supabase integration, these variables are automatically injected
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// For development purposes, provide fallback values
let supabase;

try {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase environment variables not found. Using fallback configuration for development.');
    
    // Check if we're in a browser environment
    if (typeof window !== 'undefined') {
      // In development, use window variables if available (set by dev tools)
      const fallbackUrl = window.SUPABASE_URL || '';
      const fallbackKey = window.SUPABASE_ANON_KEY || '';
      
      if (!fallbackUrl || !fallbackKey || fallbackUrl.includes('your-project')) {
        console.error('Valid Supabase credentials not found. Please set environment variables or provide values in the console.');
        throw new Error('Missing valid Supabase credentials');
      }
      
      supabase = createClient(fallbackUrl, fallbackKey);
    } else {
      throw new Error('Missing Supabase environment variables and not in browser environment');
    }
  } else {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
  }
} catch (error) {
  console.error('Failed to initialize Supabase client:', error);
  // Create a mock client for graceful fallback
  supabase = {
    auth: {
      signInWithOAuth: () => Promise.resolve({ error: new Error('Supabase client not properly initialized') }),
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
    },
  };
}

export { supabase };
