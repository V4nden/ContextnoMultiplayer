import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CreateUser from "@/components/CreateUser";
import ProfileSettings from "@/components/ProfileSettings";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Контекстно мультиплеер",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <CreateUser />
      <body className={inter.className}>
        <ProfileSettings />
        {children}
      </body>
    </html>
  );
}