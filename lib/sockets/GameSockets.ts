"use client";
import { gameType } from "../game/types";
import { userType } from "../player/types";
import { io, Socket } from "socket.io-client";
import postData from "../fetchPost";

export default class GameSockets {
  game: gameType;
  user: userType;
  server: Socket;

  constructor(game, user) {
    this.game = game;
    this.user = user;
  }

  connect() {
    this.server = io(process.env.NEXT_PUBLIC_SOCKET_IO_SERVER);
    this.server.on("word", (word) => {
      this.onWord(word);
    });
    postData(`${process.env.NEXT_PUBLIC_SOCKET_IO_SERVER}/join`, {
      game: this.game,
      user: this.user,
      socket: this.server.id,
    });
  }

  word(word: string, rank: number) {
    this.server.emit("word", {
      game: this.game,
      user: this.user,
      word: { word: word, rank: rank },
    });
  }
}
