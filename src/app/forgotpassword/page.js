'use client';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { NextResponse } from 'next/server';
import React from 'react';
import { toast } from 'react-toastify';

const forgotpassword = () => {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: '',
  });
  const [isloading, setisLoading] = React.useState(false);
  const forgot = async () => {
    try {
      setisLoading(true);
      const res = await axios.post('/api/users/resetpassword', user);
      console.log('success', res.data);

      if (res.data.status == 400) {
        toast.error(`${res.data.message}`, {
          position: toast.POSITION.TOP_CENTER,
        });
      }

      if (res.data.status !== 400) {
        toast.success(`${res.data.message}`, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } catch (error) {
      toast.error('Server Error', {
        position: toast.POSITION.TOP_CENTER,
      });
    } finally {
      setisLoading(false);
    }
  };
  return (
    <main>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>
          {isloading ? 'processing... kindly wait :)' : 'Forgot Password'}{' '}
        </h1>
        <hr />

        <label htmlFor="Email">Enter your email address</label>

        <input
          className="mt-10 p-2 border border-red-300 rounded-lg mb-4 focus:outline-none focus:border-red-900 text-black"
          type="text"
          id="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Email"
        />
        <p className="mt-5">
          if this was a mistake visit the{' '}
          <Link href={'/Login'} className="text-red-600">
            Login Page
          </Link>
        </p>
        <button
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-900 mt-4"
          onClick={forgot}
        >
          Submit
        </button>
      </div>
    </main>
  );
};

export default forgotpassword;
