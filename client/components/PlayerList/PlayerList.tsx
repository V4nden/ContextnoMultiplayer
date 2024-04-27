import { gameType } from "@/lib/game/types";
import { userType } from "@/lib/player/types";
import GameSockets from "@/lib/sockets/GameSockets";
import React, { useEffect, useState } from "react";

type Props = { players: { [key: string]: { rank: number; user: userType } } };

const PlayerList = (props: Props) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      {Object.keys(props.players)
        .sort((a, b) => {
          return props.players[a].rank - props.players[b].rank;
        })
        .map((player) => {
          return (
            <div
              key={player}
              className="flex justify-between w-full border p-2 rounded-lg items-center"
              style={{
                background: `linear-gradient(90deg, ${props.players[player].user.color}aa 0%, ${props.players[player].user.color}55 100%)`,
              }}
            >
              <span className="font-bold">
                {props.players[player].user.name}
              </span>
              <span>{props.players[player].rank}</span>
            </div>
          );
        })}
    </div>
  );
};

export default PlayerList;
