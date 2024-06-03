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
  }, []);

  async function fetchData() {
    try {
      const [shapesData, sizesData, flavoursData] = await Promise.all([
        apiService.getData("shapes"),
        apiService.getData("sizes"),
        apiService.getData("flavours"),
      ]);
      setShapes(shapesData.data);
      setSizes(sizesData.data);
      setFlavours(flavoursData.data);
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

      setFruits(tempFruits);
      setAnimals(tempAnimals);
      setSex(tempSex);
      setCandles(tempCandles);
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
      const selectedFruit = fruits.find((item) => item.name === each);
      if (selectedFruit) {
        return totalPrice + parseFloat(selectedFruit.price);
      }
      return totalPrice;
    }, 0);
  };

  const calculateAnimalPrice = () => {
    return selectAnimals.reduce((totalPrice, each) => {
      const selectedAnimal = animals.find((item) => item.name === each);
      if (selectedAnimal) {
        return totalPrice + parseFloat(selectedAnimal.price);
      }
      return totalPrice;
    }, 0);
  };

  const calculateSexPrice = () => {
    return selectSex.reduce((totalPrice, each) => {
      const selectedSex = sex.find((item) => item.name === each);
      if (selectedSex) {
        return totalPrice + parseFloat(selectedSex.price);
      }
      return totalPrice;
    }, 0);
  };

  const calculateCandlePrice = () => {
    return selectCandles.reduce((totalPrice, each) => {
      const selectedCandle = candles.find((item) => item.name === each);
      if (selectedCandle) {
        return totalPrice + parseFloat(selectedCandle.price);
      }
      return totalPrice;
    }, 0);
  };

  const calculateTotalPrice = () => {
    let shapePrice = 0;
    let sizePrice = 0;
    let flavourPrice = 0;
    if (selectedShape.size > 0) {
      shapePrice = parseFloat(Array.from(selectedShape)[0].price);
    }
    if (selectedSize.size > 0) {
      sizePrice = parseFloat(Array.from(selectedSize)[0].price);
    }
    if (selectedFlavour.size > 0) {
      flavourPrice = parseFloat(Array.from(selectedFlavour)[0].price);
    }

    const fruitPrice = calculateFruitPrice();
    const animalPrice = calculateAnimalPrice();
    const sexPrice = calculateSexPrice();
    const candlePrice = calculateCandlePrice();

    const totalPrice =
      shapePrice + sizePrice + flavourPrice + fruitPrice + animalPrice + sexPrice + candlePrice;
    return totalPrice;
  };

  const getDesProd = async () => {
    console.log("getDesProd called");
    addNewCake(); // Thêm cái bánh mới trước
    setUserInput(`Cake ${nextCakeNumber}`);
    // const response = await fetch("/api/cake/price", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     selectedShape,
    //     selectedSize,
    //     selectedFlavour,
    //     selectFruits,
    //     selectAnimals,
    //     selectSex,
    //     selectCandles,
    //   }),
    // });
    let data = {
      selectedShape,
      selectedSize,
      selectedFlavour: selectedFlavour,
      selectFruits,
      selectAnimals,
      selectSex,
      selectCandles,
    };
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
      price: selectedFlavour,
    };
    console.log(desProd);
    // return desProd;
  };
  const [cakes, setCakes] = useState([]);
  const [cakeId, setCakeId] = useState(1);
  const [nextCakeNumber, setNextCakeNumber] = useState(1); // Khởi tạo giá trị ban đầu cho biến nextCakeNumber

  const addNewCake = () => {
    const newCakeName = `Cake ${nextCakeNumber}`; // Tạo tên mới cho bánh
    const totalPrice = calculateTotalPrice(); // Tính tổng giá cho bánh hiện tại

    // Thêm bánh mới vào danh sách bánh
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
                value={showCakeNameInTextarea ? `Cake ${cakeId}` : userInput} // Sử dụng điều kiện để quyết định giá trị của ô textarea
                onChange={handleChange}
              />
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
                      onSelectionChange={(key) => {
                        const selected = shapes.find(
                          (each) => each.shape === key.currentKey
                        );
                        setSelectedShape(new Set([selected]));
                      }}
                    >
                      {Array.isArray(shapes) &&
                        shapes.map((each) => (
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
                      onSelectionChange={(key) => {
                        const selected = sizes.find(
                          (each) => each.size === key.currentKey
                        );
                        setSelectedSize(new Set([selected]));
                      }}
                    >
                      {Array.isArray(sizes) &&
                        sizes.map((each) => (
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
                          const selected = flavours.find(
                            (each) => each.flavour === key.currentKey
                          );
                          setSelectedFlavour(new Set([selected]));
                        }}
                      >
                        {Array.isArray(flavours) &&
                          flavours.map((each) => (
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
              <>
                {selectFruits.map((value, index) => (
                  <div className="fruit_price">
                    <div>
                      <span key={index}>
                        {value} - ${fruits.find((item) => item.name === value)?.price}{" "}
                      </span>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              "No Fruits"
            )}
          </div>
          <div>
            {selectAnimals.length > 0 ? (
              <>
                {selectAnimals.map((value, index) => (
                  <div className="anime_price">
                    <div>
                      <span key={index}>
                        {value} - ${animals.find((item) => item.name === value)?.price}
                      </span>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              "No Animals"
            )}
          </div>
          <div>
            {selectSex.length > 0 ? (
              <>
                {selectSex.map((value, index) => (
                  <div className="sex_price">
                    <div>
                      <span key={index}>
                        {value} - ${sex.find((item) => item.name === value)?.price}
                      </span>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              "No Sex"
            )}
          </div>
          <div>
            {selectCandles.length > 0 ? (
              <>
                {selectCandles.map((value, index) => (
                  <div className="candle_price">
                    <div>
                      <span key={index}>
                        {value} - ${candles.find((item) => item.name === value)?.price}
                      </span>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              "No Candles"
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
