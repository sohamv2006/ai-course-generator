"use client"
import { UserCourseListcontext } from "@/app/_context/UserCourseListContext"
import { Progress } from "@/components/ui/progress"
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useContext } from 'react'
import { HiOutlineHome, HiOutlineSquare3Stack3D, HiOutlineShieldCheck, HiOutlinePower } from "react-icons/hi2"

function SideBar() {

  const {userCourseList , setUserCourseList} = useContext(UserCourseListcontext); 
  const Menu = [
    { id: 1, name: 'Home',    icon: <HiOutlineHome />,           path: '/dashboard' },
    { id: 2, name: 'Explore', icon: <HiOutlineSquare3Stack3D />, path: '/dashboard/explore' },
    { id: 3, name: 'Upgrade', icon: <HiOutlineShieldCheck />,    path: '/dashboard/upgrade' },
    { id: 4, name: 'Logout',  icon: <HiOutlinePower />,          path: '/dashboard/logout' },
  ]

  const path = usePathname()

  return (
    <div className="fixed h-full md:w-64 p-5 bg-gradient-to-b from-white to-gray-50 shadow-2xl shadow-black/20 border-r border-gray-200">
      {/* Logo */}
        <Image 
          src="/LOGI1.png" 
          alt="logo" 
          width={100} 
          height={100} 
          className="flex items-center mx-auto mb-4"
        />
        <hr className="my-5"/>


      {/* Menu */}
      <ul className="space-y-2">
        {Menu.map((item) => {
          // Fix: Home must match exactly, others can match by "startsWith"
          const isActive = item.path === "/dashboard" 
            ? path === "/dashboard"
            : path.startsWith(item.path)

          return (
            <li key={item.id}>
              <Link 
                href={item.path}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-200
                  ${isActive 
                    ? 'bg-indigo-100 text-indigo-600 shadow-sm shadow-indigo-200 scale-[1.02]' 
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }
                `}
              >
                <span className={`text-xl ${isActive ? 'text-indigo-600' : 'text-gray-500'}`}>
                  {item.icon}
                </span>
                <span>{item.name}</span>
              </Link>
            </li>
          )
        })}
      </ul>
      
      
      <div className="absolute bottom-10 w-[80%]">
          <Progress value={(userCourseList?.length/5)*100} />
          <h2 className="text-sm my-2">{userCourseList?.length} out of 5 Cources Created </h2>
          <h2 className="text-xs text-gray-500">Upgrade your plan for unlimited Course Generation </h2>
      </div>
    </div>

  )
}

export default SideBar
