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

const Page = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter(); // Initialize the useRouter hook

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const response = await axios.post('/api/signup', { name, email, password })
      
      if (!response.data) {
        toast.error('Error creating user')
      } else {
        toast.success('User created successfully')
        router.push('/sign-in'); // Redirect to sign-in page after successful user creation
      }
    } catch (error) {
      toast.error("Error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex justify-center items-center h-[630px] ">
      <Card className="w-[350px] border-gray-600 ">
        <CardHeader>
          <div className="text-center">
            <CardTitle>Sign-Up</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Enter Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
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
          <div className="flex flex-col">
            <span>Already have an account</span>
            <Link href="/sign-in" className="text-center font-bold mt-3">
              Sign-In
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Page
