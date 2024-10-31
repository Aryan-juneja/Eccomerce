'use client'
import * as React from "react"
import { useState } from "react"
import { Button } from "../../components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import Link from "next/link"
import axios from "axios"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"; // Import the useRouter hook
import { FcGoogle } from "react-icons/fc";
import { signIn } from 'next-auth/react' // Import signIn from next-auth/react

const Page = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter(); // Initialize the useRouter hook

  const formHandler = async (email, password) => {
    if (!email || !password) {
      toast.error("Please provide both email and password");
      return;
    }
    try {
      setLoading(true);
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false // Prevent automatic redirection
      });
      if (result.error) {
        toast.error(result.error); // Display the error message
      } else {
        toast.success('User LoggedIn successfully');
        setTimeout(() => {
          router.push('/'); // Redirect to home page after successful sign-in
        }, 1000);
      }
    } catch (error) {
      toast.error("Error while logging in");
    } finally {
      setLoading(false);
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      const result = await signIn('google', { callbackUrl: '/' });
      if (result?.error) {
        toast.error('Login with Google failed');
      } else {
        toast.success('User LoggedIn successfully');
        setTimeout(() => {
          router.push('/'); // Redirect to home page after successful sign-in
        }, 1000);
      }
    } catch (error) {
      toast.error("Error while logging in with Google");
    }
  }

  return (
    <div className="flex justify-center items-center h-[630px]">
      <Card className="w-[350px] border-gray-600">
        <CardHeader>
          <div className="text-center">
            <CardTitle>Sign-In</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => {
            e.preventDefault();
            formHandler(email, password);
          }}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="Enter Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-center mt-4">
              <Button type="submit" variant="outline" disabled={loading}>
                Submit
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col justify-between">
          <span>OR</span>
          <div>
            <Button onClick={handleGoogleSignIn} variant={"outline"} className="text-xl">
              <span className="mr-2"><FcGoogle /></span> Login With Google
            </Button>
          </div>
          <div className="flex flex-col">
            <span className="mt-2">Don&#39;t have an account</span>
            <Link href="/sign-up" className="text-center font-bold mt-3">
              Sign-Up
            </Link>
          </div>

        </CardFooter>
      </Card>
    </div>
  )
}

export default Page;
