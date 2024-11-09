import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import UserProvider from "@/providers/UserProvider";
import {Inter} from "next/font/google";


const inter = Inter({
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Toaster position="top-center"></Toaster>
      <UserProvider>
      <body
        className={inter.className}
      >
        {children}
      </body>
      </UserProvider>
    </html>
  );
}
