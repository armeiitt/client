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
      <div>
        <div className="title_cart">
          <div>
            <h1 className="your_bag_title">
              <center>YOUR BAG</center>
            </h1>
          </div>
          <div className="main_title">
            {/* <div className="continue_shopping">
            <Button
              radius="full"
              className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
            >
              CONTINUE SHOPPING
            </Button>
          </div> */}
            <div className="shopping_bag">
              <h3>Shopping Bags ({items.length}) </h3>
            </div>
            {/* <div className="checkout">
            <Button
              radius="full"
              className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
            >
              CHECKOUT NOW
            </Button>
          </div> */}
          </div>
        </div>
        <div className="main_cart flex gap-3">
          <div className="product_cart">
            {items.map((item, index) => {
              return (
                <div key={index} className="flex flex-row justify-between">
                  <div className="w-[40%]">{item.name}</div>
                  <div className="button_cart">
                    {/* <Button onClick={() => decreaseQuantity(item.id)}> - </Button> */}
                    <Button
                      color="primary"
                      variant="light"
                      onClick={() => decreaseQuantity(item.id)}
                    >
                      {" "}
                      -
                    </Button>
                    {item.quantity}
                    {/* <Button onClick={() => increaseQuantity(item.id)}> + </Button> */}
                    <Button
                      color="primary"
                      variant="light"
                      onClick={() => increaseQuantity(item.id)}
                    >
                      {" "}
                      +
                    </Button>
                  </div>
                  <div>${item.price * item.quantity}</div>
                </div>
              );
            })}
          </div>
          <div className="order_summary">
            <div>
              <div className="order_summary_title">
                <h3>
                  <center>ORDER SUMMARY</center>
                </h3>
              </div>
              <div className="order">
                {/* <div>{items.map((item) => item.name).join(", ")}</div> */}
                <div className="products-container">
                  {items.map((item) => (
                    <div key={item.id} className="product-item">
                      <div className="product-name">{item.name}</div>
                      <div className="product-price">
                        ${item.price * item.quantity}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
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
      <div className="isolate bg-white px-6 py-5 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Customer Information
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600"></p>
        </div>
        <form
          action="#"
          method="POST"
          // onSubmit={handleSubmit}
          className="mx-auto mt-16 max-w-xl sm:mt-20"
        >
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div>
              <label
                htmlFor="first-name"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                First name
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="last-name"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Last name
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="company"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Address
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="address"
                  id="address"
                  autoComplete="organization"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="email"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Email
              </label>
              <div className="mt-2.5">
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="phone-number"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Phone number
              </label>
              <div className="relative mt-2.5">
                <div className="absolute inset-y-0 left-0 flex items-center">
                  <label htmlFor="country" className="sr-only">
                    Country
                  </label>
                  <select
                    id="country"
                    name="country"
                    className="h-full rounded-md border-0 bg-transparent bg-none py-0 pl-4 pr-9 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                  >
                    <option>US</option>
                    <option>CA</option>
                    <option>EU</option>
                  </select>
                  {/* <ChevronDownIcon
                  className="pointer-events-none absolute right-3 top-0 h-full w-5 text-gray-400"
                  aria-hidden="true"
                /> */}
                </div>
                <input
                  type="tel"
                  name="phone-number"
                  id="phone-number"
                  autoComplete="tel"
                  className="block w-full rounded-md border-0 px-3.5 py-2 pl-20 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="message"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Message
              </label>
              <div className="mt-2.5">
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={""}
                />
              </div>
            </div>
            {/* <div className="flex gap-x-4 sm:col-span-2">
            <div className="flex h-6 items-center">
              <div
                checked={agreed}
                onChange={setAgreed}
                className={classNames(
                  agreed ? "bg-indigo-600" : "bg-gray-200",
                  "flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                )}
              >
                <span className="sr-only">Agree to policies</span>
                <span
                  aria-hidden="true"
                  className={classNames(
                    agreed ? "translate-x-3.5" : "translate-x-0",
                    "h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out"
                  )}
                />
              </div>
            </div>
            <label className="text-sm leading-6 text-gray-600">
              By selecting this, you agree to our{" "}
              <a href="#" className="font-semibold text-indigo-600">
                privacy&nbsp;policy
              </a>
              .
            </label>
          </div> */}
          </div>

          <div className="mt-10">
            <button
              type="submit"
              className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
