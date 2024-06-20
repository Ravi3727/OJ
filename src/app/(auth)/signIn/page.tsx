"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import axios, { AxiosError } from "axios";
import { useDebounceCallback } from "usehooks-ts";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { signUpSchema } from "@/schemas/signUpSchema";
import { ApiResponse } from "@/Types/ApiResponse";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { signInSchema } from "@/schemas/signInSchema";
import { signIn } from "next-auth/react";
import { GoogleIcon } from "@/utils/googleIcon";
import { FaGithub } from "react-icons/fa6";

const Page = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmiting, setIsSubmiting] = useState(false);
  

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    const result = await signIn('credentials',{
      redirect:false,
      identifier: data.email,
      password: data.password
    })
    if(result?.error){
      if(result.error == 'CredentialsSignIn'){
        toast({
          title:"Login failed",
          description:"Incorrect login Credentials",
          variant:"destructive"
        })
      }else{
        toast({
          title:"Login failed",
          description:result.error,
          variant:"destructive"
        })
      }
      toast({
        title:'Login failed',
        description:"Incorrect login attempt",
        variant:'destructive'
      })
    }
    if(result?.url){
      router.replace("/dashboard")
    }
  };

  // const handelGooleLogin = ()=>{
  //   signIn("google");
  //   toast({
  //     title:'Login Successfully',
  //     description:"Welcome to OJ"
  //   })
  //   router.replace('/dashboard');
  // }

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-200 ">
        <div className="flex flex-col items-center justify-center w-8/12 max-w-md bg-white rounded-lg">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-5 text-background mt-4">Welcome to OJ</h1>
            <p className="text-gray-600 text-lg mb-4">
              SignIn to start your problem solving journey
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4"> 

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Email/Username</FormLabel>
                    <FormControl>
                      <Input placeholder="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button className="bg-background text-white hover:bg-gray-800 mb-4" type="submit" disabled={isSubmiting}>
                {isSubmiting ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />{" "}
                    Loading
                  </>
                ) : (
                  "SignIn"
                )}
              </Button>
            </form>
          </Form>

          {/* Sign in with Google and Github */}

          {/* <div className="mt-6 mb-4 flex flex-col items-center justify-center w-8/12 gap-2">
          <button onClick={handelGooleLogin} className="focus:shadow-outline h-12 w-full rounded-3xl border-2 border-gray-400 bg-background text-lg hover:bg-gray-700 focus:outline-none" type="button">
            <div className="flex items-center justify-center">
              <GoogleIcon />
              <div className="mx-4 text-sm">Google</div>
            </div>
          </button>
          <button onClick={()=> signIn("github")} className="focus:shadow-outline h-12 w-full rounded-3xl border-2 border-gray-400  bg-background text-lg hover:bg-gray-700 focus:outline-none" type="button">
            <div className="flex items-center justify-center">
            <FaGithub/>
              <div className="mx-4 text-sm">GitHub</div>
            </div>
          </button>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Page;
