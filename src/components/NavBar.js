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
        const res = await fetch(`http://localhost:1337/api/categories`, {
          method: "GET",
          headers: {
            Authorization:
              "Bearer e955830f4caa7e9baa1870ef7d20144622215b4139d4170733184bf0a7824269404199106e090e6f191e94f76a143376823c385d900102df221d0013141eef48c5353b027b17745f5ee5167b4eecf80732fdaab09287993408293cd89f948b3336756ad4f41cbc51225c526f142dfcc9043eccbb8ed4bd5d436ddf4576f356e9",
          },
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
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
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
          <Link color="foreground" href="/contact">
            Contact
          </Link>
        </NavbarItem>

        <NavbarItem>
          <Dropdown>
            <DropdownTrigger>
              <Button variant="bordered">Open Menu</Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Dynamic Actions" items={data}>
              {(item) => (
                <DropdownItem
                  key={item.key}
                  color={item.key === "delete" ? "danger" : "default"}
                  className={item.key === "delete" ? "text-danger" : ""}
                >
                  <Link
                    className="w-full"
                    href={`/shop/${item.attributes.slug}`}
                  >
                    {item.attributes.name}
                  </Link>
                </DropdownItem>
              )}
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="/cart">Cart</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="warning" href="#" variant="flat">
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
              href="#"
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
