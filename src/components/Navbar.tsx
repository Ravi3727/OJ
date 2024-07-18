"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { User } from "next-auth";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const { data: session } = useSession();
  const user: User = session?.user;
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="inset-x-0 lg:w-full md:w-auto absolute top-4 mx-auto z-50">
      <div className="flex justify-between items-center bg-black/[90] rounded-full border-2 p-4 w-10/12 mx-auto text-white font-thin text-lg leading-6">
        <div className="ml-4">
          <Link href="/">
            <div className="group relative">
              Home
              <div className="w-[58px] h-[2px] absolute opacity-0 group-hover:opacity-100 transition-opacity bg-white mt-1 -ml-1"></div>
            </div>
          </Link>
        </div>

        <div className="block lg:hidden">
          <button
            onClick={toggleMenu}
            className="flex items-center px-3 py-2 border rounded text-white border-white hover:text-white hover:border-white"
          >
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>

        <div
          className={`lg:flex lg:items-center lg:w-auto lg:static w-full absolute left-0 lg:left-auto top-16 lg:top-auto ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <div className="p-2 ml-10 mt-4 md:mt-0 md:ml-0 lg:p-0 lg:mr-52">
            <Link href="/dashboard">
              <div className="group relative">
                Dashboard
                <div className="w-[100px] h-[2px] absolute opacity-0 group-hover:opacity-100 transition-opacity bg-white mt-1 -ml-1"></div>
              </div>
            </Link>
          </div>

          <div className="p-2 ml-10 md:mt-0 md:ml-0 lg:p-0 lg:mr-52">
            <Link href="/allproblems">
              <div className="group relative">
                Problems
                <div className="w-[84px] h-[2px] absolute opacity-0 group-hover:opacity-100 transition-opacity bg-white mt-1 -ml-1"></div>
              </div>
            </Link>
          </div>

          <div className="p-2  ml-10 md:mt-0 md:ml-0 lg:p-0 lg:mr-52">
            <Link href="/contests">
              <div className="group relative">
                Contests
                <div className="w-[80px] h-[2px] absolute opacity-0 group-hover:opacity-100 transition-opacity bg-white mt-1 -ml-1"></div>
              </div>
            </Link>
          </div>

          <div className="p-2 ml-10 md:mt-0 md:ml-0 lg:p-0">
            {session ? (
              <Button
                onClick={() => signOut()}
                className="bg-violet-900 hover:bg-gray-700 text-white"
              >
                LogOut
              </Button>
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

      {/* Overlay for background blur */}
      {isOpen && (
        <div className="fixed inset-0 bg-black opacity-90 -z-10 lg:hidden" onClick={toggleMenu}></div>
      )}

      <style jsx>{`
        .blur-background {
          filter: blur(50px);
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
