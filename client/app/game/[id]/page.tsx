"use client";

import Words from "@/components/Game/Words";
import PlayerList from "@/components/PlayerList/PlayerList";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import getGame from "@/lib/game/getGame";
import { gameType } from "@/lib/game/types";
import { userType } from "@/lib/player/types";
import GameSockets from "@/lib/sockets/GameSockets";
import { motion } from "framer-motion";
import { Span } from "next/dist/trace";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
const page = () => {
  const params = useParams();

  const router = useRouter();

  const [game, setGame] = useState<gameType | null>(null);
  const [gameSockets, setGameSockets] = useState<GameSockets | null>(null);
  const [user, setUser] = useState<{ id: string; color: string; name: string }>(
    JSON.parse(localStorage.getItem("user"))
  );
  const [players, setPlayers] = useState<{
    [key: string]: { rank: number; user: userType };
  }>({});
  const [error, setError] = useState<null | { error: string; desc: string }>(
    null
  );
  useEffect(() => {
    getGame(String(params.id), user.id).then((game) => {
      if (Object.keys(game).length == 0) {
        setError({
          error: "Игра не найдена",
          desc: "Проверьте правильность введённой вами ссылки",
        });
        return;
      }
      setGame(game);

      let sockets = new GameSockets(game, user);

      sockets.connect(false);
      sockets.server.on("word", (word) => {
        setPlayers((players) => ({
          ...players,
          [word.user.id]: { user: word.user, rank: word.rank },
        }));
      });

      fetch(
        `${process.env.NEXT_PUBLIC_SOCKET_IO_SERVER}/${game.id}/players`
      ).then((res) => {
        res.json().then((json) => {
          console.log("json", json);
          setPlayers(json);
        });
      });

      setGameSockets(sockets);
    });
  }, []);

  return !error ? (
    game ? (
      <main className="sm:w-full xl:w-1/3 lg:w-1/2 sm:px-6 lg:px-0 m-auto flex py-12 items-center min-h-screen flex-col gap-2">
        <h1 className="font-bold text-2xl">Игра {game.name}</h1>
        {gameSockets && (
          <>
            <PlayerList players={players} />
            <Words game={game} gameSockets={gameSockets} />
          </>
        )}
        {players[user.id] && players[user.id].rank == 1 && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{
              ease: [0, 1, 0, 1],
              duration: 2,
            }}
            className="fixed w-full bg-gradient-to-t from-zinc-900 to-black/0 m-auto bottom-0 flex flex-col gap-2 items-center p-4"
          >
            <span className="text-2xl font-bold">Вы угадали слово!</span>
            <Button
              className="flex gap-2"
              onClick={(e) => {
                router.push(`${game.id}/op`);
              }}
            >
              Смотреть за игрой <FaEye fill="#000" />
            </Button>
          </motion.div>
        )}
      </main>
    ) : (
      <div>Loading</div>
    )
  ) : (
    <div className="w-full min-h-screen flex items-center justify-center flex-col gap-2">
      <span className="font-bold text-3xl">{error.error}</span>
      <span>{error.desc}</span>
    </div>
  );
};

export default page;
