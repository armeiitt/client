"use client";
import environment from "@/app/environtment/environment";
import AddToCartButton from "@/components/AddToCartButton";
import {
	Button,
	Checkbox,
	CheckboxGroup,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger
} from "@nextui-org/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import apiService from "../shared/sharedService";

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

export default function Designed_Cake() {
	const [shapes, setShapes] = useState([]);
	const [sizes, setSizes] = useState([]);
	const [flavours, setFlavours] = useState([]);

	const [fruits, setFruits] = useState([]);
	const [animals, setAnimals] = useState([]);
	const [sex, setSex] = useState([]);
	const [candles, setCandles] = useState([]);

	useEffect(() => {
		fetchData();
		fetchDecors();
		console.log(shapes);
		console.log(sizes);
		console.log(flavours);
	}, []);

	async function fetchData() {
		try {
			const [shapesData, sizesData, flavoursData] = await Promise.all([
				apiService.getData("shapes"),
				apiService.getData("sizes"),
				apiService.getData("flavours")
			]);
			console.log(shapesData.data);
			console.log(sizesData.data);
			console.log(flavoursData.data);
			setShapes(shapesData.data);
			setSizes(sizesData.data);
			setFlavours(flavoursData.data);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	}

	async function fetchDecors() {
		try {
			let temp = await apiService.getData("decors");
			let tempFruits = temp.data.filter((item) => item.type === "fruits");
			let tempAnimals = temp.data.filter((item) => item.type === "animals");
			let tempSex = temp.data.filter((item) => item.type === "sex");
			let tempCandles = temp.data.filter((item) => item.type === "candles");
			for (let item of tempFruits) {
				item.imageSrc = apiService.getDecorPhotoURL(item.image);
			}
			for (let item of tempAnimals) {
				item.imageSrc = apiService.getDecorPhotoURL(item.image);
			}
			for (let item of tempSex) {
				item.imageSrc = apiService.getDecorPhotoURL(item.image);
			}
			for (let item of tempCandles) {
				item.imageSrc = apiService.getDecorPhotoURL(item.image);
			}
			setFruits(tempFruits);
			setAnimals(tempAnimals);
			setSex(tempSex);
			setCandles(tempCandles);
		} catch (error) {
			console.log(error);
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

	const [selectedShape, setSelectedShape] = React.useState(new Set(["Shapes"]));
	const selectedShapeValue = React.useMemo(
		() => Array.from(selectedShape).join(", ").replaceAll("_", " "),
		[selectedShape]
	);

	const [selectedSize, setSelectedSize] = React.useState(new Set(["Sizes"]));
	const selectedSizeValue = React.useMemo(
		() => Array.from(selectedSize).join(", ").replaceAll("_", " "),
		[selectedSize]
	);

	const [selectedTaste, setSelectedTaste] = React.useState(new Set(["Flavours"]));
	const selectedTasteValue = React.useMemo(
		() => Array.from(selectedTaste).join(", ").replaceAll("_", " "),
		[selectedTaste]
	);

	const handleSelectionChange = (newKeys) => {
		if (newKeys.size <= 1) {
			setSelectedTaste(newKeys);
		}
	};

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

	const calculateShapePrice = () => {
		let price = 0;
		switch (selectedShapeValue) {
			case "Heart":
				price = 6.5;
				break;
			case "Circle":
				price = 9.9;
				break;
			case "Rectangle":
				price = 5.5;
				break;
			case "Square":
				price = 11.9;
				break;
			case "Triangle":
				price = 12;
				break;
			default:
				price = 0;
				break;
		}
		return price;
	};

	const calculateSizePrice = () => {
		let price = 0;
		switch (selectedSizeValue) {
			case "Small":
				price = 5;
				break;
			case "Medium":
				price = 10;
				break;
			case "Large":
				price = 15;
				break;
			default:
				price = 0;
				break;
		}
		return price;
	};

	const calculateTastePrice = () => {
		let price = 0;
		selectedTaste.forEach((taste) => {
			switch (taste) {
				case "Strawberry":
					price += 5;
					break;
				case "Blackberry":
					price += 6;
					break;
				case "Chocolate":
					price += 4;
					break;
				case "Mango":
					price += 3;
					break;
				case "Blueberry":
					price += 5;
					break;
				default:
					break;
			}
		});
		return price;
	};

	const calculateFruitPrice = () => {
		let totalPrice = 0;
		selectFruits.forEach((fruit) => {
			const selectedFruit = fruits.find((item) => item.name === fruit);
			if (selectedFruit) {
				totalPrice += selectedFruit.price;
			}
		});
		return totalPrice;
	};

	const calculateAnimalPrice = () => {
		let price = 0;
		selectAnimals.forEach((animal) => {
			const selectedAnimal = animals.find((item) => item.name === animal);
			if (selectedAnimal) {
				price += selectedAnimal.price;
			}
		});
		return price;
	};

	const calculateSexPrice = () => {
		let price = 0;
		selectSex.forEach((each) => {
			const selectedSex = sex.find((item) => item.name === each);
			if (selectedSex) {
				price += selectedSex.price;
			}
		});
		return price;
	};

	const calculateCandlePrice = () => {
		let price = 0;
		selectCandles.forEach((each) => {
			const selectedCandle = candles.find((item) => item.name === each);
			if (selectedCandle) {
				price += selectedCandle.price;
			}
		});
		return price;
	};

	const [totalPrice, setTotalPrice] = useState(0);
	const calculateTotalPrice = () => {
		const shapePrice = calculateShapePrice();
		const sizePrice = calculateSizePrice();
		const tastePrice = calculateTastePrice();
		const fruitPrice = calculateFruitPrice();
		const animalPrice = calculateAnimalPrice();
		const sexPrice = calculateSexPrice();
		const candlePrice = calculateCandlePrice();

		const totalPrice =
			shapePrice +
			sizePrice +
			tastePrice +
			fruitPrice +
			animalPrice +
			sexPrice +
			candlePrice;
		// setTotalPrice(totalPrice)
		return totalPrice;
	};

	const getDesProd = async () => {
		// const response = await fetch("/api/cake/price", {
		//   method: "POST",
		//   headers: {
		//     "Content-Type": "application/json",
		//   },
		//   body: JSON.stringify({
		//     selectedShape,
		//     selectedSize,
		//     selectedTaste,
		//     selectFruits,
		//     selectAnimals,
		//     selectSex,
		//     selectCandles,
		//   }),
		// });
		let data = {
			selectedShape,
			selectedSize,
			selectedTaste,
			selectFruits,
			selectAnimals,
			selectSex,
			selectCandles,
		};
		console.log(data);
		// const data = await response.json();
		// setTotalPrice(data.totalPrice);
	};

	const saveDataDesProd = () => {
		let desProd = {
			cus_id: 1,
			category_id: 1,
			size_id: 1,
			shape_id: 1,
			flavour_id: 1,
			name: "thinh",
			price: data,
		};
	};

	return (
		<div className="main_designed_cake">
			<div className="selected_items ">
				<div className="isolate bg-white px-6 py-5 lg:px-4">
					<div className="mx-auto max-w-2xl text-center">
						<div className="title_designed_cake">
							<span class="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
								LET'S DESIGN YOUR CAKE
							</span>
						</div>
						<div>
							<center>
								<Image
									src="/images/designed_cake.jpg"
									alt="picture"
									width={100}
									height={100}
								/>
							</center>
						</div>
						<p className="mt-1 text-lg leading-8 text-gray-600"></p>
					</div>
					<form
						action="#"
						method="POST"
						className="mx-auto mt-2 max-w-xl sm:mt-2"
					>
						<div className="grid grid-cols-3 gap-x-48 gap-y-6 sm:grid-cols-2">
							<div>
								<label
									htmlFor="shape"
									className="title_designed_cake_left block text-sm font-semibold leading-6 text-gray-900"
								>
									Name
								</label>
								<textarea className="center-textarea"></textarea>
							</div>
							<div>
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
											onSelectionChange={setSelectedShape}
										>
											{Array.isArray(shapes) && shapes.map(shape => (
												<DropdownItem key={shape.shape} data-price={shape.price}>
													{shape.shape} - ${shape.price}
												</DropdownItem>
											))}
										</DropdownMenu>
									</Dropdown>
								</div>
							</div>
							<div>
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
											onSelectionChange={setSelectedSize}
										>
											{Array.isArray(sizes) && sizes.map(size => (
												<DropdownItem key={size.size} data-price={size.price}>
													{size.size} - ${size.price}
												</DropdownItem>
											))}
										</DropdownMenu>
									</Dropdown>
								</div>
							</div>

							<div className="sm:col-span-2">
								<label
									htmlFor="taste"
									className="title_designed_cake_left block text-sm font-semibold leading-6 text-gray-900"
								>
									Taste
								</label>
								<div className="mt-2.5">
									<div>
										<Dropdown>
											<DropdownTrigger>
												<Button variant="bordered" className="capitalize">
													{selectedTasteValue}
												</Button>
											</DropdownTrigger>
											<DropdownMenu
												aria-label="Single selection example"
												variant="flat"
												closeOnSelect={false}
												disallowEmptySelection
												selectionMode="single"
												selectedKeys={selectedTaste}
												onSelectionChange={setSelectedTaste}
											>
												{Array.isArray(flavours) && flavours.map(flavour => (
													<DropdownItem key={flavour.flavour} data-price={flavour.price}>
														{flavour.flavour} - ${flavour.price}
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
									className="title_designed_cake_left block text-sm font-semibold leading-6                     text-gray-900"
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
											{fruits.map((fruit) => (
												<Checkbox key={fruit.name} value={fruit.name}>
													<div className="fruit-checkbox">
														<img
															src={fruit.imageSrc}
															alt={fruit.name}
															width={80}
															height={100}
														/>
														{/* {fruit.name} */}
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
											{animals.map((animal) => (
												<Checkbox key={animal.name} value={animal.name}>
													<div className="animal-checkbox">
														<img
															src={animal.imageSrc}
															alt={animal.name}
															width={70}
															height={70}
														/>
														{/* {animal.name} */}
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
											{sex.map((item) => (
												<Checkbox key={item.name} value={item.name}>
													<div className="sex-checkbox">
														<img
															src={item.imageSrc}
															alt={item.name}
															width={70}
															height={70}
														/>
														{/* {sex.name} */}
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
											{candles.map((candle) => (
												<Checkbox key={candle.name} value={candle.name}>
													<div className="candle-checkbox">
														<img
															src={candle.imageSrc}
															alt={candle.name}
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
									htmlFor="message"
									className="title_designed_cake_left block text-sm font-semibold leading-6 text-gray-900"
								>
									Message
								</label>
								<div className="mt-2.5">
									<textarea
										name="message"
										id="message"
										rows={4}
										className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
										value={userInput}
										onChange={handleChange}
									/>
								</div>
							</div>
						</div>

						{/* <div className="mt-10">
                <button
                    type="submit"
                    className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Submit
                </button>
              </div> */}
					</form>
				</div>
			</div>
			<div className="detail_designed_cake">
				<div className="title_designed_cake mx-auto max-w-2xl text-center pt-5">
					<span class="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
						A DESIGNED CAKE INFORMATION
					</span>
				</div>
				<div className="information_designed_cake">
					<div className="body_designed_cake">
						<div className="name_designed_cake">Shape: </div>
						<div>
							{selectedShape} - ${calculateShapePrice()}
						</div>
					</div>
					<div style={{ borderBottom: "2px solid #000" }}></div>
					<div className="body_designed_cake">
						<div className="name_designed_cake">Size: </div>
						<div>
							{selectedSize} - ${calculateSizePrice()}
						</div>
					</div>
					<div style={{ borderBottom: "2px solid #000" }}></div>
					<div className="body_designed_cake">
						<div className="name_designed_cake">Taste: </div>
						<div>
							{selectedTaste} - ${calculateTastePrice()}
						</div>
					</div>
					<div style={{ borderBottom: "2px solid #000" }}></div>
					<div className="name_designed_cake decoration_container">
						Decorations:{" "}
					</div>
					{/* <div>
            {selectFruits
                ? selectFruits.map((value, index) => <span>{value} - ${calculateFruitPrice()} {" "}</span>)
                : " Loading..."}
          </div> */}
					<div>
						{selectFruits.length > 0 ? (
							<>
								{selectFruits.map((value, index) => (
									<div className="fruit_price">
										<div>
											<span key={index}>
												{value} - $
												{fruits.find((item) => item.name === value)?.price}{" "}
											</span>
										</div>
									</div>
								))}
								{/* <div>
                    <span>Price of fruit decorations: ${calculateFruitPrice()}</span>
                </div> */}
							</>
						) : (
							"Loading..."
						)}
					</div>
					<div>
						{selectAnimals
							? selectAnimals.map((value, index) => (
								<span>
									{value} - ${calculateAnimalPrice()}
								</span>
							))
							: " "}
					</div>

					<div>
						{selectSex
							? selectSex.map((value, index) => (
								<span>
									{value} - ${calculateSexPrice()}
								</span>
							))
							: " "}
					</div>

					<div>
						{selectCandles
							? selectCandles.map((value, index) => (
								<span>
									{value} - ${calculateCandlePrice()}
								</span>
							))
							: " "}
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
						<span class="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
							PRICE OF DESIGNED CAKE
						</span>
					</div>
					{/* <div className="shape_price" id="title_designed_cake_price" >
            <div className="text_title_designed_cake_price">Shape Price </div>
            <div>${calculateShapePrice()}</div>
          </div>
          <div className="size_price" id="title_designed_cake_price">
            <div className="text_title_designed_cake_price">Size Price </div>
            <div>${calculateSizePrice()}</div>
          </div>
          <div className="taste_price" id="title_designed_cake_price">
            <div className="text_title_designed_cake_price">Taste Price </div>
            <div>${calculateTastePrice()}</div>

          </div>
          {/* <div className="decoration_price" > */}
					{/* <div>Decoration</div>
          <div className="fruit_price" id="title_designed_cake_price">
            <div className="text_title_designed_cake_price">Fruit Price </div>
            <div >${calculateFruitPrice()}</div>
          </div>
          <div className="animal_price" id="title_designed_cake_price">
            <div className="text_title_designed_cake_price">Animal Price </div>
            <div >${calculateAnimalPrice()}</div>
          </div>
          <div className="sex_price" id="title_designed_cake_price">
            <div className="text_title_designed_cake_price">Sex Price </div>
            <div >${calculateSexPrice()}</div>
          </div>
          <div className="candle_price" id="title_designed_cake_price">
            <div className="text_title_designed_cake_price">Candal Price </div>
            <div >${calculateCandlePrice()}</div>
          </div>  */}
					{/* </div> */}
					<div style={{ borderBottom: "2px solid #000" }}></div>
					<div className="total_price" id="title_designed_cake_price">
						<div className="text_title_designed_cake_price">Total Price</div>
						<div>${calculateTotalPrice()}</div>
					</div>
				</div>
				{/* <div className="add-to-cart-button">
          <button
            style={{ backgroundColor: "#4a90e2", color: "#ffffff" }}
            onClick={TotalPrice}
          >
            Add to Cart
          </button>
        </div> */}
				<div className="flex flex-row w-full justify-end">
					<button class="button button1" onClick={getDesProd}>
						Create
					</button>
					<AddToCartButton
						variant="bordered"
						color="secondary"
						data={calculateTotalPrice()}
					>
						Add To Cart
					</AddToCartButton>
				</div>

				<div className="image_footer_designed_cake">
					{" "}
					<center>
						<Image
							src="/images/logo2.jpg"
							alt="picture"
							width={200}
							height={80}
						/>
					</center>
				</div>
			</div>
		</div>
	);
}
