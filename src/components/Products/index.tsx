"use client";

import { Row, Col, Spin } from "antd";
import React, { useEffect, useState } from "react";
import CartDesign from "../shared/CartDesign";


const Products = () => {
  const [productData,setProductData]=useState([])
  console.log(productData)

  useEffect(() => {
    try {
      fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then(data => setProductData(data.products));
    } catch (error) {
      console.log("Product Error", error);
    }
  }, []);

  return (
    <div className="container mx-auto my-20">
      <Row gutter={[16, 16]}>
        {productData?.length>0?productData?.map((item:any, index) => (
          <Col key={index} xs={24} md={12} lg={6}>
            <CartDesign key={item.id} description={item.description?.slice(0,80)} discount={item.discountPercentage} price={item.price} title={item.title?.slice(0,30)} image={item.images[0]}/>
          </Col>
        )):<Spin/>}
      </Row>
    </div>
  );
};

export default Products;
