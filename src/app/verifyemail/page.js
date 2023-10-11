'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const OtpRoute = () => {
  const router = useRouter();
  const [token, setToken] = React.useState('');
  const [verified, setVerified] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [isloading, setisLoading] = React.useState(false);
  const verifyUserEmail = async () => {
    try {
      setisLoading(true);
      await axios.post('/api/users/verifyemail', { token });
      setVerified(true);
      alert('success');
      // router.push('/otp');
    } catch (error) {
      setError(true);
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    const urltoken = window.location.search.split('=')[1];
    setToken(urltoken);
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);
  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">Verify your email</h1>
      <h2 className="p-2 bg-orange-500 text-black">
        {token ? `${token}` : 'no token'}
      </h2>

      {verified && (
        <div>
          <h2 className="text-2xl">Email verified</h2>
        </div>
      )}
    </main>
  );
};

export default OtpRoute;
