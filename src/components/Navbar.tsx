"use client";
import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { User } from "next-auth";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const { data: session } = useSession();
  const user: User = session?.user;
  return (
    <nav className="inset-x-0 lg:w-full md:w-auto absolute top-4 mx-auto z-50  ">
      <div>
        <div className="bg-black/[90] rounded-full border-2 flex items-center flex-row justify-between border-b-1  p-4 w-10/12 mx-auto text-white font-thin text-lg leading-6">
          <div className="p-2 ml-4">
            <Link href="/">
              <div className="group relative">
                Home
                <div className="w-[58px] h-[2px] absolute opacity-0 group-hover:opacity-100 transition-opacity bg-white mt-1 -ml-1"></div>
              </div>
            </Link>
          </div>

          <div className="p-2">
            <Link href="/dashboard">
              <div className="group relative">
                Dashboard
                <div className="w-[100px] h-[2px] absolute opacity-0 group-hover:opacity-100 transition-opacity bg-white mt-1 -ml-1"></div>
              </div>
            </Link>
          </div>

          <div className="p-2">
            <Link href="/allproblems">
              <div className="group relative ">
                Problems
                <div className="w-[84px] h-[2px] absolute opacity-0 group-hover:opacity-100 transition-opacity bg-white mt-1 -ml-1"></div>
              </div>
            </Link>
          </div>

          <div className="p-2">
            <Link href="/contests">
              <div className="group relative">
                Contests
                <div className="w-[80px] h-[2px] absolute opacity-0 group-hover:opacity-100  transition-opacity bg-white mt-1 -ml-1"></div>
              </div>
            </Link>
          </div>

          <div>
            {session ? (
              <>
                <Button
                  onClick={() => signOut()}
                  className="bg-violet-900 hover:bg-gray-700 text-white"
                >
                  LogOut
                </Button>
              </>
            ) : (
              <Link href="/signIn">
                <div>
                  <Button className="bg-violet-900 hover:bg-gray-700 text-white">
                    LogIn
                  </Button>
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
   
  );
};

export default Navbar;