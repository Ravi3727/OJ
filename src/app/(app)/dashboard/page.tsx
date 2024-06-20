'use client'
import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import { User } from 'next-auth';
import { useRouter } from 'next/navigation';

const Page = () => {
  // const [sessions,setSessions] = useState({});
  const router = useRouter();
  const session = useSession();

  // setSessions(session);
  
  if(session?.status !== 'authenticated'){
    // console.log("no session", session);
    router.replace('/signIn');
  }
  
  return (
    <>
    <div className="flex flex-col items-center justify-center h-screen text-balck bg-gray-200">
    <div className=''>Dashboard</div>
    <div className=''>{session?.data?.user.username}</div>
      
      </div>    
    </>
  )
}

export default Page