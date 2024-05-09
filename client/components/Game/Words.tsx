"use client";
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";

import Word from "./Word";
import GameSockets from "@/lib/sockets/GameSockets";
import { motion } from "framer-motion";

import { observer } from "mobx-react-lite";
import GameStore from "@/lib/store/GameStore";
import UserStore from "@/lib/store/UserStore";

type Props = {};

const Words = observer((props: Props) => {
  const { words } = GameStore;
  const { user } = UserStore;
  const [lastWord, setLastWord] = useState<{
    word: string;
    rank: number;
  } | null>(null);
  const [word, setWord] = useState<string>("");
  const [error, setError] = useState("");

  return (
    <div className="flex flex-col w-full">
      <div className="gap-2 flex flex-col w-full py-4">
        <div>{error}</div>
        <Input
          placeholder="Слово"
          onChange={(e) => {
            setWord(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key !== "Enter") return;
          }}
          value={word}
        ></Input>
        {lastWord && <Word {...lastWord} />}
      </div>
      <motion.div
        layout
        transition={{ duration: 0.1 }}
        className="flex flex-col gap-2"
      >
        {words
          .toSorted((a, b) => {
            return a.rank - b.rank;
          })
          .map(({ word, rank }) => {
            return <Word key={word} word={word} rank={rank} />;
          })}
      </motion.div>
    </div>
  );
});

export default Words;
