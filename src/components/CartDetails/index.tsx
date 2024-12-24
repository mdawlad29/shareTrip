"use client";

import React from "react";
import Image from "next/image";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { RootState } from "@/redux/store";
import { Button, Col, Row, Typography } from "antd";
import { setCartItems } from "@/redux/feature/product/productSlice";
import { toast } from "react-toastify";
import { RiDeleteBin6Line } from "react-icons/ri";

const CartDetails = () => {
  const dispatch = useAppDispatch();
  const { cartItems } = useAppSelector((state: RootState) => state.product);

  // Handle Remove Cart Item
  const handleRemoveCart = (id: any) => {
    const updatedCart = cartItems?.filter((cartItem: any) => cartItem.id !== id);
    dispatch(setCartItems(updatedCart));

   return toast?.success("Item removed from the cart successfully!");
  };

  // Increase Quantity
  const onIncrease = (id: any) => {
    const updatedCart = cartItems?.map((cartItem: any) =>
      cartItem.id === id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
    dispatch(setCartItems(updatedCart));

    return toast?.success("Item quantity updated in the cart successfully!");
  };

  // Decrease Quantity
  const onDecrease = (id: any) => {
    const updatedCart = cartItems?.map((cartItem: any) =>
      cartItem.id === id && cartItem.quantity > 1
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
    dispatch(setCartItems(updatedCart));
   
    return toast?.success("Item quantity removed in the cart successfully!");
  };

  const handleCheckout = () => {
    return toast?.warn("Checkout feature is not available yet!");
  }
  

  return (
    <div className="container mx-auto px-4 my-10">
      <Typography.Text className="text-2xl font-semibold mb-6 block border-b w-full">Shopping Cart</Typography.Text>

      <Row gutter={[16, 16]}>
        {/* Cart Items */}
        <Col xs={24} md={12} lg={16}>
          <div className="flex flex-col gap-6">
            {cartItems?.length>0?cartItems?.map((item: any) => (
              <div
                key={item?.id}
                className="flex items-center gap-4 p-4 bg-white shadow rounded-lg"
              >
                {/* Product Image */}
                <div className="w-20 h-20 flex-shrink-0">
                  <Image
                    src={item?.thumbnail}
                    alt={item?.title}
                    width={80}
                    height={80}
                    className="object-cover rounded"
                  />
                </div>

                {/* Product Details */}
                <div className="flex flex-col flex-grow">
                  <Typography.Text className="text-lg font-medium block">{item.title}</Typography.Text>

                  <p className="text-gray-500 text-sm">{item.description}</p>

                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-blue-500 font-semibold">
                      ৳{item.price?.toFixed(2)}
                    </span>

                    {item.discount && (
                      <span className="line-through text-gray-400 text-sm">
                        ৳{item.originalPrice?.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onDecrease(item.id)}
                    className="p-1 border border-gray-300 rounded hover:bg-gray-200"
                  >
                    <AiOutlineMinus />
                  </button>

                  <span className="px-2 font-medium">{item.quantity}</span>

                  <button
                    onClick={() => onIncrease(item.id)}
                    className="p-1 border border-gray-300 rounded hover:bg-gray-200"
                  >
                    <AiOutlinePlus />
                  </button>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => handleRemoveCart(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <RiDeleteBin6Line size={20} />
                </button>
              </div>
            )):<><Typography.Text className="text-lg text-red-500 block text-center">No item found in the cart.</Typography.Text></>}
          </div>
        </Col>

        {/* Cart Summary */}
        <Col xs={24} md={12} lg={8}>
          <div className="bg-gray-50 p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4">Cart Summary</h3>

            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Subtotal</span>

              <span className="font-medium text-gray-800">
                ৳
                {cartItems?.reduce(
                  (total: any, item: any) => total + item.price * item.quantity,
                  0
                )?.toFixed(2)}
              </span>
            </div>

            

            <hr className="my-4" />
            
            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span className="text-blue-500">
                ৳
                {cartItems?.reduce(
                  (total: any, item: any) => total + item.price * item.quantity,
                  0
                )?.toFixed(2)}
              </span>
            </div>

            <Button onClick={handleCheckout} className="mt-6 w-full h-9 flex justify-center items-center !bg-blue-500 !text-white py-2 rounded-lg !border-none">
              Proceed to Checkout
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default CartDetails;
