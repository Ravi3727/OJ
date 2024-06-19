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
      identifier: data.identifier,
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

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="flex flex-col items-center justify-center w-full max-w-md bg-white">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-5">Welcome to OJ</h1>
            <p className="text-gray-600 text-lg mb-4">
              SignIn to start your problem solving journey
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4"> 

              <FormField
                control={form.control}
                name="identifier"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
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
                    <FormLabel>Password</FormLabel>
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

              <Button type="submit" disabled={isSubmiting}>
                {isSubmiting ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />{" "}
                    Loading
                  </>
                ) : (
                  "SignUp"
                )}
              </Button>
            </form>
          </Form>
          <div>
            <p>
              Already a member ?{" "}
              <Link
                href="/signIn"
                className="text-green-400 hover:text-green-700"
              >
                SignIn
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
