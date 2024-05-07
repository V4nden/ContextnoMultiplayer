"use client";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import GameStore from "@/lib/store/GameStore";
import { FaGulp, FaLightbulb, FaUser } from "react-icons/fa";
import Player from "../PlayerList/Player";
type Props = { word: string; rank: number };

const Word = observer((props: Props) => {
  const { players, gameSockets } = GameStore;

  const [hint, setHint] = useState(false);

  return (
    <motion.div
      layout
      transition={{ duration: 0.3 }}
      className="p-2 border rounded-lg relative justify-between flex items-center bg-zinc-950 group/word"
    >
      <span className="font-bold text-lg">
        <span className="flex items-center gap-2">
          <div
            className={`w-2 h-2 rounded-full ${
              props.rank < 300
                ? "bg-green-400"
                : props.rank < 2500
                ? "bg-orange-400"
                : "bg-red-500"
            }`}
          ></div>
          {props.word.replace(props.word[0], props.word[0].toUpperCase())}
        </span>
      </span>
      <span className="flex gap-2 items-center">
        <div className="group-hover/word:opacity-100 opacity-0 transition-all ease-out">
          <button
            onClick={() => {
              setHint(!hint);
            }}
          >
            <FaLightbulb fill="#ddd" />
          </button>
        </div>
        <span>{props.rank}</span>
      </span>
      <AnimatePresence mode="wait">
        {hint && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key="hint"
            className="absolute top-[96%] left-0 w-full z-10 p-2 bg-background border border-t-0 flex flex-col gap-2"
          >
            {Object.values(players).map((player) => {
              return (
                <button
                  key={player.user.id}
                  onClick={() => {
                    setHint(false);
                    gameSockets.hint(player.user.id, props.word);
                  }}
                >
                  <Player place={player.rank} player={player} deco />
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
});

export default Word;
