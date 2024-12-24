import { setCartItems } from '@/redux/feature/product/productSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hook'
import { RootState } from '@/redux/store'
import { Button, Typography } from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import {  AiOutlinePlus } from 'react-icons/ai'
import { MdAddShoppingCart, MdFavoriteBorder, MdVisibility } from 'react-icons/md'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { toast } from 'react-toastify'
const {Text}=Typography

interface ICartProps{
    title:string
    image:string
    price:number
    discount:number,
    description:string
    item:any
}

const CartDesign:React.FC<ICartProps> = ({description,discount,price,title,image,item}) => {
const router=useRouter()
const dispatch=useAppDispatch()
const {cartItems}=useAppSelector((state:RootState)=>state.product)

const [isInCart, setIsInCart] = useState(false);

useEffect(() => {
  if (cartItems?.some((cartItem: any) => cartItem.id === item.id)) {
    setIsInCart(true);
  } else {
    setIsInCart(false);
  }
}, [cartItems, item.id]);

const handleAddToCart = () => {
  try {
    const currentCart = Array.isArray(cartItems) ? cartItems : [];

    const existingItem = currentCart.find(
      (cartItem) => cartItem.id === item.id
    );

    if (existingItem) {
      dispatch(
        setCartItems(
          currentCart.map((cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          )
        )
      );
      toast?.warn(`${item.title} quantity updated in the cart.`);
    } else {
      dispatch(setCartItems([...currentCart, { ...item, quantity: 1 }]));
      toast?.success(`${item.title} added to the cart successfully!`);
      setIsInCart(true); // Set state to true after adding
    }
  } catch (error: any) {
    toast?.error("An error occurred while adding the item to the cart.");
  }
};

const handleRemoveItem = (id: any) => {
  const updatedCart = cartItems?.filter((cartItem: any) => cartItem.id !== id);
  dispatch(setCartItems(updatedCart));
  setIsInCart(false); // Reset state after removal
  toast?.success("Item removed from the cart successfully!");
};

  const onIncrease = (id: any) => {
    const updatedCart = cartItems?.map((cartItem: any) =>
      cartItem.id === id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
    dispatch(setCartItems(updatedCart));
    return toast?.success("Item quantity updated in the cart successfully!");
  };


  return (
    <div className="bg-white rounded-xl h-[370px] overflow-hidden group hover:shadow-md duration-300 relative hover:p-1">

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

        
          {!isInCart ? (
            <Button
              onClick={handleAddToCart}
              className="flex items-center gap-2 px-14 py-[6px] !bg-[#ffffff4d] !text-white rounded-lg text-sm font-medium border !border-white hover:bg-white transition"
              icon={<MdAddShoppingCart className="text-[18px]" />}
            >
              Add to Cart
            </Button>
          ) : (
            <Button
              className="flex items-center gap-2 px-7 py-[6px] !bg-[#03A629] !text-white rounded-lg text-sm font-medium border !border-white hover:bg-white transition"
            >
              <RiDeleteBin6Line
                size={20}
                onClick={() => handleRemoveItem(item?.id)}
                className="cursor-pointer"
              /> 
              {cartItems.find((cartItem: any) => cartItem.id === item.id)?.quantity ?? 0}{" "}
              Added in Cart
              <AiOutlinePlus
                size={20}
                onClick={() => onIncrease(item?.id)}
                className="cursor-pointer"
              />
            </Button>
          )}

      
        <Button  onClick={()=>router.push(`/product/${item?.id}`)}
          className="flex items-center gap-2 px-14 py-[6px] !bg-[#ffffff4d] !text-white rounded-lg text-sm font-medium border !border-white hover:bg-white transition"
          icon={<MdVisibility className="text-[18px]"/>}
        >
          Quick View
        </Button>
      </div>
    </div>

    {/* Product Info */}
    <Link href={`/product/${item?.id}`} className="p-2 block">
      <Text className="text-gray-500 text-sm font-medium block">{title}</Text>
      
      <Text className="text-gray-800 text-base font-semibold mb-2 block">
       {description}
      </Text>

      <div className="flex items-center gap-4">
        <Text className="text-[#1882FF] text-lg font-bold">৳{price?.toFixed(2)}</Text>

        <Text className="text-[#77818C] text-sm line-through">৳2,500</Text>
      </div>
    </Link>
  </div>
  )
}

export default CartDesign