'use client';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>Welcome</h1>
        <hr />

        <hr />

        <button className="bg-green-950 text-white py-2 px-4 hover:bg-green-800 font-bold">
          <Link href={'/profile'}>See Your Profile</Link>
        </button>
      </div>
    </>
  );
}
