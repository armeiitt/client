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

  const [selectFruits, setSelectFruits] = useState("");

  const [selectAnimals, setSelectAnimals] = useState("");

  const [selectSex, setSelectSex] = useState("");

  const [selectCandles, setSelectCandles] = useState("");
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

  return (
    <div className="main_designed_cake">
      <div className="selected_items ">
        <div className="isolate bg-white px-6 py-5 lg:px-4">
          <div className="mx-auto max-w-2xl text-center">
            <div className="title_designed_cake">
              <span class="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
                A DESIGNED CAKE INFORMATION
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
                  className="block text-sm font-semibold leading-6 text-gray-900"
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
                      <DropdownItem key="Heart">Heart</DropdownItem>
                      <DropdownItem key="Circle">Circle</DropdownItem>
                      <DropdownItem key="Rectangle">Rectangle</DropdownItem>
                      <DropdownItem key="Square">Square</DropdownItem>
                      <DropdownItem key="Triangle">Triangle</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </div>
              <div>
                <label
                  htmlFor="size"
                  className="block text-sm font-semibold leading-6 text-gray-900"
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
                      <DropdownItem key="12">12</DropdownItem>
                      <DropdownItem key="14">14</DropdownItem>
                      <DropdownItem key="16">16</DropdownItem>
                      <DropdownItem key="18">18</DropdownItem>
                      <DropdownItem key="20">20</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="taste"
                  className="block text-sm font-semibold leading-6 text-gray-900"
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
                        <DropdownItem key=" Strawberry">
                          Strawberry
                        </DropdownItem>
                        <DropdownItem key=" Blackberry">
                          Blackberry
                        </DropdownItem>
                        <DropdownItem key=" Chocolate">Chocolate</DropdownItem>
                        <DropdownItem key=" Mango">Mango</DropdownItem>
                        <DropdownItem key=" Blueberry">Blueberry</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="sticker"
                  className="block text-sm font-semibold leading-6                     text-gray-900"
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
                      defaultValue={[]}
                      onChange={(e) => setSelectFruits(e)}
                    >
                      <Checkbox value=" Strawberry">
                        <Image
                          src="/images/strawberry2.jpg"
                          alt="picture"
                          width={80}
                          height={100}
                        />
                      </Checkbox>
                      <Checkbox value=" Avocado">
                        <Image
                          src="/images/avocado2.jpg"
                          alt="picture"
                          width={75}
                          height={80}
                        />
                      </Checkbox>
                      <Checkbox value=" Peace">
                        <Image
                          src="/images/peace2.jpg"
                          alt="picture"
                          width={70}
                          height={80}
                        />
                      </Checkbox>
                      <Checkbox value=" Blueberry">
                        <Image
                          src="/images/blueberry.jpg"
                          alt="picture"
                          width={80}
                          height={80}
                        />
                      </Checkbox>
                      <Checkbox value=" Grape">
                        <Image
                          src="/images/grape.jpg"
                          alt="picture"
                          width={60}
                          height={80}
                        />
                      </Checkbox>
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
                      defaultValue={[]}
                      onChange={(e) => setSelectAnimals(e)}
                    >
                      <Checkbox value=" Duck">
                        <Image
                          src="/images/duck.jpg"
                          alt="picture"
                          width={60}
                          height={100}
                        />
                      </Checkbox>
                      <Checkbox value=" Bear">
                        <Image
                          src="/images/bear2.jpg"
                          alt="picture"
                          width={120}
                          height={80}
                        />
                      </Checkbox>
                      <Checkbox value=" Monkey">
                        <Image
                          src="/images/monkey.jpg"
                          alt="picture"
                          width={90}
                          height={80}
                        />
                      </Checkbox>
                      <Checkbox value=" Sheep">
                        <Image
                          src="/images/sheep.jpg"
                          alt="picture"
                          width={70}
                          height={80}
                        />
                      </Checkbox>
                      <Checkbox value=" Lion">
                        <Image
                          src="/images/lion.jpg"
                          alt="picture"
                          width={80}
                          height={80}
                        />
                      </Checkbox>
                    </CheckboxGroup>
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
                      onChange={(e) => setSelectSex(e)}
                    >
                      <Checkbox value=" Boy">
                        <Image
                          src="/images/boy.jpg"
                          alt="picture"
                          width={110}
                          height={100}
                        />
                      </Checkbox>
                      <Checkbox value=" Girl">
                        <Image
                          src="/images/girl.jpg"
                          alt="picture"
                          width={110}
                          height={80}
                        />
                      </Checkbox>
                      <Checkbox value=" Man">
                        <Image
                          src="/images/man.jpg"
                          alt="picture"
                          width={90}
                          height={80}
                        />
                      </Checkbox>
                      <Checkbox value=" Woman">
                        <Image
                          src="/images/woman.jpg"
                          alt="picture"
                          width={70}
                          height={80}
                        />
                      </Checkbox>
                      <Checkbox value=" Grandfather">
                        <Image
                          src="/images/grandfather2.jpg"
                          alt="picture"
                          width={80}
                          height={80}
                        />
                      </Checkbox>
                      <Checkbox value=" Grandmother">
                        <Image
                          src="/images/grandmother2.jpg"
                          alt="picture"
                          width={80}
                          height={80}
                        />
                      </Checkbox>
                    </CheckboxGroup>
                  </div>
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="sticker"
                  className="block text-sm font-semibold leading-6                     text-gray-900"
                >
                  Candles
                </label>
                <div className="relative mt-1.5">
                  <div>
                    <CheckboxGroup
                      orientation="horizontal"
                      color="secondary"
                      defaultValue={[]}
                      onChange={(e) => setSelectCandles(e)}
                      selectionMode="single"
                    >
                      <Checkbox value=" Number Candles">
                        <Image
                          src="/images/number_candle2.jpg"
                          alt="picture"
                          width={120}
                          height={100}
                        />
                      </Checkbox>
                      <Checkbox value=" Alphabet Candles">
                        <Image
                          src="/images/alphabet_candle.jpg"
                          alt="picture"
                          width={180}
                          height={80}
                        />
                      </Checkbox>
                      <Checkbox value=" Straight Candles">
                        <Image
                          src="/images/straight_candle.jpg"
                          alt="picture"
                          width={100}
                          height={80}
                        />
                      </Checkbox>
                    </CheckboxGroup>
                  </div>
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold leading-6 text-gray-900"
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
            <div>{selectedShape}</div>
          </div>
          <div style={{ borderBottom: "2px solid #000" }}></div>
          <div className="body_designed_cake">
            <div className="name_designed_cake">Size: </div>
            <div> {selectedSize} </div>
          </div>
          <div style={{ borderBottom: "2px solid #000" }}></div>
          <div className="body_designed_cake">
            <div className="name_designed_cake">Taste:</div>
            <div>{selectedTasteValue} </div>
          </div>
          <div style={{ borderBottom: "2px solid #000" }}></div>
          <div className="name_designed_cake decoration_container">
            Decorations:{" "}
          </div>
          <div>
            {selectFruits
              ? selectFruits.map((value, index) => <span>{value}</span>)
              : " Loading..."}
          </div>
          <div>
            {selectAnimals
              ? selectAnimals.map((value, index) => <span>{value}</span>)
              : " "}
          </div>
          <div>
            {selectSex
              ? selectSex.map((value, index) => <span>{value}</span>)
              : " "}
          </div>
          <div>
            {selectCandles
              ? selectCandles.map((value, index) => <span>{value}</span>)
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
        <div className="image_footer_designed_cake">
          {" "}
          <center>
            <Image
              src="/images/logo2.jpg"
              alt="picture"
              width={500}
              height={80}
            />
          </center>
        </div>
      </div>
    </div>
  );
}
