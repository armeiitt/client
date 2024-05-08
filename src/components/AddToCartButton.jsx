"use client";
import React from "react";
import { Button, cn } from "@nextui-org/react";

export default function AddToCartButton({ children, data, ...props }) {
  const handleAddToCart = () => {
    if (data && data.prod.id) {
      // Lấy mảng đã lưu từ localStorage
      const storedItems = localStorage.getItem("cart");
      // Nếu mảng đã lưu tồn tại, chuyển đổi thành mảng JavaScript
      const items = storedItems ? JSON.parse(storedItems) : [];

      // Kiểm tra nếu sản phẩm đã tồn tại trong mảng localStorage
      const existingItemIndex = items.findIndex((item) => item.id === data.id);
      if (existingItemIndex !== -1) {
        // Nếu đã tồn tại, tăng giá trị quantity lên 1
        items[existingItemIndex].quantity += 1;
      } else {
        // Nếu chưa tồn tại, thêm sản phẩm vào mảng với quantity ban đầu là 1
        items.push({
          id: data.id,
          name: data.attributes.name,
          price: data.attributes.regular_price,
          quantity: 1,
        });
      }

      // Lưu mảng đã được cập nhật vào localStorage
      localStorage.setItem("cart", JSON.stringify(items));
      console.log("Item added to cart:", data.id);
    } else {
      console.error("Invalid data or data.id is missing");
    }
  };

  return (
    <Button
      className={cn(props.className)}
      size={props.size}
      variant={props.variant}
      color={props.color}
      onClick={handleAddToCart}
    >
      {children}
    </Button>
  );
}
