"use client"; // 👈 This makes it a client component

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import UserContext from "@/context/usercontext";
import { useState } from 'react';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const [islogin, setLogin] = useState(false); // default false

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <UserContext.Provider value={{ islogin, setLogin }}>
          <Header />
          {children}
        </UserContext.Provider>
      </body>
    </html>
  );
}
