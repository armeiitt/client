"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import StarRating from '../star_rating/page';

export default function Cart() {
  const [items, setItems] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [formData, setFormData] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [feedbackData, setFeedbackData] = useState({
    productName: "",
    comment: "",
    rating: 0,
  });
  const [feedbackList, setFeedbackList] = useState([]);
  const [showFeedbackList, setShowFeedbackList] = useState(false); // Thêm biến state để điều khiển việc hiển thị danh sách phản hồi

  useEffect(() => {
    const storedItems = localStorage.getItem("cart");
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    }
  }, []);

  // Effect to calculate subtotal
  useEffect(() => {
    const subtotal = items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setSubTotal(subtotal);
  }, [items]);

  // Effect to load feedback list from localStorage
  useEffect(() => {
    const storedFeedbackList = localStorage.getItem("feedbackList");
    if (storedFeedbackList) {
      setFeedbackList(JSON.parse(storedFeedbackList));
    }
  }, []);

  // Function to update localStorage with updated items
  const updateLocalStorage = (updatedItems) => {
    localStorage.setItem("cart", JSON.stringify(updatedItems));
  };

  // Function to increase quantity of an item
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


  useEffect(() => {
    if (selectedFile) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result);
      };
      fileReader.readAsDataURL(selectedFile);
    } else {
      setPreviewUrl(null);
    }
  }, [selectedFile]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Function to handle form submission for feedback
  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedFile) {
      // Xử lý file ở đây, ví dụ: tải lên server, lưu vào trạng thái, etc.
      console.log('Selected file:', selectedFile);
    } else {
      console.log('No file selected.');
    }
  };

  // const handleFeedbackChange = (event) => {
  //   const { name, value } = event.target;
  //   if (name !== "product-name") {
  //     setFeedbackData({ ...feedbackData, [name]: value });
  //   }
  // };

  // Function to handle feedback form change
  const handleFeedbackChange = (event) => {
    const { name, value } = event.target;
    setFeedbackData({ ...feedbackData, [name]: value });
  };


  const handleRatingChange = (newRating) => {
    setFeedbackData({ ...feedbackData, rating: newRating });
  };

  // const handleSubmitFeedback = (event) => {
  //   event.preventDefault();
  //   // Log to check if function is called
  //   console.log("handleSubmitFeedback called");
  //   // Log feedback data to check if it's correct
  //   console.log("Feedback data:", feedbackData);
  //   // Save data to localStorage
  //   localStorage.setItem("feedbackData", JSON.stringify(feedbackData));
  // };

  // Function to handle form submission for feedback
  const handleSubmitFeedback = (event) => {
    event.preventDefault();
    // Add the new feedback to the list
    const newFeedbackList = [...feedbackList, feedbackData];
    setFeedbackList(newFeedbackList);
    // Update localStorage with the new feedback list
    localStorage.setItem("feedbackList", JSON.stringify(newFeedbackList));
  };

  const handleSubmitFeedbackForm = (event) => {
    event.preventDefault();
    handleSubmitFeedback(event); // Call the function to handle feedback submission
    setShowFeedbackList(false); // Set showFeedbackList to true after submitting feedback
  };
  

  useEffect(() => {
    const storedFormData = localStorage.getItem("formData");
    if (storedFormData) {
      setFormData(JSON.parse(storedFormData));
    }
  }, []);

  return (
    <div>
      <div>
        <div className="title_cart">
          <div>
            <h1 className="cart_title">
              <center><span class="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
                YOUR BAG
              </span></center>
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

      </div>
      <div className="form_cart">
        <div className="form_shipping ">
          <form >
            <div className="cart_title">
              <center>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
                  SHIPPING INFORMATION
                </span>
              </center>
            </div>
            <div className="main_shipping_title">
              <div>
                <label>First Name:</label>
              </div>
              <div className="infor_ship">{formData.firstName}</div>
            </div>
            <div className="main_shipping_title">
              <div>
                <label>Last Name:</label>
              </div>
              <div className="infor_ship">{formData.lastName}</div>
            </div>
            <div className="main_shipping_title">
              <div>
                <label>Email:</label>
              </div>
              <div className="infor_ship">{formData.email}</div>
            </div>
            <div className="main_shipping_title">
              <div>
                <label>Phone Number:</label>
              </div>
              <div className="infor_ship">{formData.phoneNumber}</div>
            </div>
            <div className="main_shipping_title">
              <div>
                <label>Address:</label>
              </div>
              <div className="infor_ship">{formData.address}</div>
            </div>
            <div className="main_shipping_title">
              <div>
                <label>Shipping Method:</label>
              </div>
              <div className="infor_ship">Delivery: $4.32</div>
            </div>
            <div className="main_shipping_title">
              <div>
                <label>Payment methods</label>
              </div>
              <div className="infor_ship">Cash on delivery (COD)</div>
            </div>
            <div className="border-b border-gray-900/10 pb-12"></div>
            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                ORDER
              </button>
            </div>
          </form>
        </div>
        <div className="img_between_forms">
          <Image
            src="/images/logo2.jpg"
            alt="picture"
            width={200}
            height={80}
            priority
          />
        </div>
        <div className="form_feedback">
          <form onSubmit={handleSubmitFeedbackForm}>
            <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-12">
                <div className="cart_title">
                  <center>
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
                      FEEDBACK
                    </span>
                  </center>
                </div>

                {/* <div className="mt-10 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-4 "> */}
                <div>
                  <div className="sm:col-span-4">
                    <div className="mt-2">
                      <div className="main_shipping_title">
                        <div>
                          <label>Product Name:</label>
                        </div>
                        <div className="mt-2">
                          <select
                            id="product-name"
                            name="productName"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            value={feedbackData.productName}
                            onChange={handleFeedbackChange}
                          >
                            {items.map((item) => (
                              <option key={item.id} value={item.name}>
                                {item.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                      Your comment
                    </label>
                    <div className="mt-2">
                      <textarea
                        id="comment"
                        name="comment"
                        rows={3}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        // defaultValue={''}
                        value={feedbackData.comment}
                        onChange={handleFeedbackChange}
                      />
                    </div>
                    <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about cakes.</p>
                  </div>
                  <div className="star-rating">
                    <label>Rate this cake:</label>
                    <StarRating initialValue={feedbackData.rating} onChange={handleRatingChange} />
                  </div>

                  <div className="img_feedback">
                    <div className="mt-2 flex items-center gap-x-3 choose_img">
                      <label
                        htmlFor="file-upload"
                        className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 cursor-pointer file-upload-button"
                      >
                        Choose File
                      </label>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        onChange={handleFileChange}
                      />
                    </div>
                    <div className="imgOfFeedback">
                      {previewUrl && (
                        <div className="mt-4">
                          <img src={previewUrl} alt="Preview" className="max-w-full h-auto img-preview" />
                        </div>
                      )}</div></div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
              {/* <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
            Cancel
          </button> */}
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                SEND
              </button>
            </div>
            <div className="feedback-list">
              {showFeedbackList && (
                <>
                  <h2>Feedbacks</h2>
                  <ul>
                    {feedbackList.map((feedback, index) => (
                      <li key={index}>
                        <p>Product Name: {feedback.productName}</p>
                        <p>Comment: {feedback.comment}</p>
                        <p>Rating: {feedback.rating}</p>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </form>
        </div>
      </div >
    </div >
  );
}
