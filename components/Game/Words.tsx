"use client";
import { gameType } from "@/lib/game/types";
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import getGameUserHistory from "@/lib/game/getGameHistory";
import Word from "./Word";
import submitWord from "@/lib/game/submitWord";
import GameSockets from "@/lib/sockets/GameSockets";

type Props = { game: gameType; gameSockets: GameSockets };

const Words = (props: Props) => {
  const [words, setWords] = useState<{ word: string; rank: number }[]>([]);
  const [lastWord, setLastWord] = useState<{
    word: string;
    rank: number;
  } | null>(null);
  const [word, setWord] = useState<string>("");
  const [error, setError] = useState("");

  useEffect(() => {
    getGameUserHistory(
      props.game.id,
      JSON.parse(localStorage.getItem("user")).id
    ).then((history) => {
      console.log(history);
      setWords(history.words);
    });
  }, []);

  return (
    <div className="flex flex-col gap-2 w-full">
      <div>{error}</div>
      <Input
        placeholder="Слово"
        onChange={(e) => {
          setWord(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key !== "Enter") return;
          submitWord(
            word,
            props.game,
            JSON.parse(localStorage.getItem("user")).id,
            props.gameSockets
          ).then((res) => {
            if (res.error) {
              setError(res.details);
              return;
            }
            setWords((words) => [...words, { word: res.word, rank: res.rank }]);
            setWord("");
            setLastWord({ word: res.word, rank: res.rank });
          });
        }}
        value={word}
      ></Input>
      {lastWord && <Word {...lastWord} />}
      <div className="flex flex-col gap-2">
        {words
          .sort((a, b) => {
            return a.rank - b.rank;
          })
          .map(({ word, rank }) => {
            return <Word word={word} rank={rank} />;
          })}
      </div>
    </div>
  );
};

export default Words;