"use client";

import { useEffect, useState } from "react";
import { Image } from "@nextui-org/react";
import Banner from "@/components/Banner";

export default function Home() {
  const [data, setData] = useState([]);
  const callouts = [
    {
      name: "Desk and Office",
      description: "Work from home accessories",
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg",
      imageAlt:
        "Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.",
      href: "#",
    },
    {
      name: "Self-Improvement",
      description: "Journals and note-taking",
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/home-page-02-edition-02.jpg",
      imageAlt:
        "Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.",
      href: "#",
    },
    {
      name: "Travel",
      description: "Daily commute essentials",
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/home-page-02-edition-03.jpg",
      imageAlt: "Collection of four insulated travel bottles on wooden shelf.",
      href: "#",
    },
  ];
  useEffect(() => {
    const products = [
      {
        id: 1,
        name: "Strawberry Shortcake Truffle Dozen Box",
        imageUrl:
          "https://skins.minimog.co/cdn/shop/products/8_46124baa-b484-4afe-b916-7dfbb2e56007.jpg",
        price: "$32.00",
      },
      {
        id: 2,
        name: "B'day Truffle Dozen Box",
        imageUrl:
          "https://skins.minimog.co/cdn/shop/products/7_93e9fa05-6552-4f57-b264-e94430da2c77.jpg",
        price: "$32.00",
      },
      {
        id: 3,
        name: "Chocolate B'day Truffle Dozen Box",
        imageUrl:
          "https://skins.minimog.co/cdn/shop/products/6_aca54fc4-6e3b-4a2d-81c8-6266fbb1a2a2.jpg",
        price: "$32.00",
      },
      {
        id: 4,
        name: "Milk Bar® Pie",
        imageUrl:
          "https://skins.minimog.co/cdn/shop/products/4_17de000d-8fa7-4349-846f-e754bf4fa7bd.jpg",
        price: "$32.00",
      },
      {
        id: 5,
        name: "Summer Splash",
        imageUrl:
          "https://skins.minimog.co/cdn/shop/products/12_140052e8-2f69-41fe-8cde-c3074e9ea6ca.jpg",
        price: "$32.00",
      },
      {
        id: 6,
        name: "Birthday Cake Ice Cream",
        imageUrl:
          "https://skins.minimog.co/cdn/shop/products/11_90c3e4f2-aa8e-430c-bb48-3d536186f19a.jpg",
        price: "$32.00",
      },
    ];
    setData(products);
  }, []);

  return (
    <div>
      <div>
        <Banner />
        <div className="">
          <div className="heading_container">
            <h4>More cake, cookies, pie</h4>
          </div>
          <div className="grid grid-cols-3 gap-4 px-4 w-full">
            {data.map((v, i) => {
              return (
                <div key={v.id + 1000} className="">
                  <div>
                    <img src={v.imageUrl} />
                  </div>
                  <div>
                    <div>{v.name}</div>
                    <div>{v.price}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="bg-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
            <h2 className="text-2xl font-bold text-gray-900">Collections</h2>

            <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
              {callouts.map((callout) => (
                <div key={callout?.name} className="group relative">
                  <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                    <img
                      src={callout?.imageSrc}
                      alt={callout?.imageAlt}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <h3 className="mt-6 text-sm text-gray-500">
                    <a href={callout?.href}>
                      <span className="absolute inset-0" />
                      {callout?.name}
                    </a>
                  </h3>
                  <p className="text-base font-semibold text-gray-900">
                    {callout?.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
