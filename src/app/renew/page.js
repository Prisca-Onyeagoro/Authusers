'use client';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Renew() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: '',
    password: '',
  });
  const [disableButton, setdisableButton] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const renew = async () => {
    try {
      setLoading(true);
      const res = await axios.post('/api/users/renew', user);
      console.log('login success', res.data);
      setUser({ ...user, email: '', password: '' });
      if (res.data.status === 400) {
        toast.error(`${res.data.message}`, {
          position: toast.POSITION.TOP_CENTER,
        });
      }

      if (res.data.status !== 400) {
        toast.success(`${res.data.message}`, {
          position: toast.POSITION.TOP_CENTER,
        });
        router.push('/Login');
      }
    } catch (error) {
      toast.error(`${res.data.message}`, {
        position: toast.POSITION.TOP_CENTER,
      });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setdisableButton(false);
    } else {
      setdisableButton(true);
    }
  }, [user]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? 'processing... kindly wait :)' : 'Renew password'} </h1>
      <hr />

      <label htmlFor="Email">Email</label>
      <input
        className="p-2 border border-red-300 rounded-lg mb-4 focus:outline-none focus:border-red-900 text-black"
        type="text"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="Email"
      />

      <label htmlFor="Password">Password</label>
      <input
        className="p-2 border border-red-300 rounded-lg mb-4 focus:outline-none focus:border-red-900 text-black"
        type="text"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="Password"
      />
      <button
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-900"
        onClick={renew}
      >
        {disableButton ? 'Fill up the fields' : 'Renew Password'}
      </button>
    </div>
  );
}
