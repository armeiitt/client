"use client";
import React, { useState, useEffect } from "react";

import { usePathname } from "next/navigation";

export default function page() {
  const [data, setData] = useState(null);
  const pathname = usePathname();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `http://localhost:1337/api/products?filters[slug][$eq]=${
            pathname.split("/")[2]
          }&populate=*`,
          {
            method: "GET",
            headers: {
              Authorization:
                "Bearer e955830f4caa7e9baa1870ef7d20144622215b4139d4170733184bf0a7824269404199106e090e6f191e94f76a143376823c385d900102df221d0013141eef48c5353b027b17745f5ee5167b4eecf80732fdaab09287993408293cd89f948b3336756ad4f41cbc51225c526f142dfcc9043eccbb8ed4bd5d436ddf4576f356e9",
            },
          }
        );
        const data = await res.json();
        setData(data.data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <section>
        <div className="flex flex-row justify-between w-full px-2 py-3">
          <div>
            <img
              src={
                `http://localhost:1337` +
                data?.attributes.image.data.attributes.url
              }
            />
          </div>
          <div>
            <div>{data?.attributes.name}</div>
            <div>{data?.attributes.regular_price}</div>
            <div>{data?.attributes.description}</div>
          </div>
        </div>
      </section>
    </div>
  );
}
