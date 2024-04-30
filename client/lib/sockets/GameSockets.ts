"use client";
import { gameType } from "../game/types";
import { userType } from "../player/types";
import { io, Socket } from "socket.io-client";
import postData from "../fetchPost";
import { useState } from "react";

export default class GameSockets {
  game: gameType;
  user: userType;
  server: Socket;
  players: { [key: string]: { user: userType; rank: number } };

  constructor(game, user) {
    this.game = game;
    this.user = user;
    this.players = {};
  }

  hint(to: string, word: string) {
    this.server.emit("hint", { to: to, word: word, from: this.user });
  }

  connect(op?: boolean) {
    this.server = io(process.env.NEXT_PUBLIC_SOCKET_IO_SERVER);
    this.server.on("word", (word) => {
      this.players[word.user.id] = word;
    });
    if (op) return;
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
