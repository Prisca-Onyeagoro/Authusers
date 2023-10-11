'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';

import React, { useEffect } from 'react';
import { toast } from 'react-toastify';

const passwordReset = () => {
  const router = useRouter();
  const [token, setToken] = React.useState('');

  const verifyToken = async () => {
    try {
      await axios.post('/api/users/verifytoken', { token });

      router.push('/renew');
    } catch (error) {
      toast.error('Server Error', {
        position: toast.POSITION.TOP_CENTER,
      });
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
      <h1 className="text-4xl">Verifying your identity......</h1>

      {toast.success('Verifying Your identity Wait......', {
        position: toast.POSITION.TOP_CENTER,
      })}
    </main>
  );
};

export default passwordReset;
