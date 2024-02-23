"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@nextui-org/react";

export default function Cart() {
  const [items, setItems] = useState([]);
  const [subTotal, setSubTotal] = useState(0);

  useEffect(() => {
    const storedItems = localStorage.getItem("cart");
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    }
  }, []);

  useEffect(() => {
    const subtotal = items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setSubTotal(subtotal);
  }, [items]);

  const updateLocalStorage = (updatedItems) => {
    localStorage.setItem("cart", JSON.stringify(updatedItems));
  };

  const increaseQuantity = (id) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setItems(updatedItems);
    updateLocalStorage(updatedItems);
  };

  const decreaseQuantity = (id) => {
    const updatedItems = items
      .map((item) =>
        item.id === id
          ? item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : null // Nếu quantity = 0, trả về null
          : item
      )
      .filter((item) => item !== null); // Lọc bỏ các phần tử null
    setItems(updatedItems);
    updateLocalStorage(updatedItems);
  };

  return (
    <div>
      <div className="title_cart">
        <div>
          <h2 className="your_bag_title">
            <center>YOUR BAG</center>
          </h2>
        </div>
        <div className="main_title">
          <div className="continue_shopping">
            <Button
              radius="full"
              className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
            >
              CONTINUE SHOPPING
            </Button>
          </div>
          <div className="shopping_bag">
            <h3>Shopping Bags ({items.length}) </h3>
          </div>
          <div className="checkout">
            <Button
              radius="full"
              className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
            >
              CHECKOUT NOW
            </Button>
          </div>
        </div>
      </div>
      <div className="main_cart flex gap-3">
        <div className="product_cart">
          {items.map((item, index) => {
            return (
              <div key={index} className="flex flex-row justify-between">
                <div className="w-[40%]">{item.name}</div>
                <div>
                  <Button onClick={() => decreaseQuantity(item.id)}>- </Button>
                  {item.quantity}
                  <Button onClick={() => increaseQuantity(item.id)}> +</Button>
                </div>
                <div>${item.price * item.quantity}</div>
              </div>
            );
          })}
        </div>
        <div className="order_summary">
          <div className="border-2 border-indigo-600 ...">
            <h3>ORDER SUMMARY</h3>
            <div className="order">
              <div>Subtotal</div>
              <div>${subTotal}</div>
            </div>
            <div className="order">
              <div>Shipping</div>
              <div>Free</div>
            </div>
            <div className="order">
              <div>Total</div>
              <div>${subTotal}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
