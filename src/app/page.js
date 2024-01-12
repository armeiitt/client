"use client";

import { useEffect, useState } from "react";
import { Image } from "@nextui-org/react";

export default function Home() {
  const [data, setData] = useState([]);

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
    <main>
      <div>
        <div className="">
          <div className="heading_container">
            <h4>More cake, cookies, pie</h4>
          </div>
          <div className="grid grid-cols-3 gap-4 px-4 w-full">
            {data.map((v, i) => {
              return (
                <div key={v.id} className="">
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
    </main>
  );
}
