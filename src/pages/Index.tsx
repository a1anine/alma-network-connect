import React, { useEffect } from 'react';
import LinkedInButton from '@/components/LinkedInButton';

const Index = () => {
  useEffect(() => {
    console.log('Base URL:', window.location.origin);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Welcome to Alma Network Connect</h1>
      <p className="text-gray-700 mb-4">Connect with professionals in your network.</p>
      <LinkedInButton />
      <h1>Base URL: {window.location.origin}</h1>
    </div>
  );
};

export default Index;
