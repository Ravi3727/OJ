"use client";
import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { User } from "next-auth";
import { Button } from "./ui/button";
const Navbar = () => {
  const { data: session } = useSession();
  const user: User = session?.user;
  return (
    <nav>
      <div className="flex items-center flex-row justify-between bg-gray-100 border-b-1 shadow-lg p-4 ">
        <a href="#" className="flex text-xl items-center gap-2">Home</a>
        {session ? (
          <>
            <span className="text-lg text-black \">Welcome {user?.name} || { user?.email}</span>
            <Button onClick={() => signOut()}>LogOut</Button>
          </>
        ) : (
          <Link href="/signIn">
            <Button className="bg-gray-600">LogIn</Button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
