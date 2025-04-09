"use client";

import { Geist, Geist_Mono, Lato, Saira } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import UserContext from "@/context/usercontext";
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';

// Font configs
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});

const saira = Saira({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});

export default function RootLayout({ children }) {
  const [islogin, setLogin] = useState(false);

  return (
    <html lang="en" className={`${saira.className} ${lato.className}`}>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <UserContext.Provider value={{ islogin, setLogin }}>
          <Header />
          {children}
        </UserContext.Provider>
        <ToastContainer
          position="top-right"
          theme="dark"
        />
      </body>
    </html>
  );
}
