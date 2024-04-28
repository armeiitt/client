"use client";
import Image from "next/image";
import { CheckboxGroup, Checkbox } from "@nextui-org/react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

import React, { useState } from "react";
export default function Designed_Cake() {
  const [selectedShape, setSelectedShape] = React.useState(new Set(["Shape"]));

  const [selectFruits, setSelectFruits] = useState([]);

  const [selectAnimals, setSelectAnimals] = useState([]);

  const [selectSex, setSelectSex] = useState([]);

  const [selectCandles, setSelectCandles] = useState([]);
  const selectedShapeValue = React.useMemo(
    () => Array.from(selectedShape).join(", ").replaceAll("_", " "),
    [selectedShape]
  );

  const [selectedSize, setSelectedSize] = React.useState(new Set(["Size"]));

  const selectedSizeValue = React.useMemo(
    () => Array.from(selectedSize).join(", ").replaceAll("_", " "),
    [selectedSize]
  );
  const [selectedTaste, setSelectedTaste] = React.useState([]);
  const handleSelectionChange = (newKeys) => {
    if (newKeys.size <= 3) {
      setSelectedTaste(newKeys);
    }
  };
  const selectedTasteValue = React.useMemo(
    () => Array.from(selectedTaste).join(", ").replaceAll("_", " "),
    [selectedTaste]
  );
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
  const fruits = [
    { name: 'Strawberry', imageSrc: '/images/strawberry2.jpg', price: 4 },
    { name: 'Avocado', imageSrc: '/images/avocado2.jpg', price: 4 },
    { name: 'Peach', imageSrc: '/images/peace2.jpg', price: 4 },
    { name: 'Blueberry', imageSrc: '/images/blueberry.jpg', price: 4 },
    { name: 'Grape', imageSrc: '/images/grape.jpg', price: 4 },
  ];
  const animals = [
    { name: 'Duck', imageSrc: '/images/duck.jpg', price: 10 },
    { name: 'Bear', imageSrc: '/images/bear2.jpg', price: 15 },
    { name: 'Monkey', imageSrc: '/images/monkey.jpg', price: 12 },
    { name: 'Sheep', imageSrc: '/images/sheep.jpg', price: 8 },
    { name: 'Lion', imageSrc: '/images/lion.jpg', price: 14 },
  ];

  const sexOptions = [
    { name: 'Boy', imageSrc: '/images/boy.jpg', price: 20 },
    { name: 'Girl', imageSrc: '/images/girl.jpg', price: 18 },
    { name: 'Man', imageSrc: '/images/man.jpg', price: 25 },
    { name: 'Woman', imageSrc: '/images/woman.jpg', price: 22 },
    { name: 'Grandfather', imageSrc: '/images/grandfather2.jpg', price: 30 },
    { name: 'Grandmother', imageSrc: '/images/grandmother2.jpg', price: 28 },
  ];

  const candleOptions = [
    { name: 'Number Candles', imageSrc: '/images/number_candle2.jpg', price: 15 },
    { name: 'Alphabet Candles', imageSrc: '/images/alphabet_candle.jpg', price: 20 },
    { name: 'Straight Candles', imageSrc: '/images/straight_candle.jpg', price: 10 },
  ];
  const calculateShapePrice = () => {
    let price = 0;
    switch (selectedShapeValue) {
      case 'Heart':
        price = 10;
        break;
      case 'Circle':
        price = 8;
        break;
      case 'Rectangle':
        price = 12;
        break;
      case 'Square':
        price = 9;
        break;
      case 'Triangle':
        price = 6;
        break;
      default:
        price = 0;
        break;
    }
    return price;
  };

  // Hàm tính giá cho kích thước được chọn
  const calculateSizePrice = () => {
    let price = 0;
    switch (selectedSizeValue) {
      case '12':
        price = 8;
        break;
      case '14':
        price = 10;
        break;
      case '16':
        price = 12;
        break;
      case '18':
        price = 14;
        break;
      case '20':
        price = 16;
        break;
      default:
        price = 0;
        break;
    }
    return price;
  };

  // Hàm tính giá cho vị trí
  const calculateTastePrice = () => {
    let price = 0;
    selectedTaste.forEach((taste) => {
      switch (taste) {
        case 'Strawberry':
          price += 5;
          break;
        case 'Blackberry':
          price += 6;
          break;
        case 'Chocolate':
          price += 4;
          break;
        case 'Mango':
          price += 3;
          break;
        case 'Blueberry':
          price += 5;
          break;
        default:
          break;
      }
    });
    return price;
  };

  // Hàm tính giá cho trái cây
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


  // Hàm tính giá cho động vật
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

  // Hàm tính giá cho giới tính
  const calculateSexPrice = () => {
    let price = 0;
    selectSex.forEach((sex) => {
      const selectedSex = sexOptions.find((item) => item.name === sex);
      if (selectedSex) {
        price += selectedSex.price;
      }
    });
    return price;
  };

  // Hàm tính giá cho nến
  const calculateCandlePrice = () => {
    let price = 0;
    selectCandles.forEach((candle) => {
      const selectedCandle = candleOptions.find((item) => item.name === candle);
      if (selectedCandle) {
        price += selectedCandle.price;
      }
    });
    return price;
  };
  const calculateTotalPrice = () => {
    const shapePrice = calculateShapePrice();
    const sizePrice = calculateSizePrice();
    const tastePrice = calculateTastePrice();
    const fruitPrice = calculateFruitPrice();
    const animalPrice = calculateAnimalPrice();
    const sexPrice = calculateSexPrice();
    const candlePrice = calculateCandlePrice();

    // Tổng giá tiền của các thành phần đã chọn
    const totalPrice =
      shapePrice + sizePrice + tastePrice + fruitPrice + animalPrice + sexPrice + candlePrice;

    return totalPrice;
  };
  const [totalPrice, setTotalPrice] = useState(0);

  const TotalPrice = async () => {
    const response = await fetch('/api/cake/price', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        selectedShape,
        selectedSize,
        selectedTaste,
        selectFruits,
        selectAnimals,
        selectSex,
        selectCandles
      })
    });

    const data = await response.json();
    setTotalPrice(data.totalPrice);
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
                      <DropdownItem key="Heart" data-price="10">
                        Heart - $10
                      </DropdownItem>
                      <DropdownItem key="Circle" data-price="8">
                        Circle - $8
                      </DropdownItem>
                      <DropdownItem key="Rectangle" data-price="12">
                        Rectangle - $12
                      </DropdownItem>
                      <DropdownItem key="Square" data-price="9">
                        Square - $9
                      </DropdownItem>
                      <DropdownItem key="Triangle" data-price="6">
                        Triangle - $6
                      </DropdownItem>
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
                      <DropdownItem key="12" data-price="8">Size 12 - $8</DropdownItem>
                      <DropdownItem key="14" data-price="10">Size 14 - $10</DropdownItem>
                      <DropdownItem key="16" data-price="12">Size 16 - $12</DropdownItem>
                      <DropdownItem key="18" data-price="14">Size 18 - $14</DropdownItem>
                      <DropdownItem key="20" data-price="16">Size 20 - $16</DropdownItem>
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
                    <label>
                      A birthday cake can have 3 layers and you choose at most 3
                      tastes
                    </label>
                  </div>
                  <div>
                    <Dropdown>
                      <DropdownTrigger>
                        <Button variant="bordered" className="capitalize">
                          {selectedTasteValue}
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu
                        aria-label="Multiple selection example"
                        variant="flat"
                        closeOnSelect={false}
                        disallowEmptySelection
                        selectionMode="multiple"
                        selectedKeys={selectedTaste}
                        // onSelectionChange={setSelectedTaste}
                        onSelectionChange={handleSelectionChange}
                      >
                        <DropdownItem key="Strawberry" data-price="5">
                          Strawberry - $5
                        </DropdownItem>
                        <DropdownItem key="Blackberry" data-price="6">
                          Blackberry - $6
                        </DropdownItem>
                        <DropdownItem key="Chocolate" data-price="4">
                          Chocolate - $4
                        </DropdownItem>
                        <DropdownItem key="Mango" data-price="3">
                          Mango - $3
                        </DropdownItem>
                        <DropdownItem key="Blueberry" data-price="5">
                          Blueberry - $5
                        </DropdownItem>
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
                            {fruit.name}
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
                            {animal.name}
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
                      {sexOptions.map((sex) => (
                        <Checkbox key={sex.name} value={sex.name}>
                          <div className="sex-checkbox">
                            <img
                              src={sex.imageSrc}
                              alt={sex.name}
                              width={70}
                              height={70}
                            />
                            {sex.name}
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
                // className="block text-sm font-semibold leading-6                     text-gray-900"
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
                      {candleOptions.map((candle) => (
                        <Checkbox key={candle.name} value={candle.name}>
                          <div className="candle-checkbox">
                            <img
                              src={candle.imageSrc}
                              alt={candle.name}
                              width={70}
                              height={70}
                            />
                            {candle.name}
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
            <div className="name_designed_cake">Shape:</div>
            <div>{selectedShape} - ${calculateShapePrice()}</div>
          </div>
          <div style={{ borderBottom: "2px solid #000" }}></div>
          <div className="body_designed_cake">
            <div className="name_designed_cake">Size: </div>
            <div> {selectedSize} - ${calculateSizePrice()}</div>
          </div>
          <div style={{ borderBottom: "2px solid #000" }}></div>
          <div className="body_designed_cake">
            <div className="name_designed_cake">Taste:</div>
            <div>{selectedTasteValue} - ${calculateTastePrice()}</div>
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
                        {value} - ${fruits.find((item) => item.name === value)?.price}{' '}
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
              ? selectAnimals.map((value, index) => <span>{value} - ${calculateAnimalPrice()}</span>)
              : " "}
          </div>
          <div>
            {selectSex
              ? selectSex.map((value, index) => <span>{value} - ${calculateSexPrice()}</span>)
              : " "}
          </div>
          <div>
            {selectCandles
              ? selectCandles.map((value, index) => <span>{value} - ${calculateCandlePrice()}</span>)
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
            <div >${calculateTotalPrice()}</div>
          </div>
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
            <div>
              {/* <div className="sketchfab-embed-wrapper">
                  <iframe
                    title="Cylinder"
                    frameBorder="0"
                    allowFullScreen
                    mozAllowFullScreen="true"
                    webkitAllowFullScreen="true"
                    allow="autoplay; fullscreen; xr-spatial-tracking"
                    xr-spatial-tracking
                    src="https://sketchfab.com/models/084f375201f147e7a674e2a5c0a19776/embed"
                  ></iframe>
                  <p style={{ fontSize: '13px', fontWeight: 'normal', margin: '5px', color: '#4A4A4A' }}>
                    <a
                      href="https://sketchfab.com/3d-models/cylinder-084f375201f147e7a674e2a5c0a19776?utm_medium=embed&utm_campaign=share-popup&utm_content=084f375201f147e7a674e2a5c0a19776"
                      target="_blank"
                      rel="nofollow"
                      style={{ fontWeight: 'bold', color: '#1CAAD9' }}
                    >
                      Cylinder
                    </a>{' '}
                    by{' '}
                    <a
                      href="https://sketchfab.com/guardianofsnow?utm_medium=embed&utm_campaign=share-popup&utm_content=084f375201f147e7a674e2a5c0a19776"
                      target="_blank"
                      rel="nofollow"
                      style={{ fontWeight: 'bold', color: '#1CAAD9' }}
                    >
                      GuardianofSnow
                    </a>{' '}
                    on{' '}
                    <a
                      href="https://sketchfab.com?utm_medium=embed&utm_campaign=share-popup&utm_content=084f375201f147e7a674e2a5c0a19776"
                      target="_blank"
                      rel="nofollow"
                      style={{ fontWeight: 'bold', color: '#1CAAD9' }}
                    >
                      Sketchfab
                    </a>
                  </p>
                </div> */}

            </div>
          </center>
        </div>
      </div>
    </div>
  );
}
