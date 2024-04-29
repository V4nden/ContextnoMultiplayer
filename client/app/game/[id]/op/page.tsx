"use client";
import Word from "@/components/Game/Word";
import postData from "@/lib/fetchPost";
import GameSockets from "@/lib/sockets/GameSockets";
import { useEffect, useState } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

const page = ({ params }) => {
  const [gameState, setGameState] = useState(null);

  useEffect(() => {
    postData(process.env.NEXT_PUBLIC_SOCKET_IO_SERVER + "/gamestate", {
      id: params.id,
    }).then((res) => {
      console.log(res);
      setGameState(res);
    });

    let sockets = new GameSockets(
      params.id,
      JSON.parse(localStorage.getItem("user"))
    );
    sockets.connect(true);
    sockets.server.emit("oper", params.id);
    sockets.server.on("word", () => {
      console.log(1);
      postData(process.env.NEXT_PUBLIC_SOCKET_IO_SERVER + "/gamestate", {
        id: params.id,
      }).then((res) => {
        console.log(res);
        setGameState(res);
      });
    });

    return () => {};
  }, []);

  return (
    <main className="sm:w-full lg:w-[70%] xl:w-1/2 m-auto min-h-screen py-12 columns-3 gap-2">
      {gameState &&
        Object.values(gameState.players).map((player) => {
          if (player.words.length != 0) {
            return <PlayerContainer player={player} />;
          }
        })}
    </main>
  );
};

const PlayerContainer = ({ player }: { player: any }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      key={player.info.id}
      className="p-2 h-full break-inside-avoid-column rounded-lg block"
      style={{
        background: `linear-gradient(180deg, ${player.info.color}77 0%, ${player.info.color}00 100%)`,
      }}
    >
      <div>
        <span className="text-2xl font-bold py-2">{player.info.name}</span>
      </div>
      <div className="flex flex-col gap-2">
        {player.words.slice(0, expanded ? 10 : 3).map((word) => {
          return <Word word={word.word} rank={word.rank} />;
        })}
      </div>
      <button className="text-zinc-300 w-full flex gap-2 justify-center items-center py-2 bg-transparent border-0">
        <span
          className="font-bold text-lg"
          onClick={(e) => {
            setExpanded(!expanded);
          }}
        >
          {expanded ? "Свернуть" : "Развернуть"}
        </span>
        {expanded ? <FaArrowUp fill="#fff" /> : <FaArrowDown fill="#fff" />}
      </button>
    </div>
  );
};

export default page;
