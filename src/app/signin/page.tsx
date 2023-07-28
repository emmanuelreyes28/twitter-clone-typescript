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
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

type Login = {
  email: string;
  password: string;
};

export default function SignIn() {
  const [login, setLogin] = useState<Login>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string>();
  const router = useRouter();

  const supabase = createClientComponentClient();

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setLogin((prevValue): Login => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  }

  //TO-DO: handle fail signin
  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: login.email,
      password: login.password,
    });

    if (error) {
      setError(error.message);
    } else {
      router.push("/timeline");
      router.refresh();
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSignIn} className="max-w-xl w-full px-4">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Blue Bird</CardTitle>
            <CardDescription>Enter your credentials</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="text"
                name="email"
                value={login.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                name="password"
                value={login.password}
                onChange={handleChange}
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Sign-in
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
