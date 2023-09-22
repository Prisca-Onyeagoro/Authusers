'use client';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

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
      console.log('signup success', res.data);
      router.push('/Login');
    } catch (error) {
      console.log('sign up failed', error.message);
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
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? 'Processing.... wait :)' : 'Sign up'}</h1>
      <hr />
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
      <Link href="/Login">Visit Login Page</Link>
    </div>
  );
}
