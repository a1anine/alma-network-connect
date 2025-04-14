
import { CheckCircle } from "lucide-react";

const Features = () => {
  return (
    <section id="features" className="py-20 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Features that Make Networking <span className="gradient-text">Effortless</span>
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Our platform is designed to streamline the process of finding and connecting with alumni from your university.
            </p>
          </div>
        </div>
        
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-linkedin" />
              <h3 className="font-semibold">LinkedIn Integration</h3>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Connect securely with your LinkedIn account to leverage existing professional data.
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-linkedin" />
              <h3 className="font-semibold">Educational Institution Detection</h3>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              We automatically identify your educational background to find relevant connections.
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-linkedin" />
              <h3 className="font-semibold">Advanced Filtering</h3>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Filter alumni by industry, graduation year, location, and more to find the right connections.
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-linkedin" />
              <h3 className="font-semibold">Connection Recommendations</h3>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Get personalized recommendations for alumni you should connect with based on your goals.
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-linkedin" />
              <h3 className="font-semibold">Direct Messaging</h3>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Reach out to alumni with personalized messages directly through our platform.
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-linkedin" />
              <h3 className="font-semibold">Privacy Controls</h3>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Control what information is shared and who can contact you with robust privacy settings.
            </p>
          </div>
        </div>
        
        <div className="mt-16 flex justify-center">
          <div className="rounded-lg bg-card p-8 shadow-lg border max-w-3xl">
            <h3 className="text-2xl font-bold mb-4 text-center">How It Works</h3>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-linkedin text-white">
                  <span className="font-bold">1</span>
                </div>
                <h4 className="font-semibold">Connect LinkedIn</h4>
                <p className="mt-2 text-sm text-muted-foreground">
                  Securely link your LinkedIn account to get started
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-linkedin text-white">
                  <span className="font-bold">2</span>
                </div>
                <h4 className="font-semibold">Verify University</h4>
                <p className="mt-2 text-sm text-muted-foreground">
                  Confirm your educational institution details
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-linkedin text-white">
                  <span className="font-bold">3</span>
                </div>
                <h4 className="font-semibold">Browse & Connect</h4>
                <p className="mt-2 text-sm text-muted-foreground">
                  Discover alumni and start building your network
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
