"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { signInSchema } from "@/schemas/signInSchema";
import { ApiResponse } from "@/Types/ApiResponse";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Page = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const handleSignInError = (error: any) => {
    let errorMessage = "An error occurred";
    if (error === "CredentialsSignin") {
      errorMessage = "Incorrect username or password";
    } else {
      const match = error.match(/Error:\s*(.*)/);
      if (match) {
        errorMessage = match[1];
      }
    }
    toast.error(errorMessage, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
    setIsSubmitting(false);
  };

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    setIsSubmitting(true);
    const result = await signIn("credentials", {
      redirect: false,
      identifier: data.identifier,
      password: data.password,
    });

    // console.log(result);

    if (result?.error != null) {
      handleSignInError(result.error);
    } else {
      router.replace("/dashboard");
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-black/[90]">
        <div className="flex flex-col items-center justify-center w-8/12 max-w-md bg-white rounded-lg mt-20">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-5 text-black opacity-90 mt-4">
              Welcome to OJ
            </h1>
            <p className="text-black opacity-90 text-lg mb-4">
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
                    <FormLabel className="text-gray-700">
                      Email/Username
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="email"
                        {...field}
                        className="bg-gray-200 border-black "
                      />
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
                        className="bg-gray-200 border-black "
                        type="password"
                        placeholder="Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                className="bg-blue-800 text-white hover:bg-blue-600"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
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
          <div className="text-center text-black opacity-90 mt-4 mb-4">
            <p>
              Not a member yet?{" "}
              <Link
                href="/signup"
                className="text-blue-600 hover:text-blue-800"
              >
                Sign up
              </Link>
            </p>
          </div>
          <div className="text-center text-black opacity-90 mt-4 mb-4">
            <p>
              Forgot password?{" "}
              <Link
                href="/ResetPassword"
                className="text-blue-600 hover:text-blue-800"
              >
                Reset Password
              </Link>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Page;
