'use client';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function Profile() {
  const [user, setUser] = React.useState('Your Profile');
  const router = useRouter();

  const logout = async () => {
    try {
      await axios.get('/api/users/logout');
      router.push('/Login');
    } catch (error) {
      console.log(error.message);
    }
  };

  const getDetails = async () => {
    const res = await axios.get('/api/users/me');
    setUser(res.data.data.name);
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p>{user === 'Your Profile' ? 'Your Profile' : user}</p>
      <hr />
      <button
        onClick={logout}
        className="bg-red-950 text-white py-2 px-4 hover:bg-red-800 font-bold"
      >
        Logout
      </button>
      <hr />
      <button
        onClick={getDetails}
        className="bg-green-950 text-white py-2 px-4 hover:bg-green-800 font-bold"
      >
        See Your Profile
      </button>
    </div>
  );
}
