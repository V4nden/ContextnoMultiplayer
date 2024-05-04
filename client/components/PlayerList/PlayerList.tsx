import { gameType } from "@/lib/game/types";
import { userType } from "@/lib/player/types";
import GameSockets from "@/lib/sockets/GameSockets";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import Player from "./Player";

type Props = { players: { [key: string]: { rank: number; user: userType } } };

const PlayerList = (props: Props) => {
  return (
    <motion.div
      layout
      className="grid gap-2 w-full"
      style={{
        gridTemplateColumns: `${
          Object.keys(props.players).length <= 4 ? "1fr" : "1fr 1fr"
        }`,
      }}
    >
      {Object.keys(props.players)
        .sort((a, b) => {
          return props.players[a].rank - props.players[b].rank;
        })
        .map((player, index) => {
          return (
            <Player
              key={props.players[player].user.id}
              player={props.players[player]}
              place={index}
            />
          );
        })}
    </motion.div>
  );
};

export default PlayerList;
