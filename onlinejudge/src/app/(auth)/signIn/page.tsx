'use client'
import React from 'react'
import { signIn } from "next-auth/react"
function page() {
  return (
    <>
    <div>page</div>

    
    <button onClick={() => signIn("google")}>Sign in with Google</button>
    
    
    
    </>
  )
}

export default page