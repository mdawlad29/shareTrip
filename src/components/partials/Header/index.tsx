"use client";

import { Badge, Layout } from 'antd';
import Link from 'next/link';
import React from 'react'
import { MdAddShoppingCart } from 'react-icons/md';
const { Header } = Layout;

const Navbar = () => {
  return (
    <Header className='!bg-white sticky top-0 z-50 w-full shadow flex justify-between items-center'>
        <Link href={"/"} className='text-2xl font-bold capitalize !text-[#1882FF] !mb-0'>shareTrip</Link>

         <Badge count={5}>
            <MdAddShoppingCart className="text-[20px]"/>
        </Badge>

    </Header>
  )
}

export default Navbar