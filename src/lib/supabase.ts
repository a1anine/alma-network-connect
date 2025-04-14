
import { createClient } from '@supabase/supabase-js';

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
      // This helps during development when env variables might not be set
      // In production with Lovable's Supabase integration, the real values will be used
      const fallbackUrl = window.SUPABASE_URL || 'https://your-project.supabase.co';
      const fallbackKey = window.SUPABASE_ANON_KEY || 'your-anon-key';
      
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
