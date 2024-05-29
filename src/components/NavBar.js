"use client";
import React, { useState, useEffect } from "react";
import {
  Dropdown,
  NextUILink,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  NextUIButton,
} from "@nextui-org/react";

import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import { AcmeLogo } from "./AcmeLogo.jsx";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://10.30.221.82:3000/api/categories`, {
          method: "GET",
          // headers: {
          //   Authorization:
          //     "Bearer e955830f4caa7e9baa1870ef7d20144622215b4139d4170733184bf0a7824269404199106e090e6f191e94f76a143376823c385d900102df221d0013141eef48c5353b027b17745f5ee5167b4eecf80732fdaab09287993408293cd89f948b3336756ad4f41cbc51225c526f142dfcc9043eccbb8ed4bd5d436ddf4576f356e9",
          // },
        });
        const data = await res.json();
        setData(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const menuItems = [
    "Home",
    "About",
    // "Contact",
    "Categories",
    "Designed Cake",
    "Cart",
    // "My Settings",
    // "Team Settings",
    // "Help & Feedback",
    // "Log Out",
  ];

  return (
    <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="full"
      position="static"
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <AcmeLogo />
          {/* <p className="font-bold text-inherit">ACME</p> */}
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand>
          <AcmeLogo />
          {/* <p className="font-bold text-inherit">ACME</p> */}
        </NavbarBrand>
        <NavbarItem>
          <Link color="foreground" href="/" aria-current="page">
            Home
          </Link>
        </NavbarItem>

        <NavbarItem>
          <Link color="foreground" href="/about">
            About
          </Link>
        </NavbarItem>

        {/* <NavbarItem>
          <Link color="foreground" href="/register">
            Register
          </Link>
        </NavbarItem> */}

        <NavbarItem>
          <Dropdown>
            <DropdownTrigger>
              <Button variant="bordered">Categories</Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Dynamic Actions" items={data}>
              {(item) => (
                // <DropdownItem
                //   key={item.key}
                //   color={item.key === "delete" ? "danger" : "default"}
                //   className={item.key === "delete" ? "text-danger" : ""}
                // >
                //   <Link
                //     className="w-full"
                //     href={`/shop/${item.attributes.slug}`}
                //   >
                //     {item.attributes.name}
                //   </Link>
                // </DropdownItem>
                <DropdownItem
                  key={item.type} // Change item.key to item.type
                  color={item.type === "delete" ? "danger" : "default"} // Change item.key to item.type
                  className={item.type === "delete" ? "text-danger" : ""} // Change item.key to item.type
                >
                  {/* <Link
                    className="w-full"
                    href={`/shop/${item.attributes.slug}`}
                  >
                    {item.type}
                  </Link> */}
                  <Link className="w-full" href={`/shop/${item.category_id}`}>
                    {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                  </Link>
                </DropdownItem>
              )}
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>

        <NavbarItem>
          <Link color="foreground" href="/designed_cake">
            Designed Cake
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="/cart">Cart</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="warning" href="/sign_up" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 2
                  ? "warning"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              href={
                item === "Home"
                  ? "/"
                  : item === "Contact"
                  ? "/contact"
                  : item === "About"
                  ? "/about"
                  : item === "Cart"
                  ? "/cart"
                  : item === "Designed Cake"
                  ? "/designed_cake"
                  : `/${item.toLowerCase()}`
              }
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
