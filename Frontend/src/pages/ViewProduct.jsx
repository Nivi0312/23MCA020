// src/ViewProduct.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Card } from 'antd';


const ViewProduct = () => {
  const location = useLocation();
  const item = location.state?.item;

  if (!item) {
    return <div>Product not found</div>;
  }

  return (
    <Card title={item.productName}>
      <p>{item.rating}</p>
      <p>Price: ${item.price}</p>
      <p>discount: ${item.discount}%</p>
    </Card>
  );
};

export default ViewProduct;
