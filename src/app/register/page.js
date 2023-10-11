'use client';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Image from 'next/image';
import { toast } from 'react-toastify';

export default function Signup() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: '',
    name: '',
    password: '',
    contact: '',
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const Onsignup = async () => {
    try {
      setLoading(true);
      const res = await axios.post('/api/users/register', user);
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
    if (
      user.email.length > 0 &&
      user.name.length > 0 &&
      user.password.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  useEffect(() => {
    if (
      user.email.length < 0 ||
      user.name.length < 0 ||
      user.password.length < 0
    ) {
      toast.error('fill the empty fields', {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }, [user]);

  return (
    <main className="flex flex-col items-center w-full justify-center min-h-screen py-2 px-20">
      {/*Register section    */}

      <h1 className="text-yellow-50 font-extrabold text-lg ">
        {loading ? 'Processing.... wait :)' : 'Sign up'}
      </h1>

      <label htmlFor="NAME">NAME</label>
      <input
        className="p-2 border border-red-300 rounded-lg mb-4 focus:outline-none focus:border-red-900 text-black"
        type="text"
        id="name"
        value={user.name}
        onChange={(e) => setUser({ ...user, name: e.target.value })}
        placeholder="Name"
      />
      <label htmlFor="Email">Email</label>
      <input
        className="p-2 border border-red-300 rounded-lg mb-4 focus:outline-none focus:border-red-900 text-black"
        type="text"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="Email"
      />
      <label htmlFor="Contact">Contact</label>
      <input
        className="p-2 border border-red-300 rounded-lg mb-4 focus:outline-none focus:border-red-900 text-black"
        type="text"
        id="contact"
        value={user.contact}
        onChange={(e) => setUser({ ...user, contact: e.target.value })}
        placeholder="Contact"
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
        onClick={Onsignup}
      >
        {buttonDisabled ? 'No signup' : 'Sign up'}
      </button>
    </main>
  );
}
