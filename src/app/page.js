"use client";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import Banner from "@/components/Banner";
import Banner2 from "@/components/Banner2";
import Feedback from '@/components/Feedback';
import { useEffect, useState } from "react";

import { Card, CardBody, CardFooter } from "@nextui-org/react";

import AddToCartButton from "@/components/AddToCartButton";
import { useRouter } from "next/navigation";
// Import fetchData function from fetchData.js
import fetchData from '@/components/fetchData';

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
                    "http://localhost:1337/api/products?populate=*&pagination[pageSize]=6",
                    {
                        method: "GET",
                        headers: {
                            Authorization:
                                "Bearer e955830f4caa7e9baa1870ef7d20144622215b4139d4170733184bf0a7824269404199106e090e6f191e94f76a143376823c385d900102df221d0013141eef48c5353b027b17745f5ee5167b4eecf80732fdaab09287993408293cd89f948b3336756ad4f41cbc51225c526f142dfcc9043eccbb8ed4bd5d436ddf4576f356e9",
                        },
                    }
                );
                const data = await res.json();
                setData(data.data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                setError(error.message);
            }
        };
        fetchData();
    }, []);
    useEffect(() => {
        // Lấy dữ liệu giỏ hàng từ localStorage khi component được tải lần đầu tiên
        const storedCartItems = localStorage.getItem('cart');
        if (storedCartItems) {
            setCartItems(JSON.parse(storedCartItems));
        }

        // Lấy dữ liệu phản hồi từ localStorage khi component được tải lần đầu tiên
        const storedFeedbackData = localStorage.getItem('feedbackData');
        if (storedFeedbackData) {
            setFeedbackData(JSON.parse(storedFeedbackData));
        }
    }, []);
    return (
        <main>
            <Banner />
            <section>
                <div className="grid grid-cols-3 gap-4 px-2 py-3">
                    {data && data.map((value, index) => (
                        <Card
                            shadow="sm"
                            key={value.id}
                            isPressable
                            onPress={() => push(`/product/${value.attributes.slug}`)}
                        >
                            <CardBody className="overflow-visible p-0">
                                <img
                                    className="w-full h-auto"
                                    alt={value.attributes.name}
                                    src={`http://localhost:1337${value.attributes.image.data.attributes.url}`}
                                />
                            </CardBody>
                            <CardFooter className="text-small flex-col gap-2">
                                <div className="flex felx-row justify-between gap-2 w-full">
                                    <b className="truncate">{value.attributes.name}</b>
                                    <p className="text-default-500">
                                        ${value.attributes.regular_price}
                                    </p>
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
            <section>
                <Banner2 />
            </section>
            <section>
                <div>
                    <Feedback/>
                    {/* Hiển thị dữ liệu giỏ hàng
                <h2>Cart Items:</h2>
                <ul>
                    {cartItems.map((item, index) => (
                        <li key={index}>{item.name} - Quantity: {item.quantity}</li>
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
