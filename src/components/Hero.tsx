
import { Button } from "@/components/ui/button";
import LinkedInButton from "./LinkedInButton";

const Hero = () => {
  return (
    <section className="py-20 md:py-32 overflow-hidden">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              Connect with <span className="gradient-text">Alumni</span> from Your University
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Discover and connect with professionals who graduated from your alma mater.
              Build meaningful networks and open new career opportunities.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 min-[400px]:flex-row justify-center">
            <LinkedInButton />
            <Button variant="outline">Learn More</Button>
          </div>
        </div>
      </div>
      
      <div className="relative mt-16 w-full overflow-hidden">
        <div className="mx-auto w-full max-w-6xl px-4">
          <div className="relative rounded-xl border bg-card p-2 shadow-lg">
            <div className="overflow-hidden rounded-lg border bg-background">
              <div className="p-8">
                <div className="grid gap-8 md:grid-cols-3">
                  <div className="flex flex-col items-center space-y-2 rounded-lg border p-4 animate-fade-up" style={{ animationDelay: "0.1s" }}>
                    <div className="h-16 w-16 rounded-full bg-linkedin/10 flex items-center justify-center">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="24" 
                        height="24" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        className="text-linkedin"
                      >
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold">Connect With Alumni</h3>
                    <p className="text-center text-muted-foreground">
                      Find and connect with graduates from your university working in your field.
                    </p>
                  </div>
                  <div className="flex flex-col items-center space-y-2 rounded-lg border p-4 animate-fade-up" style={{ animationDelay: "0.2s" }}>
                    <div className="h-16 w-16 rounded-full bg-linkedin/10 flex items-center justify-center">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="24" 
                        height="24" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        className="text-linkedin"
                      >
                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold">Explore Opportunities</h3>
                    <p className="text-center text-muted-foreground">
                      Discover job opportunities, mentorships, and collaborations within your alumni network.
                    </p>
                  </div>
                  <div className="flex flex-col items-center space-y-2 rounded-lg border p-4 animate-fade-up" style={{ animationDelay: "0.3s" }}>
                    <div className="h-16 w-16 rounded-full bg-linkedin/10 flex items-center justify-center">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="24" 
                        height="24" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        className="text-linkedin"
                      >
                        <line x1="12" x2="12" y1="20" y2="10" />
                        <line x1="18" x2="18" y1="20" y2="4" />
                        <line x1="6" x2="6" y1="20" y2="16" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold">Grow Your Network</h3>
                    <p className="text-center text-muted-foreground">
                      Build professional relationships that advance your career and expand your influence.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
