"use client";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import Banner from "@/components/Banner";
import Banner2 from "@/components/Banner2";
import Feedback from "@/components/Feedback";
import { useEffect, useState } from "react";

import { Card, CardBody, CardFooter } from "@nextui-org/react";

import AddToCartButton from "@/components/AddToCartButton";
import { useRouter } from "next/navigation";
import fetchData from "@/components/fetchData";

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const { push } = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [feedbackData, setFeedbackData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          // "http://localhost:1337/api/products?populate=*&pagination[pageSize]=6",
          "http://10.30.232.103:3000/api/products",
          {
            method: "GET",
            // headers: {
            //     Authorization:
            //         "Bearer e955830f4caa7e9baa1870ef7d20144622215b4139d4170733184bf0a7824269404199106e090e6f191e94f76a143376823c385d900102df221d0013141eef48c5353b027b17745f5ee5167b4eecf80732fdaab09287993408293cd89f948b3336756ad4f41cbc51225c526f142dfcc9043eccbb8ed4bd5d436ddf4576f356e9",
            // },
          }
        );
        const dataImg = await res.json();

        for (let item of dataImg.data) {
          item.src = getProdPhotoURL(item.image);
        }
        console.log(dataImg.data);
        setData(dataImg.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error.message);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const storedCartItems = localStorage.getItem("cart");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }

    const storedFeedbackData = localStorage.getItem("feedbackData");
    if (storedFeedbackData) {
      setFeedbackData(JSON.parse(storedFeedbackData));
    }
  }, []);

  function getProdPhotoURL(nameImg) {
    return `http://10.30.232.103:3000/api/prod_photo/${nameImg}`;
  }

  return (
    <main>
      <Banner />
      <section>
        <div className="grid grid-cols-3 gap-4 px-2 py-3">
          {data &&
            data.map((value, index) => (
              <Card
                shadow="sm"
                key={value.id}
                isPressable
                onPress={() => push(`/product/${value.attributes.slug}`)}
              >
                <CardBody className="overflow-visible p-0">
                  {/* <img
                                    className="w-full h-auto"
                                    alt={value.attributes.name}
                                    src={`http://localhost:1337${value.attributes.image.data.attributes.url}`}
                                /> */}
                  {/* Check if value.src exists and render the image */}
                  {value.src && (
                    <img className="w-full h-auto" src={value.src} />
                  )}
                </CardBody>
                <CardFooter className="text-small flex-col gap-2">
                  <div className="flex felx-row justify-between gap-2 w-full">
                    <b className="truncate">{value.name}</b>
                    <p className="text-default-500">${value.price}</p>
                  </div>
                  <div className="flex flex-row w-full justify-end">
                    <AddToCartButton
                      variant="bordered"
                      color="secondary"
                      data={value}
                    >
                      Add To Cart
                    </AddToCartButton>
                  </div>
                </CardFooter>
              </Card>
            ))}
        </div>
      </section>
      <section className="pt-5">
        <Banner2 />
      </section>
      <section>
        <div className="pt-7">
          <Feedback />
          {/* Hiển thị dữ liệu giỏ hàng
          <h2>Cart Items:</h2>
          <ul>
            {cartItems.map((item, index) => (
              <li key={index}>
                {item.name} - Quantity: {item.quantity}
              </li>
            ))}
          </ul> */}
          {/* Hiển thị dữ liệu phản hồi */}
          {/* <h2>User Feedback:</h2>
          <p>Product Name: {feedbackData.productName}</p>
          <p>Comment: {feedbackData.comment}</p>
          <p>Rating: {feedbackData.rating}</p> */}
        </div>
      </section>
    </main>
  );
}
