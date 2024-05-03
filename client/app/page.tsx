"use client";
import PreviewWidget from "@/components/HomePage/PreviewWidget";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import postData from "@/lib/fetchPost";
import createGame from "@/lib/game/createGame";
import { Label } from "@radix-ui/react-label";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();

  const [word, setWord] = useState("");
  const [error, setError] = useState("");

  return (
    <main className="grid lg:grid-cols-2 items-center min-h-screen justify-center lg:p-24 gap-4">
      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 5 }}
        src="ttten2.svg"
        className="absolute -z-10 top-0 left-0 h-screen w-full object-cover"
        alt=""
      />
      <div className="flex flex-col gap-4 lg:items-start sm:items-center sm:text-center lg:text-left">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ease: [0, 1, 0, 1], duration: 3 }}
          className="font-bold lg:text-5xl sm:text-3xl"
        >
          Контекстно
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ease: [0, 0.5, 0, 1], duration: 4, delay: 0.2 }}
          className="sm:text-sm lg:text-base"
        >
          Контекстно - игра-угадайка, где цель - отгадать секретное слово. Игра
          использует контекстный анализ для определения схожести слов и
          ранжирования их по близости к загаданному. Простые правила и
          интуитивный интерфейс делают её увлекательной головоломкой для
          любителей словесных игр.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ease: [0, 0.5, 0, 1], duration: 4, delay: 0.3 }}
          className="grid grid-cols-[3fr_1fr] gap-2 w-full"
        >
          <Input
            className="w-full transition-all focus:brightness-105"
            placeholder="Слово"
            value={word}
            onChange={(e) => {
              setWord(e.target.value);
            }}
          ></Input>
          <Button
            onClick={() => {
              createGame(
                word.replaceAll("ё", "е").toLowerCase(),
                localStorage.getItem("user")
              ).then((game) => {
                if (game.error) {
                  setError("Произошла ошибка");
                } else {
                  router.push(`/game/${game.challenge_id}`);
                }
              });
            }}
          >
            Создать игру
          </Button>
        </motion.div>
        {error && <div className="text-red-400">{error}</div>}
      </div>
      <PreviewWidget />
    </main>
  );
}
