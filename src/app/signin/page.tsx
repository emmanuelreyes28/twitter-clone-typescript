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

export default function SignIn() {
  return (
    <div className="flex items-center justify-center h-screen">
      <form className="max-w-xl w-full px-4">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Blue Bird</CardTitle>
            <CardDescription>Enter your credentials</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" type="text" name="username" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" name="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Sign-in
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
