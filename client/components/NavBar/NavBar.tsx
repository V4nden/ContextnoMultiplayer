"use client";

import { Separator } from "@radix-ui/react-separator";
import { motion } from "framer-motion";
import { FaGamepad, FaHeart, FaHome } from "react-icons/fa";

const NavBar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full grid grid-cols-3 items-center lg:gap-4 sm:gap-2 sm:p-2 lg:p-4 lg:px-24">
      <div className="flex lg:gap-2 sm:gap-1 items-center">
        <img src="icon.svg" alt="app icon" className="w-10 h-10" />
        <span className="font-bold sm:hidden lg:block">Контекстно.рф</span>
      </div>
      <div className="flex items-center sm:gap-8 lg:gap-4 justify-center">
        <div className="flex gap-2 items-center hover:drop-shadow-glow hover:scale-105 transition-all ease-out">
          <FaHome fill="#AAA" />
          <span className="text-sm font-semibold sm:hidden lg:block">
            Главная
          </span>
        </div>
        <div className="flex gap-2 items-center hover:drop-shadow-glow hover:scale-105 transition-all ease-out">
          <FaGamepad fill="#AAA" />
          <span className="text-sm font-semibold sm:hidden lg:block">Игры</span>
        </div>
        <div className="flex gap-2 items-center hover:drop-shadow-glow hover:scale-105 transition-all ease-out">
          <FaHeart fill="#AAA" />
          <span className="text-sm font-semibold sm:hidden lg:block">
            Оригинал
          </span>
        </div>
      </div>

      <div className="flex justify-end">
        <span>fsgdfgs</span>
      </div>
    </nav>
  );
};

export default NavBar;
