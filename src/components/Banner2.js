import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import 'swiper/css';

const fetchData = async (pathname) => {
    try {
        const res = await fetch(
            `http://localhost:1337/api/products?filters[slug][$eq]=${pathname}&populate=*`,
            {
                method: "GET",
                headers: {
                    Authorization:
                        "Bearer e955830f4caa7e9baa1870ef7d20144622215b4139d4170733184bf0a7824269404199106e090e6f191e94f76a143376823c385d900102df221d0013141eef48c5353b027b17745f5ee5167b4eecf80732fdaab09287993408293cd89f948b3336756ad4f41cbc51225c526f142dfcc9043eccbb8ed4bd5d436ddf4576f356e9",
                },
            }
        );
        const data = await res.json();
        return data.data[0];
    } catch (error) {
        console.log(error);
    }
};

export default ({ params }) => {
    const [swiper, setSwiper] = React.useState(null);

    React.useEffect(() => {
        const fetchDataAndUpdateState = async () => {
            if (params && params.slug) {
                const fetchedData = await fetchData(params.slug);
                console.log("Fetched data:", fetchedData); // Add this line to log fetched data
            }
        };
    
        fetchDataAndUpdateState();
    }, [params]);

    return (
        <div>
            <div className="title_banner2"><span class="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">Best seller</span></div>
            <Swiper
                spaceBetween={50}
                slidesPerView={3}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => setSwiper(swiper)}
                autoplay={{ delay: 3000 }} // Auto chạy sau mỗi 3 giây
            >
                <SwiperSlide>
                    <Image
                        src="/images/cake15.jpg"
                        alt="picture"
                        width={200}
                        height={200}
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <Image 
                        src="/images/cake1.jpg"
                        alt="picture"
                        width={200}
                        height={200}
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <Image 
                        src="/images/cookie10.jpg"
                        alt="picture"
                        width={200}
                        height={200}
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <Image
                        src="/images/macaron2.jpg"
                        alt="picture"
                        width={200}
                        height={200}
                    />
                </SwiperSlide>
            </Swiper>
        </div>
    );
};
