import React from 'react'
import Image from 'next/image'
import { UserButton } from '@clerk/nextjs'

function Header() {
  return (
    <div className='flex justify-between items-center p-3 shadow-sm'>
      <Image src={'/HLOGI1.png'} width={70} height={40} alt='hlogo'/>
      <div className='mr-5 pt-2'>
        <UserButton />
      </div>
      
    </div>
  )
}

export default Header