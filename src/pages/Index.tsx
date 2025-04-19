
import React, { useEffect, useState } from 'react';
import LinkedInButton from '@/components/LinkedInButton';

const Index = () => {
  const [baseUrl, setBaseUrl] = useState<string>('');
  const [redirectUrl, setRedirectUrl] = useState<string>('');

  useEffect(() => {
    const base = window.location.origin;
    const redirect = `${base}/auth/callback`;
    setBaseUrl(base);
    setRedirectUrl(redirect);
    console.log('Base URL:', base);
    console.log('Redirect URL:', redirect);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Welcome to Alma Network Connect</h1>
      <p className="text-gray-700 mb-4 text-center">Connect with professionals in your network.</p>
      
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mb-8">
        <h2 className="text-xl font-semibold mb-4">URL Information</h2>
        <p className="mb-2"><strong>Base URL:</strong> {baseUrl}</p>
        <p className="mb-4"><strong>Redirect URL:</strong> {redirectUrl}</p>
        <p className="text-sm text-gray-500 mb-6">
          Make sure this exact redirect URL is registered in both LinkedIn Developer Console and Supabase Authentication settings.
        </p>
        <LinkedInButton />
      </div>
    </div>
  );
};

export default Index;
