"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import postData from "@/lib/fetchPost";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [error, setError] = useState(false);
  const [word, setWord] = useState("");
  const [usercolor, setusercolor] = useState(localStorage.getItem("color"));
  const router = useRouter();

  const [name, setname] = useState(localStorage.getItem("name"));

  const createGame = async () => {
    const res = await postData(
      "https://xn--80aqu.xn--e1ajbkccewgd.xn--p1ai/create_user_challenge",
      { user_id: localStorage.getItem("user"), word: word }
    );

    setError(res.error);
    if (!res.error) {
      router.push("/game/" + res.challenge_id);
      postData(
        "https://xn--80aqu.xn--e1ajbkccewgd.xn--p1ai/publish_challenge",
        {
          challenge_id: res.challenge_id,
          user_id: localStorage.getItem("user"),
        }
      );
    }
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 gap-4">
      <h1 className="text-5xl font-bold">Контенстно.рф</h1>

      <Input
        placeholder="Слово"
        value={word}
        onChange={(e) => {
          setWord(e.target.value);
        }}
        className="w-fit"
      />
      <Button onClick={createGame}>Создать игру</Button>
      {error && <p>Ошибка</p>}
      <div className="rounded-lg border mt-16 p-8 flex flex-col items-center gap-4">
        <h2 className="text-2xl font-semibold ">Настройки</h2>
        <Input
          onChange={(e) => {
            localStorage.setItem("name", e.target.value);
            setname(e.target.value);
          }}
          placeholder="Ник"
          value={name}
        ></Input>
        <div className="flex gap-4">
          {[
            "#64748b",
            "#ef4444",
            "#f97316",
            "#84cc16",
            "#14b8a6",
            "#6366f1",
            "#d946ef",
          ].map((color) => {
            return (
              <button
                style={{ backgroundColor: color }}
                className={`w-8 h-8 p-2 rounded-lg ${
                  usercolor == color
                    ? "border-zinc-300 border-2 transition-all ease-out"
                    : ""
                }`}
                onClick={() => {
                  localStorage.setItem("color", color);
                  setusercolor(color);
                }}
              ></button>
            );
          })}
        </div>
      </div>
    </main>
  );
}
