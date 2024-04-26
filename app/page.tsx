"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import postData from "@/lib/fetchPost";
import createGame from "@/lib/game/createGame";
import { Label } from "@radix-ui/react-label";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();

  const [word, setWord] = useState("");
  const [error, setError] = useState("");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 gap-4">
      <h1 className="font-bold text-5xl">Контекстно.рф</h1>
      <Input
        className="w-fit"
        placeholder="Слово"
        value={word}
        onChange={(e) => {
          setWord(e.target.value);
        }}
      ></Input>
      <Button
        onClick={() => {
          createGame(word, localStorage.getItem("user")).then((game) => {
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
      {error && <div className="text-red-400">{error}</div>}
    </main>
  );
}
