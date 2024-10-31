'use client'
import React from 'react'
import { RiAdminLine } from "react-icons/ri";
import {MdDashboard,MdManageAccounts} from 'react-icons/md'
import {GrTransaction} from 'react-icons/gr'
import {IoAnalytics,IoSettings} from 'react-icons/io5'
import {RiShoppingCartLine} from 'react-icons/ri'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
const menus=[
  {name:'Dashboard',icon:<MdDashboard/>,href:'/admin/dashboard'},
  {name:'Manage Accounts',icon:<MdManageAccounts/>,href:'/admin/manage-accounts'},
  {name:'Transactions',icon:<GrTransaction/>,href:'/admin/transactions'},
  {name:'Analytics',icon:<IoAnalytics/>,href:'/admin/analytics'},
  {name:'Settings',icon:<IoSettings/>,href:'/admin/settings'},
  {name:'Orders',icon:<RiShoppingCartLine/>,href:'/admin/orders'},
]
const Sidebar = () => {
  const pathname =usePathname();
  return (
    <div className='bg-white w-[200px] md:w-[300px] p-4 shrink-0'>
      <div className='flex items-center gap-4'>
        <RiAdminLine className='text-3xl text-blue-500' />
        <h1 className='text-2xl font-bold'>Admin</h1>
      </div>
      <ul className='space-y-4 mt-6'>
        {menus.map((menu,index)=>(
          <Link key={menu.name} href={menu.href} className={`flex gap-2 items-center p-4 rounded-lg cursor-pointer hover:bg-pink hover:text-white ${pathname === menu.href ? "bg-pink text-white" : "bg-gray-200 " }`}>
            <div className='text-[20px]'>{menu.icon}</div>
            <div className=' text-sm md:text-lg'>{menu.name}</div>
          </Link>
          ))}
      </ul>
    </div>
  )
}

export default Sidebar
Sidebar