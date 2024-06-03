"use client";
import environment from "@/app/environment/environment.js";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { AcmeLogo } from "./AcmeLogo.jsx";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `http://${environment.API_DOMAIN}:${environment.API_PORT}/api/categories`,
          {
            method: "GET",
          }
        );
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

        <NavbarItem>
          <Dropdown>
            <DropdownTrigger>
              <Button variant="bordered">Categories</Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Dynamic Actions" items={data}>
              {(item) => (
                <DropdownItem
                  key={item.type}
                  className={item.type === "delete" ? "text-danger" : ""}
                >
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
          <Link color="foreground" href="/auth">
            Login
          </Link>
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
