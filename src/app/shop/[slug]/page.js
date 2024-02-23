"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import AddToCartButton from "@/components/AddToCartButton";
export default function page() {
  const [data, setData] = useState(null);
  const pathname = usePathname();
  const { push } = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `http://localhost:1337/api/categories?filters[slug][$eq]=${
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
        console.log(data);
        setData(data.data[0].attributes.products.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  console.log(data);
  return (
    <div>
      <div className="grid grid-cols-3 gap-4 px-2 py-3">
        {data?.map((value, index) => {
          return (
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
                  src={
                    value?.attributes?.image?.data?.attributes?.url
                      ? `http://localhost:1337${value?.attributes?.image?.data?.attributes?.url}`
                      : value?.attributes?.feature_image
                  }
                />
              </CardBody>
              <CardFooter className="text-small justify-between gap-2">
                <b className="truncate">{value.attributes.name}</b>
                <p className="text-default-500">
                  ${value.attributes.regular_price}
                </p>
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
          );
        })}
      </div>
    </div>
  );
}
