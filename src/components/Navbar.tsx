"use client";
import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { User } from "next-auth";
import { Button } from "./ui/button";
import { ModeToggle } from "./ui/ModeToggle";
const Navbar = () => {
  const { data: session } = useSession();
  const user: User = session?.user;
  return (
    <nav>
      <div className="flex items-center flex-row justify-between bg-gray-100 border-b-1 shadow-lg p-4 ">
        <Link href="/">
          <Button className="bg-violet-900 hover:bg-gray-700 text-white">Home</Button>
        </Link>
        <div className="flex gap-4">
        
          {session ? (
            <>
              <span className="text-lg text-black \">
                Welcome <span className="text-blue-900 font-bold ">{user?.username}</span>
              </span>
              <Button className="bg-violet-900 hover:bg-gray-700 text-white" onClick={() => signOut()}>LogOut </Button>
            </>
          ) : (
            <Link href="/signIn">
              <Button className="bg-violet-900 hover:bg-gray-700 text-white">LogIn</Button>
            </Link>
          )}
          <Link href="/dashboard">
          <Button className="bg-violet-900 hover:bg-gray-700 text-white">Dashboard</Button>
        </Link>
          {/* <ModeToggle /> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
