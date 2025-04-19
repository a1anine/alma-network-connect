
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const getProfile = async () => {
      setLoading(true);
      
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error || !session) {
        console.error('Error fetching session:', error);
        navigate('/');
        return;
      }
      
      setUserData(session.user);
      setLoading(false);
    };
    
    getProfile();
  }, [navigate]);

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        toast({
          variant: "destructive",
          title: "Sign Out Error",
          description: error.message,
        });
        return;
      }
      
      toast({
        title: "Signed out successfully",
      });
      
      navigate('/');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Loading profile...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6">Your Profile</h1>
        
        {userData && (
          <div className="space-y-4">
            <div>
              <h2 className="font-semibold text-lg">Email</h2>
              <p className="text-gray-600 dark:text-gray-300">{userData.email || 'Not provided'}</p>
            </div>
            
            <div>
              <h2 className="font-semibold text-lg">User ID</h2>
              <p className="text-gray-600 dark:text-gray-300">{userData.id}</p>
            </div>

            {userData.user_metadata && (
              <div>
                <h2 className="font-semibold text-lg">LinkedIn Info</h2>
                <pre className="bg-gray-100 dark:bg-gray-700 p-2 rounded text-xs overflow-auto">
                  {JSON.stringify(userData.user_metadata, null, 2)}
                </pre>
              </div>
            )}
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
