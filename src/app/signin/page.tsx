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

type Login = {
  username: string;
  password: string;
};

export default function SignIn() {
  const [data, setData] = useState<Login>({
    username: "",
    password: "",
  });
  const [error, setError] = useState<string>("");

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setData((prevValue): Login => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  }

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("api/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const { message } = await response.json();
        setError(message);
        console.log(message);
      } else {
        //TO-DO: route to timeline if signin successful
        console.log("User successfully loggedin");
      }
    } catch (error) {
      console.error("An error occurred: ", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="max-w-xl w-full px-4">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Blue Bird</CardTitle>
            <CardDescription>Enter your credentials</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                name="username"
                value={data.username}
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
                value={data.password}
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
