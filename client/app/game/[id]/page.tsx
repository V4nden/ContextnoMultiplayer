"use client";

import Words from "@/components/Game/Words";
import PlayerList from "@/components/PlayerList/PlayerList";
import { Button } from "@/components/ui/button";
import getGame from "@/lib/game/getGame";
import { userType } from "@/lib/player/types";
import GameSockets from "@/lib/sockets/GameSockets";
import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaEye, FaLightbulb } from "react-icons/fa";
import { observer } from "mobx-react-lite";
import GameStore from "@/lib/store/GameStore";
import submitWord from "@/lib/game/submitWord";
import NotificationsStore from "@/lib/store/NotificationsStore";
import UserStore from "@/lib/store/UserStore";
const page = observer(() => {
  const params = useParams();

  const router = useRouter();
  const { user } = UserStore;

  const { notify } = NotificationsStore;

  const {
    players,
    setPlayers,
    words,
    addWord,
    addPlayer,
    gameSockets,
    setGameSockets,
    game,
    setGame,
  } = GameStore;
  const [error, setError] = useState<null | { error: string; desc: string }>(
    null
  );

  useEffect(() => {
    let sockets;
    if (user) {
      getGame(String(params.id), user.id).then((game) => {
        console.log(game);
        if (Object.keys(game).length == 0) {
          setError({
            error: "Игра не найдена",
            desc: "Проверьте правильность введённой вами ссылки",
          });
          return;
        }
        setGame(game);

        sockets = new GameSockets(game, user);

        sockets.connect(false);
        sockets.server.on("word", (word) => {
          addPlayer({ user: word.user, rank: word.rank });
        });
        sockets.server.on("hint", (hint: { word: string; from: userType }) => {
          submitWord(hint.word, game, user.id, sockets).then((res) => {
            if (!res.error) {
              notify({
                title: "Подсказка!",
                text: `${hint.from.name} подсказал вам слово ${hint.word}!`,
                icon: <FaLightbulb fill="#ddd" />,
              });
              addWord({ word: res.word, rank: res.rank });
            }
          });
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
    }
    return () => {
      sockets && sockets.server.disconnect();
      setGame(undefined);
      setPlayers(undefined);
      setGameSockets(undefined);
    };
  }, [user]);

  return !error ? (
    game ? (
      <motion.main
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ease: [0, 1, 0, 1], duration: 2 }}
        className="sm:w-full xl:w-1/3 lg:w-1/2 sm:px-6 lg:px-0 m-auto flex pt-24 items-center flex-col gap-2"
      >
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
      </motion.main>
    ) : (
      <div>Loading {JSON.stringify(game)}</div>
    )
  ) : (
    <div className="w-full min-h-screen flex items-center justify-center flex-col gap-2">
      <span className="font-bold text-3xl">{error.error}</span>
      <span>{error.desc}</span>
    </div>
  );
});

export default page;
