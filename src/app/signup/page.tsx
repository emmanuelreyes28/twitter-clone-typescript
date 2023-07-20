"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

type Credentials = {
  username: string;
  email: string;
  password: string;
};

export default function Register() {
  const [data, setData] = useState<Credentials>({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<string>("");
  const supabase = createClientComponentClient();

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setData((prevValue): Credentials => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  }

  // create handleSignup function here
  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });

    console.log("handle sign up function executed");
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSignup} className="max-w-xl w-full px-4">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Create an account</CardTitle>
            <CardDescription>
              Enter your email and a username to create your account
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                value={data.email}
                onChange={handleChange}
                placeholder="e@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                name="username"
                value={data.username}
                onChange={handleChange}
                placeholder="duddy"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Create account
            </Button>
          </CardFooter>
          {error && (
            <CardDescription className="text-center text-red-600 pb-2">
              {error}
            </CardDescription>
          )}
        </Card>
      </form>
    </div>
  );
}
