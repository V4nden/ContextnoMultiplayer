"use client";
import Word from "@/components/Game/Word";
import postData from "@/lib/fetchPost";
import { inGameType } from "@/lib/game/types";
import GameSockets from "@/lib/sockets/GameSockets";
import UserStore from "@/lib/store/UserStore";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";

const Op = observer(({ params }: { params: { [key: string]: string } }) => {
  const [gameState, setGameState] = useState<inGameType | null>(null);
  const [game, setGame] = useState(null);
  const { user } = UserStore;

  useEffect(() => {
    postData(process.env.NEXT_PUBLIC_SOCKET_IO_SERVER + "/gamestate", {
      id: params.id,
    }).then((res) => {
      console.log(res);
      setGameState(res);
    });

    let sockets = new GameSockets(params.id, user);
    sockets.connect(true);
    sockets.server.emit("oper", params.id);
    sockets.server.on("action", (game) => {
      setGameState(game);
    });

    return () => {};
  }, []);
  return (
    <main className="p-24 grid max-h-screen min-h-screen">
      {gameState && (
        <div
          className="grid gap-4 
        grid-cols-[1fr_3fr]"
        >
          <div className="overflow-y-scroll flex flex-col gap-2 h-[753px] no-scrollbar">
            {gameState.words.map((word: string, index) => {
              return <Word word={word} rank={index + 1} key={index} />;
            })}
          </div>
          <div className="flex flex-col gap-4">
            <div
              className="flex flex-col justify-center p-4 rounded-lg"
              style={{
                background: `linear-gradient(45deg, ${gameState.author.color}AA 0%, ${gameState.author.color}88 100%)`,
              }}
            >
              <div className="flex items-center justify-between gap-2">
                <h1 className="font-bold text-4xl">Игра {gameState.name}</h1>
              </div>
              <h2 className="font-semibold">От {gameState.author.name}</h2>
            </div>
            <div className="grid gap-4 xl:grid-cols-[1fr_2fr] lg:grid-cols-[1fr_1fr] h-full">
              <div className="flex flex-col gap-2 h-[641px] overflow-y-scroll no-scrollbar">
                {gameState.recentActions.toReversed().map((action, index) => {
                  return (
                    <div
                      key={index}
                      className="border p-4 flex gap-4 items-center rounded-lg"
                    >
                      <div
                        className="rounded-full h-1/2 w-2"
                        style={{ backgroundColor: action.author.color }}
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h1 className="font-bold">{action.author.name}</h1>
                          <span className="text-zinc-400 text-sm">{`${new Date(
                            action.time
                          ).getHours()}:${new Date(
                            action.time
                          ).getMinutes()}`}</span>
                        </div>

                        <div>{action.content}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="xl:columns-2 gap-2 h-[641px] overflow-y-scroll no-scrollbar">
                {Object.values(gameState.players).map((player) => {
                  return (
                    player.words.length > 0 && (
                      <div
                        key={player.info.id}
                        className="border mb-2 rounded-lg p-4 flex flex-col gap-2 break-inside-avoid-column"
                      >
                        <div
                          className="rounded-lg p-2 flex justify-between"
                          style={{
                            background: `linear-gradient(45deg, ${player.info.color}AA 0%, ${player.info.color}88 100%)`,
                          }}
                        >
                          <h2 className="font-bold text-xl">
                            {player.info.name}
                          </h2>
                          <span>{player.words[0].rank}</span>
                        </div>
                        <div className="flex flex-col gap-2 h-[154px] overflow-y-scroll no-scrollbar">
                          {player.words.map((word) => {
                            return (
                              <Word
                                word={word.word}
                                rank={word.rank}
                                key={word.word}
                              />
                            );
                          })}
                        </div>
                      </div>
                    )
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
});

export default Op;
