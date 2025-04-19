
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface DemoUser {
  id: string;
  name: string;
  email: string;
  provider: string;
}

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<DemoUser | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in
    const userJson = localStorage.getItem('demo_user');
    if (!userJson) {
      toast.error('Please log in to view your profile');
      navigate('/');
      return;
    }
    
    try {
      const userData = JSON.parse(userJson) as DemoUser;
      setUser(userData);
    } catch (error) {
      console.error('Error parsing user data:', error);
      toast.error('Invalid user data');
      navigate('/');
      return;
    }
    
    setLoading(false);
  }, [navigate]);

  const handleSignOut = () => {
    localStorage.removeItem('demo_user');
    toast.success('Signed out successfully');
    navigate('/');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Loading profile...</h2>
          <div className="mt-4 flex justify-center">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6">Your Profile</h1>
        
        {user && (
          <div className="space-y-4">
            <div>
              <h2 className="font-semibold text-lg">Name</h2>
              <p className="text-gray-600 dark:text-gray-300">{user.name}</p>
            </div>
            
            <div>
              <h2 className="font-semibold text-lg">Email</h2>
              <p className="text-gray-600 dark:text-gray-300">{user.email}</p>
            </div>
            
            <div>
              <h2 className="font-semibold text-lg">Provider</h2>
              <p className="text-gray-600 dark:text-gray-300">{user.provider}</p>
            </div>
            
            <div>
              <h2 className="font-semibold text-lg">User ID</h2>
              <p className="text-gray-600 dark:text-gray-300">{user.id}</p>
            </div>
          </div>
        )}
        
        <div className="mt-8">
          <Button onClick={handleSignOut} variant="destructive" className="w-full">
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
