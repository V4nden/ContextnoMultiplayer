import { Server, Socket } from "socket.io";
import Player from "./Player";
import { playerInfo } from "./types";

class Game {
  players: { [id: string]: Player } = {};
  actions: { title: string; content: string; author: playerInfo }[] = [];
  name: string;
  words: string[];
  author: playerInfo;
  id: string;
  io: Server;

  constructor(
    id: string,
    name: string,
    words: string[],
    author: playerInfo,
    io: Server
  ) {
    this.id = id;
    this.name = name;
    this.words = words;
    this.author = author;
    this.io = io;
  }

  // Events
  messageGlobal(title: string, content: string) {
    this.io.to(this.id).emit("event", { title: title, content: content });
  }

  messagePlayer(player: Player, title: string, content: string) {
    player.socket.emit("event", { title: title, content: content });
  }

  messageOp(title: string, content: string) {
    Object.values(this.players).map((player) => {
      player.winner &&
        player.socket.emit("event", { title: title, content: content });
    });
  }

  //miscellaneous
  info() {
    return {
      name: this.name,
      author: this.author,
      players: Object.values(this.players).reduce((acc, player) => {
        return {
          ...acc,
          [player.info.id]: { rank: player.rank(), info: player.info },
        };
      }, {}),
    };
  }
}

export default Game;
