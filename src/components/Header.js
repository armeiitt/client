"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function HeaderDefault() {
  const pathname = usePathname();
  return (
    <div>
      <div className="w-full flex flex-row justify-between items-center bg-background">
        <div>LOGO COMPANY</div>
        <div>
          <div className="flex flex-row justify-between gap-2 bg-purple-950 text-white">
            <Link
              className={`p-3 ${pathname === "/" ? "bg-slate-600" : ""}`}
              href="/"
            >
              Home
            </Link>
            <Link
              className={`p-3 ${pathname === "/shop" ? "bg-slate-600" : ""}`}
              href="/shop"
            >
              Shop
            </Link>
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
