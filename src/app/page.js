'use client'
import HeroSection from '../components/HeroSection'
import Trending from '../components/Trending'
import React from 'react'
import { useSession } from 'next-auth/react'
const page = () => {
  // const {data:session ,status}=useSession();
  // console.log(status,session?.user)
  return (
    <div>
      <HeroSection/>
      <Trending/>
    </div>
  )
}

export default page
