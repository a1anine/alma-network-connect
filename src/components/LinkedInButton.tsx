
import { Button } from "@/components/ui/button";

const LinkedInButton = () => {
  const handleLinkedInLogin = () => {
    // This is where we would integrate with LinkedIn OAuth
    console.log("LinkedIn login clicked - would redirect to LinkedIn OAuth");
    alert("LinkedIn integration would open here. This is a placeholder for OAuth integration.");
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
