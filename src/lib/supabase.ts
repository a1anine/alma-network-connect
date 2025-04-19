
import { createClient } from '@supabase/supabase-js';

// Constants from your Supabase project
const SUPABASE_URL = "https://lyoxauztcrpdheumyubd.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5b3hhdXp0Y3JwZGhldW15dWJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ2NzM4OTcsImV4cCI6MjA2MDI0OTg5N30.2MJ2HLQfOrvf1_cCI1M353ThZ131Vwz6nlaygsHTFQo";

// Create and export the Supabase client
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    storage: localStorage,
    flowType: 'pkce', // Ensure we're using PKCE auth flow for security
    debug: true // Enable debug mode to see more information in console
  }
});

// Log auth state changes for debugging
supabase.auth.onAuthStateChange((event, session) => {
  console.log('Auth event:', event);
  console.log('Session data:', session);
});
