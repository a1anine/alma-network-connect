
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";
import { useState } from "react";

const LinkedInButton = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleLinkedInLogin = async () => {
    try {
      setIsLoading(true);
      console.log("Starting LinkedIn OAuth login...");
      
      // Use the full absolute URL to ensure consistency
      const redirectUrl = `${window.location.origin}/auth/callback`;
      console.log("Using redirect URL:", redirectUrl);
      
      // Log the full request details for debugging
      console.log("OAuth request details:", {
        provider: 'linkedin_oidc',
        redirectTo: redirectUrl,
        scopes: 'openid profile email',
      });
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'linkedin_oidc',
        options: {
          redirectTo: redirectUrl,
          scopes: 'openid profile email',
        },
      });

      console.log("OAuth response:", data, error);

      if (error) {
        console.error("LinkedIn auth error details:", error);
        toast({
          variant: "destructive",
          title: "Authentication Error",
          description: error.message,
        });
      }
    } catch (error) {
      console.error('LinkedIn auth unexpected error:', error);
      toast({
        variant: "destructive",
        title: "Authentication Error",
        description: "Failed to connect with LinkedIn",
      });
    } finally {
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
