"use client";

import { useAppSelector } from '@/redux/hook';
import { RootState } from '@/redux/store';
import { Badge, Layout } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react'
import { MdAddShoppingCart } from 'react-icons/md';
const { Header } = Layout;

const Navbar = () => {
  const router=useRouter()
  const {cartItems}=useAppSelector((state:RootState)=>state.product)

  return (
    <Header className='!bg-white sticky top-0 z-50 w-full shadow flex justify-between items-center'>
        <Link href={"/"} className='text-2xl font-bold capitalize !text-[#1882FF] !mb-0'>shareTrip</Link>

         <Badge count={cartItems?.length??0} onClick={() => router.push("/cart")} className="cursor-pointer">
            <MdAddShoppingCart className="text-[20px]"/>
        </Badge>

    </Header>
  )
}

export default Navbar