"use client";

import Words from "@/components/Game/Words";
import PlayerList from "@/components/PlayerList/PlayerList";
import { Input } from "@/components/ui/input";
import getGame from "@/lib/game/getGame";
import { gameType } from "@/lib/game/types";
import { userType } from "@/lib/player/types";
import GameSockets from "@/lib/sockets/GameSockets";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const params = useParams();

  const [game, setGame] = useState<gameType | null>(null);
  const [gameSockets, setGameSockets] = useState<GameSockets | null>(null);
  const [user, setUser] = useState<{ id: string; color: string; name: string }>(
    JSON.parse(localStorage.getItem("user"))
  );
  const [players, setPlayers] = useState<{
    [key: string]: { rank: number; user: userType };
  }>({});

  useEffect(() => {
    getGame(String(params.id), user.id).then((game) => {
      setGame(game);

      let sockets = new GameSockets(game, user);

      sockets.connect();
      sockets.server.on("word", (word) => {
        setPlayers((players) => ({
          ...players,
          [word.user.id]: { user: word.user, rank: word.rank },
        }));
      });

      fetch(`http://195.46.191.42:25535/${game.id}/players`).then((res) => {
        res.json().then((json) => {
          console.log("json", json);
          setPlayers(json);
        });
      });

      setGameSockets(sockets);
    });
  }, []);

  return game ? (
    <main className="w-1/3 m-auto flex py-12 items-center min-h-screen flex-col gap-2">
      <h1 className="font-bold text-2xl">Игра {game.name}</h1>
      {gameSockets && (
        <>
          <PlayerList players={players} />
          <Words game={game} gameSockets={gameSockets} />
        </>
      )}
    </main>
  ) : (
    <div>Loading</div>
  );
};

export default page;
