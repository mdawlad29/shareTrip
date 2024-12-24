import { Button, Typography } from 'antd'
import Image from 'next/image'
import React from 'react'
import { MdAddShoppingCart, MdFavoriteBorder, MdVisibility } from 'react-icons/md'
const {Text}=Typography

interface ICartProps{
    title:string
    image:string
    price:number
    discount:number,
    description:string
}

const CartDesign:React.FC<ICartProps> = ({description,discount,price,title,image}) => {
  return (
    <div className="bg-white rounded-xl h-[370px] border overflow-hidden group hover:shadow-md duration-300 relative hover:p-1">

    {/* Discount Badge */}
    {discount&&<div className="relative">
      <Image
        src={"/assets/images/badge.png"}
        alt={"discount badge"}
        width={120}
        height={150}
        className="absolute -left-0 top-5 z-10 w-[90px] h-[34px]"
      />

      <Text className="text-white text-[12px] leading-[14px] absolute top-7 left-4 z-10">- {discount}%</Text>
    </div>}

    {/* Product Image with Hover Actions */}
    <div className="h-[210px] overflow-hidden relative flex justify-center items-center bg-gray-300 rounded-xl p-4">
      <Image
        src={image??"/assets/images/t-shirt-1.png"}
        alt={"t-shirt"}
        width={210}
        height={210}
        className='object-contain'
      />

      {/* Hover Actions */}
      <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pt-24 rounded-xl">
        <MdFavoriteBorder className="text-white text-[24px] hover:text-red-500 cursor-pointer absolute top-4 right-4" />

        <Button
          className="flex items-center gap-2 px-14 py-[6px] !bg-[#ffffff4d] !text-white rounded-lg text-sm font-medium border !border-white hover:bg-white transition"
          icon={<MdAddShoppingCart className="text-[18px]"/>}
        >
          Add to Cart
        </Button>
      
        <Button
          className="flex items-center gap-2 px-14 py-[6px] !bg-[#ffffff4d] !text-white rounded-lg text-sm font-medium border !border-white hover:bg-white transition"
          icon={<MdVisibility className="text-[18px]"/>}
        >
          Quick View
        </Button>
      </div>
    </div>

    {/* Product Info */}
    <div className="p-4">
      <Text className="text-gray-500 text-sm font-medium block">{title}</Text>
      
      <Text className="text-gray-800 text-base font-semibold mb-2 block">
       {description}
      </Text>

      <div className="flex items-center gap-4">
        <Text className="text-blue-500 text-lg font-bold">৳{price}</Text>

        <Text className="text-gray-400 text-sm line-through">৳2,500</Text>
      </div>
    </div>
  </div>
  )
}

export default CartDesign