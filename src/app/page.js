"use client";

import AddToCartButton from "@/components/AddToCartButton";
import Banner from "@/components/Banner";
import Banner2 from "@/components/Banner2";
import Feedback from "@/components/Feedback";
import { Card, CardBody, CardFooter } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "swiper/css";
import environment from "./environtment/environment";

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
        let api_url = `http://${environment.API_DOMAIN}:${environment.API_PORT}/api/products`;
        let rest_api = { method: "GET" };
        // "http://localhost:1337/api/products?populate=*&pagination[pageSize]=6",
        const res = await fetch(api_url, rest_api);
        const dataImg = await res.json();
        for (let item of dataImg.data) {
          item.src = getProdPhotoURL(item.image);
        }
        setData(dataImg.data);
        setLoading(false);
        console.log(1121312);
      } catch (error) {
        setLoading(false);
        setError(error.message);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    // const storedCartItems = localStorage.getItem("cart");
    // if (storedCartItems) {
    //   setCartItems(JSON.parse(storedCartItems));
    // }

    const storedFeedbackData = localStorage.getItem("feedbackData");
    if (storedFeedbackData) {
      setFeedbackData(JSON.parse(storedFeedbackData));
    }
  }, []);

  function getProdPhotoURL(nameImg) {
    return `http://${environment.API_DOMAIN}:${environment.API_PORT}/api/prod_photo/${nameImg}`;
  }

  return (
    <main>
      <Banner />
      <section>
        <div className="grid grid-cols-3 gap-4 px-2 py-3">
          {data &&
            data.slice(0, 9).map((value, index) => (
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
