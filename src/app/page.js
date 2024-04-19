"use client";

import Banner from "@/components/Banner";
import { useEffect, useState } from "react";

import { Card, CardBody, CardFooter } from "@nextui-org/react";

import AddToCartButton from "@/components/AddToCartButton";
import { useRouter } from "next/navigation";

export default function Home() {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState();
	const { push } = useRouter();

	useEffect(() => {
		const fetchData = async () => {
			try {
				let url = "http://localhost:3000/api/categories";
				const res = await fetch(
					url,
					// "http://localhost:1337/api/products?populate=*&pagination[pageSize]=6",
					{
						method: "GET",
						// headers: {
						// 	Authorization:
						// 		"Bearer e955830f4caa7e9baa1870ef7d20144622215b4139d4170733184bf0a7824269404199106e090e6f191e94f76a143376823c385d900102df221d0013141eef48c5353b027b17745f5ee5167b4eecf80732fdaab09287993408293cd89f948b3336756ad4f41cbc51225c526f142dfcc9043eccbb8ed4bd5d436ddf4576f356e9",
						// },
					}
				);
				const data = await res.json();
				setData(data.data);
				console.log(data.data);
				setLoading(false);
			} catch (error) {
				setLoading(false);
				setError(error.message);
			}
		};
		fetchData();
	}, []);
	return (
		<main>
			<Banner />
			<section>
				{loading ? (
					<>Loading...</>
				) : error ? (
					<div>{error}</div>
				) : (
					<div className="grid grid-cols-3 gap-4 px-2 py-3">
						{data.map((value, index) => {
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
												`http://localhost:1337` +
												value.attributes.image.data.attributes.url
											}
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
							);
						})}
					</div>
				)}
			</section>
			<section></section>
		</main>
	);
}
