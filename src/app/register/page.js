'use client';
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function Signup() {
  const [user, setUser] = React.useState({
    email: '',
    name: '',
    password: '',
    contact: '',
  });

  const Onsignup = async () => {};
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Signup</h1>
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
        Signup here
      </button>
      <Link href="/Login">Visit Login Page</Link>
    </div>
  );
}
