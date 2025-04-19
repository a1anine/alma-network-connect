
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const AuthCallback = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(true);

  useEffect(() => {
    const handleAuthCallback = async () => {
      console.log("Auth callback processing...");
      console.log("Full callback URL:", window.location.href);
      
      // Parse URL parameters
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      const state = urlParams.get('state');
      const error = urlParams.get('error');
      const errorDescription = urlParams.get('error_description');
      
      console.log("URL Parameters:", {
        code: code ? `${code.substring(0, 5)}...` : null, // Log partial code for privacy
        state: state,
        error: error,
        errorDescription: errorDescription
      });
      
      // Check for errors from LinkedIn
      if (error) {
        console.error('OAuth error from provider:', error, errorDescription);
        setError(`${error}: ${errorDescription || 'Unknown error'}`);
        toast.error('Authentication failed', {
          description: errorDescription || error
        });
        setProcessing(false);
        setTimeout(() => navigate('/'), 5000);
        return;
      }
      
      // Check if code is present
      if (!code) {
        const codeError = 'No authorization code received';
        console.error(codeError);
        setError(codeError);
        toast.error('Authentication failed', {
          description: 'No authorization code received from LinkedIn'
        });
        setProcessing(false);
        setTimeout(() => navigate('/'), 5000);
        return;
      }
      
      // Verify state to prevent CSRF attacks
      const savedState = localStorage.getItem('linkedin_oauth_state');
      console.log("State verification:", {
        receivedState: state,
        savedState: savedState,
        match: state === savedState
      });
      
      if (!savedState) {
        const stateError = 'No state parameter found in local storage';
        console.error(stateError);
        setError(stateError);
        toast.error('Authentication failed', {
          description: 'Security validation failed - missing state'
        });
        setProcessing(false);
        setTimeout(() => navigate('/'), 5000);
        return;
      }
      
      if (state !== savedState) {
        const stateError = 'Invalid state parameter - potential CSRF attack';
        console.error(stateError);
        setError(stateError);
        toast.error('Authentication failed', {
          description: 'Security validation failed - state mismatch'
        });
        setProcessing(false);
        setTimeout(() => navigate('/'), 5000);
        return;
      }
      
      // Clean up the state from localStorage
      localStorage.removeItem('linkedin_oauth_state');
      
      try {
        // In a real application, you would send this code to your backend
        // Your backend would exchange it for an access token using your client secret
        console.log("Authorization code received, proceeding with demo login");
        
        // For this demo, we'll simulate a successful login
        localStorage.setItem('demo_user', JSON.stringify({
          id: 'linkedin-user',
          name: 'LinkedIn User',
          email: 'linkedin@example.com',
          provider: 'linkedin'
        }));
        
        toast.success('Successfully authenticated with LinkedIn');
        setProcessing(false);
        navigate('/profile');
      } catch (err) {
        console.error('Error exchanging code for token:', err);
        setError('Failed to complete authentication');
        toast.error('Authentication failed', {
          description: 'Could not complete the authentication process'
        });
        setProcessing(false);
        setTimeout(() => navigate('/'), 5000);
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        {processing ? (
          <>
            <h2 className="text-2xl font-semibold mb-2">Authenticating with LinkedIn...</h2>
            <p className="text-muted-foreground">Please wait while we complete your authentication.</p>
            <div className="mt-4 flex justify-center">
              <div className="animate-spin h-8 w-8 border-4 border-linkedin border-t-transparent rounded-full"></div>
            </div>
          </>
        ) : error ? (
          <div className="mt-4 p-4 bg-red-100 text-red-800 rounded-md">
            <h2 className="text-xl font-semibold mb-2">Authentication Error</h2>
            <p>{error}</p>
            <p className="mt-4 text-sm text-gray-600">Redirecting you back to the home page...</p>
          </div>
        ) : (
          <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-md">
            <h2 className="text-xl font-semibold mb-2">Authentication Successful</h2>
            <p>You have successfully authenticated with LinkedIn.</p>
            <p className="mt-4 text-sm text-gray-600">Redirecting you to your profile...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthCallback;
