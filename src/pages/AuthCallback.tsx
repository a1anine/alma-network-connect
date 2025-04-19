
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

const AuthCallback = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleAuthCallback = async () => {
      console.log("Auth callback processing...");
      console.log("URL:", window.location.href);
      
      // Parse URL parameters to check for error messages from OAuth provider
      const urlParams = new URLSearchParams(window.location.search);
      const oauthError = urlParams.get('error');
      const oauthErrorDescription = urlParams.get('error_description');
      
      if (oauthError) {
        console.error('OAuth error from provider:', oauthError, oauthErrorDescription);
        setError(`${oauthError}: ${oauthErrorDescription}`);
        toast.error('Authentication failed', {
          description: oauthErrorDescription || oauthError
        });
        setTimeout(() => navigate('/'), 5000);
        return;
      }
      
      try {
        // Get the session first to check if we're already authenticated
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        
        console.log("Current session data:", sessionData);
        
        if (sessionError) {
          console.error('Session error:', sessionError);
          setError('Failed to retrieve session');
          toast.error('Authentication failed', {
            description: sessionError.message
          });
          return;
        }

        // If we already have a session, redirect to profile page
        if (sessionData.session) {
          console.log("User already authenticated, redirecting to profile");
          toast.success('Successfully authenticated');
          navigate('/profile');
          return;
        }

        // Try to exchange the code for a session
        // This is handled automatically by Supabase, but we need to check for errors
        const { data, error } = await supabase.auth.getUser();
        
        console.log("Auth callback user data:", data);
        
        if (error) {
          console.error('Auth callback error:', error);
          setError(error.message);
          toast.error('Authentication failed', {
            description: error.message
          });
          navigate('/');
          return;
        }
        
        if (data.user) {
          console.log("Authentication successful, user:", data.user);
          toast.success('Successfully signed in');
          navigate('/profile');
        } else {
          console.log("No user found after callback");
          setError('No user data returned');
          navigate('/');
        }
      } catch (err) {
        console.error('Unexpected error in auth callback:', err);
        setError('Unexpected error during authentication');
        navigate('/');
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-2">Authenticating...</h2>
        <p className="text-muted-foreground">Please wait while we complete the authentication process.</p>
        {error && (
          <div className="mt-4 p-4 bg-red-100 text-red-800 rounded-md">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthCallback;
