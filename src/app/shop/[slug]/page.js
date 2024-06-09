"use client";
import environment from "@/app/environment/environment";
import AddToCartButton from "@/components/AddToCartButton";
import { Card, CardBody, CardFooter } from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ScrollToTopButton from "@/components/ScrollToTopButton";
export default function shopPage() {
  const [data, setData] = useState(null);
  const pathname = usePathname();
  const { push } = useRouter();

  // function getProdPhotoURL(nameImg) {
  //   // return `http://10.30.232.103:3000/api/prod_photo/${nameImg}`;
  // }

  useEffect(() => {
    const cate = pathname.split("/")[2];
    const fetchData = async () => {
      try {
        let api_url = `http://${environment.API_DOMAIN}:${environment.API_PORT}/api/products/category/${cate}`;
        let rest_api = { method: "GET" };
        const res = await fetch(api_url, rest_api);
        const dataCate = await res.json();
        setData(
          dataCate.data.map((product) => ({
            ...product,
            src: getProdPhotoURL(product.image),
          }))
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [pathname]);

  function getProdPhotoURL(nameImg) {
    return `http://${environment.API_DOMAIN}:${environment.API_PORT}/api/prod_photo/${nameImg}`;
  }

  return (
    <div>
      <div className="grid grid-cols-3 gap-4 px-2 py-3">
        {data &&
          data.map((product) => (
            <Card
              shadow="sm"
              key={product.id}
              isPressable={false}
              onPress={() => {
                if (product.attributes && product.attributes.slug) {
                  push(`/product/${product.attributes.slug}`);
                }
              }}
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
      <ScrollToTopButton />
    </div>
  );
}
