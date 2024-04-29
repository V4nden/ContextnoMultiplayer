export interface Root {
  rank: number;
  user: User;
}

export interface User {
  id: string;
  name: string;
  color: string;
}

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React from "react";

type Props = { player: Root; place: number };

const placeColors = {
  0: "bg-green-500",
  1: "bg-orange-500",
  2: "bg-red-500",
};

const Player = (props: Props) => {
  return (
    <motion.div
      layout
      className="flex justify-between w-full border p-2 rounded-lg items-center"
      style={{
        background: `linear-gradient(90deg, ${props.player.user.color}aa 0%, ${props.player.user.color}55 100%)`,
      }}
    >
      <div className="flex items-center gap-2">
        <span
          className={cn(
            "p-1 text-center leading-none bg-zinc-800 rounded-lg text-zinc-300 font-bold aspect-square w-6 h-6 shadow-sm",
            placeColors[props.place]
          )}
        >
          {props.place + 1}
        </span>
        <span className="font-bold">{props.player.user.name}</span>
      </div>
      {props.player.rank == 1 ? (
        <span className="rounded-full shadow-sm bg-green-500 px-4 font-bold text-sm">
          WINNER
        </span>
      ) : (
        <span>{props.player.rank}</span>
      )}
    </motion.div>
  );
};

export default Player;
