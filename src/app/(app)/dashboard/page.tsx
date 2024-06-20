'use client'
import React from 'react'
import { useSession } from 'next-auth/react'
import { User } from 'next-auth';
const Page = () => {

  // const { data: session } = useSession();
  // console.log(session?.user.username);
  // const { username } = session?.user as User;
  return (
    <>
    <div className="flex flex-col items-center justify-center h-screen text-white">
    <div className=''>Dashboard</div>
    {/* <div className=''>{session?.user.username}</div> */}
      
      </div>    
    </>
  )
}

export default Page