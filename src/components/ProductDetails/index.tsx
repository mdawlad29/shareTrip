"use client"
import { Button, Rate, Typography } from 'antd'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { IoMdAdd } from 'react-icons/io'
import { IoArrowBackOutline } from 'react-icons/io5'
import { RiSubtractFill } from 'react-icons/ri'
import Loader from '../shared/Loader'

const ProductDetails = () => {
  const router = useRouter();
  const params = useParams();
  const productId = params.productId;

  const [count, setCount] = useState(1); 
  const [productData, setProductData] = useState<any | null>(null);

  useEffect(() => {
    if (productId) {
      fetch(`https://dummyjson.com/products/${productId}`)
        .then((res) => res.json())
        .then((data) => setProductData(data))
        .catch((error) => console.log("Product Error", error));
    }
  }, [productId]);

  if (!productData) {
    return <Loader />;
  }

  // Handle increment
  const handleIncrement = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const handleDecrement = () => {
    setCount((prevCount) => (prevCount > 1 ? prevCount - 1 : 1)); 
  };

  const totalPrice = productData?.price * count;

  return (
    <div>
      <div className="flex flex-col container mx-auto shadow rounded-[10px] overflow-hidden my-10">
        <button
          className="text-[#1882FF] mb-4 flex items-center gap-2 border-b w-full p-3"
          onClick={() => router.back()}
        >
          <IoArrowBackOutline className="text-[18px]" /> Go Back
        </button>

        <div className="px-4 py-2 border-b">
          <div className="flex">
            <div className="p-8 w-[45%] text-center">
              <Image
                src={productData?.thumbnail}
                alt={productData.title}
                className="max-h-60 mx-auto"
                width={500}
                height={500}
              />
            </div>

            {/* Description Section */}
            <div className="p-8 w-[55%] border-l border-gray-200">
              <Typography.Text className="text-gray-900 capitalize text-[18px] font-semibold block mb-2">
                {productData?.title}
              </Typography.Text>

              <Item title="description" value={productData?.description} />
              <Item title="brand" value={productData?.brand} />

              <div className="flex items-center text-[13px] font-medium mb-4">
                Rating: <Rate disabled allowHalf defaultValue={productData?.rating ?? 0} />
              </div>

              <Typography.Text className="text-gray-800 text-2xl mb-4 block font-medium">
                ৳ {totalPrice}
              </Typography.Text>

              <div className="flex space-x-7 items-center mb-10">
                <RiSubtractFill
                  onClick={handleDecrement}
                  className="inline-block w-6 h-6 text-[red] cursor-pointer border border-gray-300 rounded p-1"
                />

                <Typography.Text className="text-gray-800 text-2xl block">
                  {count}
                </Typography.Text>

                <IoMdAdd
                  onClick={handleIncrement}
                  className="inline-block w-6 h-6 text-[#1882FF] cursor-pointer border border-gray-300 rounded p-1"
                />
              </div>

              <Button className='w-full !bg-[#1882FF] rounded-full !text-white text-[16px] h-9 flex justify-center items-center'>Place Order</Button>
            </div>
          </div>
        </div>

          {/* Review */}
          {productData?.reviews && <div className="p-3">
            <Typography.Title level={4}
                className="!text-[#1882FF] !mb-4"
            >
                All Reviews
            </Typography.Title>
            {
                 productData?.reviews?.map((review:any,index:number)=>
                <div key={index} className='flex flex-col justify-start items-start border-b last-of-type:border-b-0 mb-2'>
                    <Item title='name' value={review?.reviewerName}/>
                    <Item title='email' value={review?.reviewerEmail}/>
                    <Item title='comment' value={review?.comment}/>
                    <Item title='date' value={review?.date}/>
                </div>
                )
            }
        </div>}
      </div>
    </div>
  );
};

export default ProductDetails;

const Item = ({ title, value }: { title?: string; value: string }) => {
  return (
    <Typography.Text className="text-gray-800 text-[13px] font-medium mb-2 block">
      <span className="font-semibold capitalize">{title}</span>: {value}
    </Typography.Text>
  );
};
