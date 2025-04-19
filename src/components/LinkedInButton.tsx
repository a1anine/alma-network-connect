
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useState, useEffect } from "react";

const LinkedInButton = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState("");

  useEffect(() => {
    // Log critical information on component mount
    const origin = window.location.origin;
    const callback = `${origin}/auth/callback`;
    console.log("LinkedIn OAuth debugging:");
    console.log("- Origin:", origin);
    console.log("- Callback URL:", callback);
    console.log("- Client ID: 86gzu6xki6tm4d");
    
    setRedirectUrl(callback);
  }, []);

  const handleLinkedInLogin = async () => {
    try {
      setIsLoading(true);
      
      const clientId = "86gzu6xki6tm4d"; // LinkedIn Client ID
      const redirectUri = encodeURIComponent(redirectUrl);
      const scope = encodeURIComponent("r_emailaddress r_liteprofile");
      const state = Math.random().toString(36).substring(2);
      
      // Store state in localStorage for verification when user returns
      localStorage.setItem("linkedin_oauth_state", state);
      
      // Construct the LinkedIn authorization URL
      const linkedInAuthUrl = 
        `https://www.linkedin.com/oauth/v2/authorization?` +
        `response_type=code` +
        `&client_id=${clientId}` +
        `&redirect_uri=${redirectUri}` +
        `&state=${state}` +
        `&scope=${scope}`;
      
      // Log the complete auth URL for debugging
      console.log("Redirecting to LinkedIn URL:", linkedInAuthUrl);
      
      toast({
        title: "Redirecting to LinkedIn",
        description: "You'll be redirected to LinkedIn to authorize.",
      });
      
      // Redirect the user to LinkedIn login with a slight delay for toast visibility
      setTimeout(() => {
        window.location.href = linkedInAuthUrl;
      }, 1000);
      
    } catch (error) {
      console.error('LinkedIn auth error:', error);
      toast({
        variant: "destructive",
        title: "Authentication Error",
        description: "Failed to connect with LinkedIn",
      });
      setIsLoading(false);
    }
  };

  return (
    <Button 
      onClick={handleLinkedInLogin}
      disabled={isLoading}
      className="bg-[#0077B5] hover:bg-[#005e8d] text-white flex items-center gap-2 w-full justify-center"
    >
      {isLoading ? (
        <span className="animate-spin mr-2">◌</span>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
        >
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect width="4" height="12" x="2" y="9" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      )}
      Connect with LinkedIn
    </Button>
  );
};

export default LinkedInButton;
