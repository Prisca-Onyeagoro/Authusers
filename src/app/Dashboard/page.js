'use client';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import React from 'react';

const page = () => {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      <p>You are seeing this part of the page because you are not signed in</p>
      <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
};

export default page;
