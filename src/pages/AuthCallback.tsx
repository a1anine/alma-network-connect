
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      console.log("Auth callback processing...");
      
      try {
        const { data, error } = await supabase.auth.getSession();
        
        console.log("Session data:", data);
        
        if (error) {
          console.error('Auth callback error:', error);
          navigate('/');
          return;
        }
        
        // Redirect to profile page or home page after successful auth
        navigate(data.session ? '/profile' : '/');
      } catch (err) {
        console.error('Unexpected error in auth callback:', err);
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
      </div>
    </div>
  );
};

export default AuthCallback;
