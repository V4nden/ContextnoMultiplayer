import { motion } from "framer-motion";
import React, { useEffect, useRef } from "react";
import { FaCrown, FaLightbulb } from "react-icons/fa";

type Props = {};

const PreviewWidget = (props: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100, scale: 1.2, filter: "blur(20px)" }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      transition={{ ease: [0, 1, 0, 1], duration: 3 }}
      className="flex-col gap-2 items-center w-2/3 m-auto relative hidden lg:flex"
    >
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ease: [0, 1, 0, 1], duration: 3, delay: 0.2 }}
        className="font-bold text-2xl"
      >
        Игра #219572
      </motion.h1>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ease: [0, 1, 0, 1], duration: 3, delay: 0.5 }}
        className="flex justify-between w-full border p-2 rounded-lg items-center"
        style={{
          background:
            "linear-gradient(90deg, rgba(61, 197, 255, 0.667) 0%, rgba(61, 197, 255, 0.333) 100%)",
        }}
      >
        <div className="flex items-center gap-2">
          <span className="p-1 text-center leading-none rounded-lg text-zinc-300 font-bold aspect-square w-6 h-6 shadow-sm bg-green-500">
            1
          </span>
          <span className="font-bold">Player7486</span>
        </div>
        <span>16</span>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ease: [0, 1, 0, 1], duration: 3, delay: 0.3 }}
        className="flex justify-between w-full border p-2 rounded-lg items-center"
        style={{
          background:
            "linear-gradient(90deg, rgba(0,255,1,1) 0%, rgba(0,196,34,1) 100%)",
        }}
      >
        <div className="flex items-center gap-2">
          <span className="p-1 text-center leading-none rounded-lg text-zinc-300 font-bold aspect-square w-6 h-6 shadow-sm bg-orange-500">
            2
          </span>
          <span className="font-bold">Player1352</span>
        </div>
        <span>236</span>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ease: [0, 1, 0, 1], duration: 3, delay: 0.1 }}
        className="flex justify-between w-full border p-2 rounded-lg items-center"
        style={{
          background:
            "linear-gradient(90deg, rgba(255,175,0,1) 0%, rgba(196,135,0,1) 100%)",
        }}
      >
        <div className="flex items-center gap-2">
          <span className="p-1 text-center leading-none rounded-lg text-zinc-300 font-bold aspect-square w-6 h-6 shadow-sm bg-red-500">
            3
          </span>
          <span className="font-bold">Player1647</span>
        </div>
        <span>532</span>
      </motion.div>
      <input
        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        placeholder="Слово"
        value=""
      />

      {/* Words */}

      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ease: [0, 1, 0, 1], duration: 3, delay: 0.7 }}
        className="p-2 border w-full rounded-lg relative justify-between flex items-center bg-zinc-950 group/word"
      >
        <span className="font-bold text-lg">
          <span className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400"></div>Бетон
          </span>
        </span>
        <span className="flex gap-2 items-center">
          <span>16</span>
        </span>
      </motion.div>

      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ease: [0, 1, 0, 1], duration: 3, delay: 0.9 }}
        className="p-2 border w-full rounded-lg relative justify-between flex items-center bg-zinc-950 group/word"
      >
        <span className="font-bold text-lg">
          <span className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400"></div>Металл
          </span>
        </span>
        <span className="flex gap-2 items-center">
          <span>28</span>
        </span>
      </motion.div>
      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ease: [0, 1, 0, 1], duration: 3, delay: 1.1 }}
        className="p-2 border w-full rounded-lg relative justify-between flex items-center bg-zinc-950 group/word"
      >
        <span className="font-bold text-lg">
          <span className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400"></div>Пещера
          </span>
        </span>
        <span className="flex gap-2 items-center">
          <span>83</span>
        </span>
      </motion.div>

      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ease: [0, 1, 0, 1], duration: 3, delay: 1.3 }}
        className="p-2 border w-full rounded-lg relative justify-between flex items-center bg-zinc-950 group/word"
      >
        <span className="font-bold text-lg">
          <span className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400"></div>Цемент
          </span>
        </span>
        <span className="flex gap-2 items-center">
          <span>119</span>
        </span>
      </motion.div>

      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ease: [0, 1, 0, 1], duration: 3, delay: 1.5 }}
        className="p-2 border w-full rounded-lg relative justify-between flex items-center bg-zinc-950 group/word"
      >
        <span className="font-bold text-lg">
          <span className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-orange-400"></div>Здание
          </span>
        </span>
        <span className="flex gap-2 items-center">
          <span>1470</span>
        </span>
      </motion.div>

      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ease: [0, 1, 0, 1], duration: 3, delay: 1.7 }}
        className="p-2 border w-full rounded-lg relative justify-between flex items-center bg-zinc-950 group/word"
      >
        <span className="font-bold text-lg">
          <span className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-orange-400"></div>Алюминий
          </span>
        </span>
        <span className="flex gap-2 items-center">
          <span>1987</span>
        </span>
      </motion.div>

      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ease: [0, 1, 0, 1], duration: 3, delay: 1.9 }}
        className="p-2 border w-full rounded-lg relative justify-between flex items-center bg-zinc-950 group/word"
      >
        <span className="font-bold text-lg">
          <span className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500"></div>Дом
          </span>
        </span>
        <span className="flex gap-2 items-center">
          <span>4899</span>
        </span>
      </motion.div>
      <motion.div
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ ease: [0, 1, 0, 1], duration: 3, delay: 1.9 }}
        className="items-center gap-2 border rounded-lg sm:hidden xl:flex p-4 bg-background absolute top-[25%] w-[350px] left-[60%] drop-shadow-sglow"
      >
        <FaLightbulb fill="#ddd" />

        <div>
          <h1 className="font-bold text-xl">Подсказка!</h1>
          <p>Player1647 подсказал вам слово мрамор!</p>
        </div>
      </motion.div>
      <motion.div
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ ease: [0, 1, 0, 1], duration: 3, delay: 2.9 }}
        className="items-center gap-2 border rounded-lg p-4 sm:hidden xl:flex bg-background absolute top-[70%] w-[350px] right-[50%] drop-shadow-sglow"
      >
        <FaCrown fill="#ddd" />
        <div>
          <h1 className="font-bold text-xl">Победа!</h1>
          <p>Player7486 Угадал загаданное слово!</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PreviewWidget;
