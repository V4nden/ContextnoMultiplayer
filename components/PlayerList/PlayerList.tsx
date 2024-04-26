import { gameType } from "@/lib/game/types";
import { userType } from "@/lib/player/types";
import GameSockets from "@/lib/sockets/GameSockets";
import React, { useEffect, useState } from "react";

type Props = { server: GameSockets };

const PlayerList = (props: Props) => {
  const [players, setPlayers] = useState<{ [key: string]: userType }>({});
  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_SOCKET_IO_SERVER}/${props.server.game.id}/players`
    ).then(async (res) => {
      setPlayers(await res.json());
    });
  }, []);

  return <div>{JSON.stringify(players)}</div>;
};

export default PlayerList;
