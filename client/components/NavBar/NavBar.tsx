"use client";
import { FaGamepad, FaHeart, FaHome } from "react-icons/fa";
import ProfileButton from "../Profile/ProfileButton";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

const NavBar = () => {
  const router = useRouter();

  return (
    <motion.nav
      initial={{ y: -300, scale: 1.5 }}
      animate={{ y: 0, scale: 1 }}
      transition={{ ease: [0, 1, 0, 1], duration: 1 }}
      className="fixed top-0 left-0 w-full grid grid-cols-3 items-center lg:gap-4 sm:gap-2 sm:p-2 lg:p-4 lg:px-24"
    >
      <div className="flex lg:gap-2 sm:gap-1 items-center">
        <img src="icon.svg" alt="app icon" className="w-10 h-10" />
        <span className="font-bold sm:hidden lg:block">Контекстно</span>
      </div>
      <div className="flex items-center sm:gap-8 lg:gap-4 justify-center">
        <button
          onClick={() => {
            router.push("/");
          }}
          className="flex gap-2 items-center hover:drop-shadow-glow hover:scale-105 transition-all ease-out"
        >
          <FaHome fill="#AAA" />
          <span className="text-sm font-semibold sm:hidden lg:block">
            Главная
          </span>
        </button>
        <button
          onClick={() => {
            router.push("/games");
          }}
          className="flex gap-2 items-center hover:drop-shadow-glow hover:scale-105 transition-all ease-out"
        >
          <FaGamepad fill="#AAA" />
          <span className="text-sm font-semibold sm:hidden lg:block">Игры</span>
        </button>
        <Link href={"https://контекстно.рф"} passHref={true}>
          <button className="flex gap-2 items-center hover:drop-shadow-glow hover:scale-105 transition-all ease-out">
            <FaHeart fill="#AAA" />
            <span className="text-sm font-semibold sm:hidden lg:block">
              Оригинал
            </span>
          </button>
        </Link>
      </div>

      <div className="flex justify-end">
        <ProfileButton />
      </div>
    </motion.nav>
  );
};

export default NavBar;
