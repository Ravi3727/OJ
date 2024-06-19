"use client";
import React from "react";
import { signIn } from "next-auth/react";
function page() {
  return (
    <>
      <div>LogIn page</div>
      <button onClick={() => signIn("google")}>Sign in with Google</button>
      <button onClick={() => signIn("github")}>Sign in with Github</button>
    </>
  );
}

export default page;
