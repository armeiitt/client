import React from "react";
import { Button } from "@nextui-org/react";

export default function Cart() {
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
            <h3>Shopping Bags (2) </h3>
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
      <div className="main_cart">
        <div className="product_cart">ten ten</div>
        <div className="order_summary">
          <div class="border-2 border-indigo-600 ...">
            <h3>ORDER SUMMARY</h3>
            <div className="order">
              <div>Subtotal</div>
              <div>$80</div>
            </div>
            <div className="order">
              <div>Subtotal</div>
              <div>$80</div>
            </div>
            <div className="order">
              <div>Shipping Discount</div>
              <div>$80</div>
            </div>
            <div className="order">
              <div>Total</div>
              <div>$80</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
