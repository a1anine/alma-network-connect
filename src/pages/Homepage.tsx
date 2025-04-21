
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import LinkedInButton from "@/components/LinkedInButton";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ConnectDialog from "@/components/ConnectDialog";

const Homepage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [universityFilter, setUniversityFilter] = useState("Stanford University");
  const [fieldFilter, setFieldFilter] = useState("");
  const [selectedLeader, setSelectedLeader] = useState<Leader | null>(null);

  // Sample data with more diverse fields
  const leaders = [
    {
      id: 1,
      name: "Dr. Sarah Chen",
      role: "Professor of Computer Science",
      company: "Stanford University",
      field: "Computer Science",
      alumniStatus: "Stanford '98",
      imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80",
    },
    {
      id: 2,
      name: "Michael Torres",
      role: "CTO",
      company: "TechVision Inc.",
      field: "Business",
      alumniStatus: "Stanford '05",
      imageUrl: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    },
    {
      id: 3,
      name: "Dr. Jennifer Patel",
      role: "Research Scientist",
      company: "GlobalHealth",
      field: "Biology",
      alumniStatus: "Emory '10",
      imageUrl: "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    },
    {
      id: 4,
      name: "Robert Washington",
      role: "Principal Researcher",
      company: "OpenAI",
      field: "Computer Science",
      alumniStatus: "Stanford '12",
      imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    },
    {
      id: 5,
      name: "Emma Rodriguez",
      role: "Professor of Literature",
      company: "Emory University",
      field: "Humanities",
      alumniStatus: "Emory '08",
      imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    },
    {
      id: 6,
      name: "Dr. James Kim",
      role: "Biotech Researcher",
      company: "BioPharma Solutions",
      field: "Biology",
      alumniStatus: "Stanford '15",
      imageUrl: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    }
  ];
  
  // For demo purposes, show connection dialog
  const handleConnect = (leader: Leader) => {
    setSelectedLeader(leader);
  };
  
  // Filter leaders based on field input and university
  const filteredLeaders = leaders.filter(leader => {
    const fieldMatch = !fieldFilter || leader.field.toLowerCase().includes(fieldFilter.toLowerCase());
    const universityMatch = leader.alumniStatus.includes(universityFilter.split(' ')[0]);
    return fieldMatch && universityMatch;
  });

  // Demo what happens after LinkedIn login
  const handleDemoLogin = () => {
    setIsLoggedIn(true);
    toast.success("Welcome to LinkBase! This is a demo experience.");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-1/2 mb-10 md:mb-0">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                  Connect With Leaders From Your Alma Mater
                </h1>
                <p className="text-lg md:text-xl mb-8 opacity-90">
                  LinkBase helps students build meaningful connections with industry and academia leaders who graduated from the same university.
                </p>
                {!isLoggedIn ? (
                  <div className="flex flex-col sm:flex-row gap-4 max-w-sm">
                    <LinkedInButton />
                    <Button variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/20" onClick={handleDemoLogin}>
                      Demo the Experience
                    </Button>
                  </div>
                ) : (
                  <Button className="bg-green-500 hover:bg-green-600 text-white">
                    View Your Network
                  </Button>
                )}
              </div>
              <div className="md:w-1/2 flex justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80" 
                  alt="Students networking" 
                  className="rounded-lg shadow-xl max-w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Demo Section (shown after login) */}
        {isLoggedIn && (
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="mb-12 text-center">
                <h2 className="text-3xl font-bold mb-4">Your Alumni Network</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Connect with these industry and academia leaders who share your alma mater. 
                  Send connection requests to start meaningful conversations.
                </p>
              </div>

              <div className="max-w-3xl mx-auto mb-8">
                <div className="flex gap-4">
                  <div className="flex-grow">
                    <Input 
                      placeholder="Filter by field (e.g., Computer Science, Business, Biology...)" 
                      value={fieldFilter}
                      onChange={(e) => setFieldFilter(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div className="w-56">
                    <div className="relative inline-flex">
                      <select 
                        className="appearance-none bg-white border border-gray-300 rounded-md pl-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
                        value={universityFilter}
                        onChange={(e) => setUniversityFilter(e.target.value)}
                      >
                        <option value="Stanford University">Stanford University</option>
                        <option value="Emory University">Emory University</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {filteredLeaders.map((leader) => (
                  <Card key={leader.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center gap-4 pb-2">
                      <img
                        src={leader.imageUrl}
                        alt={leader.name}
                        className="rounded-full w-16 h-16 object-cover border-2 border-blue-100"
                      />
                      <div>
                        <CardTitle>{leader.name}</CardTitle>
                        <CardDescription className="text-sm">
                          {leader.role} at {leader.company}
                        </CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-2">
                      <div className="flex flex-wrap gap-2 mb-3">
                        <Badge variant="outline" className="bg-blue-50">
                          {leader.alumniStatus}
                        </Badge>
                        <Badge variant="outline" className="bg-gray-50">
                          {leader.field}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">
                        Expert in {leader.field} with experience at leading organizations. 
                        Open to mentoring students in related fields.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => handleConnect(leader)}
                      >
                        Connect
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* How It Works Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">How LinkBase Works</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our platform makes it easy to connect with alumni leaders in just a few steps.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
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
                    className="text-blue-600"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Connect with LinkedIn</h3>
                <p className="text-gray-600">
                  Sign in with your LinkedIn account to verify your educational background.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
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
                    className="text-blue-600"
                  >
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Discover Leaders</h3>
                <p className="text-gray-600">
                  Browse through alumni who are leaders in your field of interest.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
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
                    className="text-blue-600"
                  >
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Meaningful Connections</h3>
                <p className="text-gray-600">
                  Reach out and establish valuable connections that can boost your career.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Stats Section */}
        <section className="bg-blue-50 py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-4xl mx-auto">
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <span className="text-4xl font-bold text-blue-600">500+</span>
                <p className="mt-2 text-gray-600">Universities</p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <span className="text-4xl font-bold text-blue-600">10k+</span>
                <p className="mt-2 text-gray-600">Alumni Leaders</p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <span className="text-4xl font-bold text-blue-600">25k+</span>
                <p className="mt-2 text-gray-600">Successful Connections</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      
      {/* Connection Dialog */}
      {selectedLeader && (
        <ConnectDialog
          leader={selectedLeader}
          onClose={() => setSelectedLeader(null)}
        />
      )}
    </div>
  );
};

export default Homepage;
