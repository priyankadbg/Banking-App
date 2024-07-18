"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
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
import { ITEMS } from "@/constants";
import CustomInput from "./CustomInput";
import { authFormSchema } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

const AuthForm = ({ type }: { type: string }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = authFormSchema(type);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setIsLoading(true);
    try {
      // Sign up with Appwrite and create plaid token
      if (type === "sign-up") {
        // const newUser = await signUp(data);
        // setUser(newUser);
      }
      if (type === "sign-in") {
        const response = await SignIn({
          email: data.email,
          password: data.password,
        });
        if (response) router.push("/");
      }
    } catch (error) {
      console.log(values);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href="/" className="mb-12 cursor-pointer flex items-center gap-2">
          <Image
            src="/icons/logo.svg"
            width={34}
            height={34}
            alt="Horizon logo"
            className="size-[24px] max-xl:size-14 "
          />
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
            Horizon
          </h1>
        </Link>
        <div className="flex-flex-col-gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
            {user ? "Link Account" : type === "sign-in" ? "Sign In" : "Sign Up"}
            <p className="text-16 font-normal text-gray-600">
              {user
                ? "Link your Account to get started"
                : "Please enter your details"}
            </p>
          </h1>
        </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4">{/* PlaidLink */}</div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {type === "sign-up" && (
                <>
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      name="FirstName"
                      label="FirstName"
                      placeholder="Enter your FirstName"
                    />
                    <CustomInput
                      control={form.control}
                      name="lastName"
                      label="lastName"
                      placeholder="Enter your lastName"
                    />
                  </div>

                  <CustomInput
                    control={form.control}
                    name="address1"
                    label="address1"
                    placeholder="Enter your Address"
                  />
                  <CustomInput
                    control={form.control}
                    name="city"
                    label="city"
                    placeholder="Enter your City"
                  />
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      name="state"
                      label="State"
                      placeholder="Example:NY"
                    />
                    <CustomInput
                      control={form.control}
                      name="postal Code"
                      label="postal Code"
                      placeholder="Example:11101"
                    />
                  </div>

                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      name="DateOFBirth"
                      label="DateOFBirth"
                      placeholder="Example:YYYY-MM-DD"
                    />
                    <CustomInput
                      control={form.control}
                      name="SSN"
                      label="SSN"
                      placeholder="Example:1244"
                    />
                  </div>
                </>
              )}
              <CustomInput
                form={form.control}
                name="email"
                label="Email"
                placeholder="Enter your Email"
              />

              <CustomInput
                form={form.control}
                name="password"
                label="Password"
                placeholder="Enter your password"
              />

              <div className="flex flex-col gap-4">
                <Button type="submit" disabled={isLoading} className="form-btn">
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      &nbsp;
                    </>
                  ) : type === "sign-in" ? (
                    "sign In"
                  ) : (
                    "sign Up"
                  )}
                </Button>
              </div>
            </form>
            <footer className="flex justify-center gap-1">
              <p className="text-14 font-normal text-gray-600">
                {type === "sign-in"
                  ? "Don't have a account"
                  : "Already have an account"}
              </p>
              <Link
                href={type === "sign-in" ? "/sign-up" : "/sign-in"}
                className="form-link"
              >
                {type === "sign-Up" ? "/sign-up" : "/sign-In"}
              </Link>
            </footer>
          </Form>
        </>
      )}
    </section>
  );
};

export default AuthForm;
