"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";

export default function HeaderDefault() {
  const pathname = usePathname();
  return (
    <div>
      <div className="w-full flex flex-row justify-between items-center bg-background">
        <div className="logo">
          <img src="https://skins.minimog.co/cdn/shop/files/cake_logo.png"></img>
        </div>
        <div>
          <div className="flex flex-row justify-between gap-2 bg-purple-950 text-white">
            <Link
              className={`p-3 ${pathname === "/" ? "bg-slate-600" : ""}`}
              href="/"
            >
              Home
            </Link>

            <Dropdown>
              <DropdownTrigger>
                <Button variant="bordered">Shop</Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                <DropdownItem key="cookies">
                  <Link href="/Cookies.js">Cookies</Link>
                </DropdownItem>
                <DropdownItem key="Macaron">
                  <Link href="/Macaron.js">Macaron</Link>
                </DropdownItem>
                <DropdownItem
                  key="Birthday Cake"
                  className="text-danger"
                  color="danger"
                >
                  <Link href="/Birthday_Cake.js">Birthday Cake</Link>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            {/* <Link
              className={`p-3 ${pathname === "/shop" ? "bg-slate-600" : ""}`}
              href="/shop"
            >
              Shop
            </Link> */}
            <Link
              className={`p-3 ${pathname === "/contact" ? "bg-slate-600" : ""}`}
              href="/contact"
            >
              Contact
            </Link>
            <Link
              className={`p-3 ${pathname === "/auth" ? "bg-slate-600" : ""}`}
              href="/auth"
            >
              Login/Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
