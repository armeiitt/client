import React from "react";
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
          <Link href="/about">About</Link>
        </NavbarItem>

        <NavbarItem>
          <Link color="foreground" href="/contact">
            Contact
          </Link>
        </NavbarItem>

        <NavbarItem>
          <Dropdown backdrop="blur">
            <DropdownTrigger>
              <Button
                variant="default" // or variant="plain"
              >
                Category
              </Button>
            </DropdownTrigger>
            <DropdownMenu variant="faded" aria-label="Static Actions">
              <DropdownItem key="delete" className="text-danger" color="danger">
                <Link href="./shop/birthday-cake">Birthday Cakes</Link>
              </DropdownItem>
              <DropdownItem key="delete" className="text-danger" color="danger">
                <Link href="./shop/cookies">Cookies</Link>
              </DropdownItem>
              <DropdownItem key="delete" className="text-danger" color="danger">
                <Link href="./shop/macaron">Macaron</Link>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
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
