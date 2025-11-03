import { Button } from '@/components/ui/button'
import { SignInButton } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

function Header() {
  return (
    <div className="flex justify-between p-5 shadow-md bg-white rounded-lg">

    <Image src={'/LOGI1.png'} width={100} height={100} alt="logo" />
    <SignInButton mode="modal">
      <Button>Get Started</Button>
    </SignInButton>
  </div>
  
  )
}

export default Header