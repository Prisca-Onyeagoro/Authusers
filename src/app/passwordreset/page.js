'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { NextResponse } from 'next/server';
import React, { useEffect } from 'react';

const passwordReset = () => {
  const router = useRouter();
  const [token, setToken] = React.useState('');

  const verifyToken = async () => {
    try {
      await axios.post('/api/users/verifytoken', { token });
      router.push('/renew');
    } catch (error) {
      return new NextResponse(
        JSON.stringify({ message: 'error occured --->' + error.message })
      );
    }
  };

  useEffect(() => {
    const tokenUrl = window.location.search.split('=')[1];
    setToken(tokenUrl);
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyToken();
    }
  }, [token]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">Verifying your identity</h1>
      <h2 className="p-2 bg-orange-500 text-black">
        {token ? `${token}` : 'no token'}
      </h2>
    </main>
  );
};

export default passwordReset;
