"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import AddToCartButton from "@/components/AddToCartButton";

export default function shopPage() {
  const [data, setData] = useState(null);
  const pathname = usePathname();
  const { push } = useRouter();
  function getProdPhotoURL(nameImg) {
    return `http://10.30.232.103:3000/api/prod_photo/${nameImg}`;
  }

  // useEffect(() => {
  //   const cate = pathname.split("/")[2];
  //   console.log("pathname: " + pathname.split("/")[2]);
  //   const fetchData = async () => {
  //     try {
  //       const res = await fetch(
  //         // `http://localhost:1337/api/categories?filters[slug][$eq]=${
  //         `http://10.30.221.82:3000/api/categories?filters[slug][$eq]=${
  //           pathname.split("/")[2]
  //         }&populate=*`,
  //         {
  //           method: "GET",
  //           // headers: {
  //           //   Authorization:
  //           //     "Bearer e955830f4caa7e9baa1870ef7d20144622215b4139d4170733184bf0a7824269404199106e090e6f191e94f76a143376823c385d900102df221d0013141eef48c5353b027b17745f5ee5167b4eecf80732fdaab09287993408293cd89f948b3336756ad4f41cbc51225c526f142dfcc9043eccbb8ed4bd5d436ddf4576f356e9",
  //           // },
  //         }
  //       );
  //       const dataImg = await res.json();

  //       for (let item of dataImg.data) {
  //         item.src = getProdPhotoURL(item.image);
  //       }
  //       const dataCate = await res.json();
  //       console.log(dataCate.data);
  //       setData(dataCate.data[0].attributes.products.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  useEffect(() => {
    const cate = pathname.split("/")[2];
    const fetchData = async () => {
      try {
        const res = await fetch(
          `http://10.30.232.103:3000/api/products/category/${cate}`
        );
        const dataCate = await res.json();
        console.log(dataCate.data);
        // setData(dataCate.data);
        setData(
          dataCate.data.map((product) => ({
            ...product,
            src: getProdPhotoURL(product.image),
          }))
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      const dataImg = await res.json();
      for (let item of dataImg.data) {
        item.src = getProdPhotoURL(item.image);
      }
    };
    fetchData();
  }, [pathname]);
  function getProdPhotoURL(nameImg) {
    return `http://10.30.232.103:3000/api/prod_photo/${nameImg}`;
  }

  return (
    <div>
      <div className="grid grid-cols-3 gap-4 px-2 py-3">
        {data &&
          data.map((product) => (
            <Card
              shadow="sm"
              key={product.id}
              isPressable
              onPress={() => push(`/product/${product.attributes.slug}`)}
            >
              <CardBody className="overflow-visible p-0">
                {product.src && (
                  <img
                    className="w-full h-auto"
                    src={getProdPhotoURL(product.image)}
                  />
                )}
              </CardBody>
              <CardFooter className="text-small justify-between gap-2">
                <b className="truncate">{product.name}</b>
                <p className="text-default-500">${product.price}</p>
                <div className="flex flex-row w-full justify-end">
                  <AddToCartButton
                    variant="bordered"
                    color="secondary"
                    data={product}
                  >
                    Add To Cart
                  </AddToCartButton>
                </div>
              </CardFooter>
            </Card>
          ))}
      </div>
    </div>
  );
}
