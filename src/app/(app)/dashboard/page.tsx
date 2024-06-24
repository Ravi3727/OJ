"use client";
import React from "react";
import { useSession } from "next-auth/react";

const Page = () => {
  const session = useSession();
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen text-balck bg-black/[90] text-white">
        <div className="">Dashboard</div>
        <div className="">{session?.data?.user.username}</div>
      </div>
    </>
  );
};

export default Page;
