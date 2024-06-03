"use client";

import environment from "@/app/environment/environment";
import AddToCartButton from "@/components/AddToCartButton";
import {
	Button,
	Checkbox,
	CheckboxGroup,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
} from "@nextui-org/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import apiService from "../shared/sharedService";

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

export default function Designed_Cake() {
	const [listShape, setListShape] = useState([]);
	const [listSize, setListSize] = useState([]);
	const [listFlavour, setListFlavour] = useState([]);

	const [listFruit, setListFruit] = useState([]);
	const [listAnimal, setListAnimal] = useState([]);
	const [listSex, setListSex] = useState([]);
	const [listCandle, setListCandle] = useState([]);

	useEffect(() => {
		fetchData();
		fetchDecors();
	}, []);

	async function fetchData() {
		try {
			const [shapesData, sizesData, flavoursData] = await Promise.all([
				apiService.getData("shapes"),
				apiService.getData("sizes"),
				apiService.getData("flavours"),
			]);
			setListShape(shapesData.data);
			setListSize(sizesData.data);
			setListFlavour(flavoursData.data);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	}

	async function fetchDecors() {
		try {
			const temp = await apiService.getData("decors");
			const tempFruits = temp.data.filter((item) => item.type === "fruits");
			const tempAnimals = temp.data.filter((item) => item.type === "animals");
			const tempSex = temp.data.filter((item) => item.type === "sex");
			const tempCandles = temp.data.filter((item) => item.type === "candles");

			const decorateItems = async (items) => {
				for (let item of items) {
					item.imageSrc = apiService.getDecorPhotoURL(item.image);
				}
			};

			await Promise.all([
				decorateItems(tempFruits),
				decorateItems(tempAnimals),
				decorateItems(tempSex),
				decorateItems(tempCandles),
			]);
			console.log(tempFruits);
			console.log(tempAnimals);
			console.log(tempSex);
			console.log(tempCandles);
			setListFruit(tempFruits);
			setListAnimal(tempAnimals);
			setListSex(tempSex);
			setListCandle(tempCandles);
		} catch (error) {
			console.error("Error fetching decorations:", error);
		}
	}

	const postDesProd = async (desProd) => {
		try {
			let api_url = `http://${environment.API_DOMAIN}:${environment.API_PORT}/api/des_products`;
			let rest_api = {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(desProd),
			};

			const res = await fetch(api_url, rest_api);
			console.log(res);
		} catch (error) {
			console.log(error);
		}
	};

	const [selectFruits, setSelectFruits] = useState([]);
	const [selectAnimals, setSelectAnimals] = useState([]);
	const [selectSex, setSelectSex] = useState([]);
	const [selectCandles, setSelectCandles] = useState([]);

	const [selectedShape, setSelectedShape] = React.useState(new Set());
	const selectedShapeValue = React.useMemo(() => {
		if (selectedShape.size > 0) {
			const selected = Array.from(selectedShape)[0];
			return `${selected.shape} - $${selected.price}`;
		}
		return "Shapes";
	}, [selectedShape]);

	const [selectedSize, setSelectedSize] = React.useState(new Set());
	const selectedSizeValue = React.useMemo(() => {
		if (selectedSize.size > 0) {
			const selected = Array.from(selectedSize)[0];
			return `${selected.size} - $${selected.price}`;
		}
		return "Sizes";
	}, [selectedSize]);

	const [selectedFlavour, setSelectedFlavour] = React.useState(new Set());
	const selectedFlavourValue = React.useMemo(() => {
		if (selectedSize.size > 0) {
			const selected = Array.from(selectedFlavour)[0];
			return `${selected.flavour} - $${selected.price}`;
		}
		return "Flavours";
	}, [selectedFlavour]);

	const [userInput, setUserInput] = useState("");
	const handleChange = (event) => {
		setUserInput(event.target.value);
	};

	const handleFruitSelectionChange = (newSelection) => {
		if (newSelection.length <= 2) {
			setSelectFruits(newSelection);
		}
	};

	const handleAnimalSelectionChange = (newSelection) => {
		if (newSelection.length <= 1) {
			setSelectAnimals(newSelection);
		}
	};

	const handleSexSelectionChange = (newSelection) => {
		if (newSelection.length <= 1) {
			setSelectSex(newSelection);
		}
	};

	const handleCandleSelectionChange = (newSelection) => {
		if (newSelection.length <= 1) {
			setSelectCandles(newSelection);
		}
	};

	const calculateFruitPrice = () => {
		return selectFruits.reduce((totalPrice, each) => {
			const selectedFruit = listFruit.find((item) => item.decor_id === each);
			if (selectedFruit) {
				return totalPrice + parseFloat(selectedFruit.price);
			}
			return totalPrice;
		}, 0);
	};

	const calculateAnimalPrice = () => {
		return selectAnimals.reduce((totalPrice, each) => {
			const selectedAnimal = listAnimal.find((item) => item.decor_id === each);
			if (selectedAnimal) {
				return totalPrice + parseFloat(selectedAnimal.price);
			}
			return totalPrice;
		}, 0);
	};

	const calculateSexPrice = () => {
		return selectSex.reduce((totalPrice, each) => {
			const selectedSex = listSex.find((item) => item.decor_id === each);
			if (selectedSex) {
				return totalPrice + parseFloat(selectedSex.price);
			}
			return totalPrice;
		}, 0);
	};

	const calculateCandlePrice = () => {
		return selectCandles.reduce((totalPrice, each) => {
			const selectedCandle = listCandle.find((item) => item.decor_id === each);
			if (selectedCandle) {
				return totalPrice + parseFloat(selectedCandle.price);
			}
			return totalPrice;
		}, 0);
	};

	const calculateTotalPrice = () => {
		let shapePrice = parseFloat(Array.from(selectedShape)[0]?.price) || 0;
		let sizePrice = parseFloat(Array.from(selectedSize)[0]?.price) || 0;
		let flavourPrice = parseFloat(Array.from(selectedFlavour)[0]?.price) || 0;

		let fruitPrice = calculateFruitPrice();
		let animalPrice = calculateAnimalPrice();
		let sexPrice = calculateSexPrice();
		let candlePrice = calculateCandlePrice();

		let total_price = shapePrice + sizePrice + flavourPrice + fruitPrice + animalPrice + sexPrice + candlePrice;
		return total_price;
	};

	const getDesProd = async () => {
		console.log("getDesProd called");
		addNewCake();
		setUserInput(`Cake ${nextCakeNumber}`);
		let data = {
			selectedShape,
			selectedSize,
			selectedFlavour: selectedFlavour,
			selectFruits,
			selectAnimals,
			selectSex,
			selectCandles,
		};
	};

	const saveDataDesProd = () => {
		let desProd = {
			category_id: 1,
			size_id: Array.from(selectedSize)[0]?.size_id || null,
			shape_id: Array.from(selectedShape)[0]?.shape_id || null,
			flavour_id: Array.from(selectedFlavour)[0]?.flavour_id || null,
			name: "thinh",
			price: calculateTotalPrice(),
		};
		console.log(desProd);
	};

	const [cakes, setCakes] = useState([]);
	const [cakeId, setCakeId] = useState(1);
	const [nextCakeNumber, setNextCakeNumber] = useState(1);

	const addNewCake = () => {
		const newCakeName = `Cake ${nextCakeNumber}`;
		// const totalPrice = calculateTotalPrice();

		const newCake = { name: newCakeName, totalPrice };
		setCakes([...cakes, newCake]);
		setNextCakeNumber(nextCakeNumber + 1);
		setUserInput(newCakeName);
		setCakeId(nextCakeNumber);
	};

	const handleDelete = (index) => {
		const updatedCakes = [...cakes];
		updatedCakes.splice(index, 1);
		setCakes(updatedCakes);
	};

	const [showCakeNameInTextarea, setShowCakeNameInTextarea] = useState(true);

	return (
		<div className="main_designed_cake">
			<div className="selected_items ">
				<div className="isolate bg-white px-6 py-5 lg:px-4">
					<div className="mx-auto max-w-2xl text-center">
						<div className="title_designed_cake">
							<span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
								LET'S DESIGN YOUR CAKE
							</span>
							<button onClick={saveDataDesProd}>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</button>
						</div>
						<div>
							<center>
								<Image src="/images/designed_cake.jpg" alt="picture" width={100} height={100} />
							</center>
						</div>
						<p className="mt-1 text-lg leading-8 text-gray-600"></p>
					</div>
					<form action="#" method="POST" className="mx-auto mt-2 max-w-xl sm:mt-2">
						<div className="grid grid-cols-3 gap-x-48 gap-y-6 sm:grid-cols-2">
							<textarea
								name="message"
								id="message"
								rows={4}
								className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								value={showCakeNameInTextarea ? `Cake ${cakeId}` : userInput}
								onChange={handleChange}
							/>

							<div className="sm:col-span-2">
								<label
									htmlFor="shape"
									className="title_designed_cake_left block text-sm font-semibold leading-6 text-gray-900"
								>
									Shape
								</label>
								<div className="mt-2.5">
									<Dropdown>
										<DropdownTrigger>
											<Button variant="bordered" className="capitalize">
												{selectedShapeValue}
											</Button>
										</DropdownTrigger>
										<DropdownMenu
											aria-label="Single selection example"
											variant="flat"
											disallowEmptySelection
											selectionMode="single"
											selectedKeys={selectedShape}
											onSelectionChange={(key) => {
												const selected = listShape.find(
													(each) => each.shape === key.currentKey
												);
												setSelectedShape(new Set([selected]));
											}}
										>
											{Array.isArray(listShape) &&
												listShape.map((each) => (
													<DropdownItem
														key={each.shape}
														data-price={each.price}
														value={each.shape}
														textValue={`${each.shape} - ${each.price}`}
													>
														{each.shape} - ${each.price}
													</DropdownItem>
												))}
										</DropdownMenu>
									</Dropdown>
								</div>
							</div>

							<div className="sm:col-span-2">
								<label
									htmlFor="size"
									className="title_designed_cake_left block text-sm font-semibold leading-6 text-gray-900"
								>
									Size
								</label>
								<div className="mt-2">
									<Dropdown>
										<DropdownTrigger>
											<Button variant="bordered" className="capitalize">
												{selectedSizeValue}
											</Button>
										</DropdownTrigger>
										<DropdownMenu
											aria-label="Single selection example"
											variant="flat"
											disallowEmptySelection
											selectionMode="single"
											selectedKeys={selectedSize}
											onSelectionChange={(key) => {
												const selected = listSize.find(
													(each) => each.size === key.currentKey
												);
												setSelectedSize(new Set([selected]));
											}}
										>
											{Array.isArray(listSize) &&
												listSize.map((each) => (
													<DropdownItem
														key={each.size}
														data-price={each.price}
														value={each.size}
														textValue={`${each.size} - ${each.price}`}
													>
														{each.size} - ${each.price}
													</DropdownItem>
												))}
										</DropdownMenu>
									</Dropdown>
								</div>
							</div>

							<div className="sm:col-span-2">
								<label
									htmlFor="flavour"
									className="title_designed_cake_left block text-sm font-semibold leading-6 text-gray-900"
								>
									Flavour
								</label>
								<div className="mt-2.5">
									<div>
										<Dropdown>
											<DropdownTrigger>
												<Button variant="bordered" className="capitalize">
													{selectedFlavourValue}
												</Button>
											</DropdownTrigger>
											<DropdownMenu
												aria-label="Single selection example"
												variant="flat"
												disallowEmptySelection
												selectionMode="single"
												selectedKeys={selectedFlavour}
												onSelectionChange={(key) => {
													const selected = listFlavour.find(
														(each) => each.flavour === key.currentKey
													);
													setSelectedFlavour(new Set([selected]));
												}}
											>
												{Array.isArray(listFlavour) &&
													listFlavour.map((each) => (
														<DropdownItem
															key={each.flavour}
															data-price={each.price}
															value={each.flavour}
															textValue={`${each.shape} - ${each.price}`}
														>
															{each.flavour} - ${each.price}
														</DropdownItem>
													))}
											</DropdownMenu>
										</Dropdown>
									</div>
								</div>
							</div>

							<div className="sm:col-span-2">
								<label
									htmlFor="sticker"
									className="title_designed_cake_left block text-sm font-semibold leading-6 text-gray-900"
								>
									Decorations
								</label>
								<div className="relative mt-1.5">
									<div>
										<label>Fruits</label>
									</div>
									<div>
										<CheckboxGroup
											orientation="horizontal"
											color="secondary"
											value={selectFruits}
											onChange={handleFruitSelectionChange}
										>
											{listFruit.map((each) => (
												<Checkbox key={each.decor_id} value={each.decor_id}>
													<div className="fruit-checkbox">
														<img
															src={each.imageSrc}
															alt={each.name}
															width={80}
															height={100}
														/>
													</div>
												</Checkbox>
											))}
										</CheckboxGroup>
									</div>
								</div>
								<div className="relative mt-2.5">
									<div>
										<label>Animals</label>
									</div>
									<div>
										<CheckboxGroup
											orientation="horizontal"
											color="secondary"
											value={selectAnimals}
											onChange={handleAnimalSelectionChange}
										>
											{listAnimal.map((each) => (
												<Checkbox key={each.decor_id} value={each.decor_id}>
													<div className="animal-checkbox">
														<img
															src={each.imageSrc}
															alt={each.name}
															width={70}
															height={70}
														/>
													</div>
												</Checkbox>
											))}
										</CheckboxGroup>
										{/* <p>Total Price: ${calculateTotalPrice()}</p> */}
									</div>
								</div>
								<div className="relative mt-2.5">
									<div>
										<label>Sex</label>
									</div>
									<div>
										<CheckboxGroup
											className="container_image_designed_cake"
											orientation="horizontal"
											color="secondary"
											defaultValue={[]}
											value={selectSex}
											onChange={handleSexSelectionChange}
										>
											{listSex.map((each) => (
												<Checkbox key={each.decor_id} value={each.decor_id}>
													<div className="sex-checkbox">
														<img
															src={each.imageSrc}
															alt={each.name}
															width={70}
															height={70}
														/>
													</div>
												</Checkbox>
											))}
										</CheckboxGroup>
										{/* <p>Total Price: ${calculateTotalPrice()}</p> */}
									</div>
								</div>
							</div>

							<div className="sm:col-span-2">
								<label
									htmlFor="sticker"
								// className="block text-sm font-semibold leading-6 text-gray-900"
								>
									Candles (Accessory)
								</label>
								<div className="relative mt-1.5">
									<div>
										<CheckboxGroup
											className="container_image_designed_cake"
											orientation="horizontal"
											color="secondary"
											defaultValue={[]}
											value={selectCandles}
											onChange={handleCandleSelectionChange}
										>
											{listCandle.map((each) => (
												<Checkbox key={each.decor_id} value={each.decor_id}>
													<div className="candle-checkbox">
														<img
															src={each.imageSrc}
															alt={each.name}
															width={70}
															height={70}
														/>
													</div>
												</Checkbox>
											))}
										</CheckboxGroup>
									</div>
								</div>
							</div>

							<div className="sm:col-span-2">
								<label
									htmlFor="message"
									className="title_designed_cake_left block text-sm font-semibold leading-6 text-gray-900"
								>
									Message
								</label>
								<div className="mt-2.5 pb-2">
									<textarea
										name="message"
										id="message"
										rows={4}
										className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
										value={userInput}
										onChange={handleChange}
									/>
								</div>
								<table className="table_designed_cake">
									<thead>
										<tr>
											<th>Name</th>
											<th>Total Price</th>
											<th>Action</th>
											<th>Delete</th>
										</tr>
									</thead>
									<tbody>
										{cakes.map((cake, index) => (
											<tr key={cake.name}>
												<td>{cake.name}</td>
												<td>${cake.totalPrice.toFixed(2)}</td>
												<td>
													<AddToCartButton
														variant="bordered"
														color="#ff0000"
														data={saveDataDesProd}
													>
														Add To Cart
													</AddToCartButton>
												</td>
												<td>
													<button
														className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
														onClick={() => handleDelete(index)}
														style={{
															backgroundColor: "#ff0000",
															color: "#fff",
															border: "none",
															padding: "8px 16px",
															borderRadius: "4px",
															cursor: "pointer",
														}}
													>
														Delete
													</button>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
					</form>
				</div>
			</div>
			<div className="detail_designed_cake">
				<div className="title_designed_cake mx-auto max-w-2xl text-center pt-5">
					<span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
						A DESIGNED CAKE INFORMATION
					</span>
				</div>
				<div className="information_designed_cake">
					<div className="body_designed_cake">
						<div className="name_designed_cake">Shape: </div>
						<div>{selectedShapeValue}</div>
					</div>
					<div style={{ borderBottom: "2px solid #000" }}></div>
					<div className="body_designed_cake">
						<div className="name_designed_cake">Size: </div>
						<div>{selectedSizeValue}</div>
					</div>
					<div style={{ borderBottom: "2px solid #000" }}></div>
					<div className="body_designed_cake">
						<div className="name_designed_cake">Flavour: </div>
						<div>{selectedFlavourValue}</div>
					</div>
					<div style={{ borderBottom: "2px solid #000" }}></div>
					<div className="name_designed_cake decoration_container">Decorations: </div>

					<div>
						{selectFruits.length > 0 ? (
							selectFruits.map((value, index) => {
								const fruit = listFruit.find((item) => item.decor_id === value);
								return (
									<div className="fruit_price" key={index}>
										{fruit ? (
											<div>
												<span>{fruit.name} - ${fruit.price}</span>
											</div>
										) : null}
									</div>
								);
							})
						) : (
							<div>No Fruits</div>
						)}
					</div>

					<div>
						{selectAnimals.length > 0 ? (
							selectAnimals.map((value, index) => {
								const animal = listAnimal.find((item) => item.decor_id === value);
								return (
									<div className="animal_price" key={index}>
										{animal ? (
											<div>
												<span>{animal.name} - ${animal.price}</span>
											</div>
										) : null}
									</div>
								);
							})
						) : (
							<div>No Animals</div>
						)}
					</div>

					<div>
						{selectSex.length > 0 ? (
							selectSex.map((value, index) => {
								const sex = listSex.find((item) => item.decor_id === value);
								return (
									<div className="sex_price" key={index}>
										{sex ? (
											<div>
												<span>{sex.name} - ${sex.price}</span>
											</div>
										) : null}
									</div>
								);
							})
						) : (
							<div>No Sex</div>
						)}
					</div>

					<div>
						{selectCandles.length > 0 ? (
							selectCandles.map((value, index) => {
								const candle = listCandle.find((item) => item.decor_id === value);
								return (
									<div className="candle_price" key={index}>
										{candle ? (
											<div>
												<span>{candle.name} - ${candle.price}</span>
											</div>
										) : null}
									</div>
								);
							})
						) : (
							<div>No Candles</div>
						)}
					</div>

					<div style={{ borderBottom: "2px solid #000" }}></div>
					<div className="body_designed_cake">
						{" "}
						<div className="name_designed_cake"> Let's enter text: </div>
						<div>{userInput}</div>
					</div>{" "}
					<div style={{ borderBottom: "2px solid #000" }}></div>
				</div>

				<div className="price_of_designed_cake">
					<div className="title_designed_cake mx-auto max-w-2xl text-center pt-5">
						<span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
							PRICE OF DESIGNED CAKE
						</span>
					</div>

					<div style={{ borderBottom: "2px solid #000" }}></div>
					<div className="total_price" id="title_designed_cake_price">
						<div className="text_title_designed_cake_price">Total Price</div>
						<div>${calculateTotalPrice()}</div>
					</div>
				</div>

				<div>
					<div className="flex justify-center">
						<button
							className="bg-white border border-purple-500 hover:bg-purple-500 hover:text-white font-bold py-2 px-4 rounded-full"
							onClick={getDesProd}
						>
							Create
						</button>

						{/* <AddToCartButton
              variant="bordered"
              color="secondary"
              data={saveDataDesProd}
            >
              Add To Cart
            </AddToCartButton> */}
					</div>
				</div>

				<div className="image_footer_designed_cake">
					{" "}
					<center>
						<Image src="/images/logo2.jpg" alt="picture" width={200} height={80} />
					</center>
				</div>
			</div>
		</div>
	);
}
