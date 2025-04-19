
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";

const LinkedInButton = () => {
  const { toast } = useToast();

  const handleLinkedInLogin = async () => {
    try {
      // Log the action for debugging
      console.log("Starting LinkedIn OAuth login...");
      
      // Use the exact redirect URL that's registered in LinkedIn and Supabase
      const redirectUrl = "http://link-base/auth/callback";
      console.log("Using hardcoded redirect URL:", redirectUrl);
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'linkedin_oidc',
        options: {
          redirectTo: redirectUrl,
          scopes: 'openid profile email',
        },
      });

      console.log("OAuth response:", data, error);

      if (error) {
        console.error("LinkedIn auth error:", error);
        toast({
          variant: "destructive",
          title: "Authentication Error",
          description: error.message,
        });
      }
    } catch (error) {
      console.error('LinkedIn auth error:', error);
      toast({
        variant: "destructive",
        title: "Authentication Error",
        description: "Failed to connect with LinkedIn",
      });
    }
  };

  return (
    <Button 
      onClick={handleLinkedInLogin}
      className="bg-linkedin hover:bg-linkedin-dark text-white flex items-center gap-2"
    >
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
      Connect with LinkedIn
    </Button>
  );
};

export default LinkedInButton;
