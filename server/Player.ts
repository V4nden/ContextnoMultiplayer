import { Socket } from "socket.io";
import { playerInfo } from "./types";
import Game from "./Game";
import CtxApi from "./CtxApi";

class Player {
  socket: Socket;
  info: playerInfo;
  game: Game;
  winner: boolean = false;
  words: { word: string; rank: number }[] = [];

  constructor(socket: Socket, info: playerInfo, game: Game) {
    this.game = game;
    this.socket = socket;
    this.info = info;
    this.join(this);
    socket.on("word", (word) => word(word));
  }

  rank() {
    return this.words[0].rank;
  }

  join(player: Player) {
    player.socket.join(this.game.id);
    this.game.players = { ...this.game.players, [player.info.id]: player };
    this.game.messageOp(player.info.name, "Присоединился к игре");
    this.game.actions.push({
      title: player.info.name,
      content: "Присоединился к игре",
      author: { color: "#fff", name: "Game", id: "1" },
    });
  }

  async word(word: string) {
    const wordRes = await CtxApi.get_score(this.game.id, this.info.id, word);

    this.words.push({ word: word, rank: wordRes.rank });
    this.words.sort((a, b) => {
      return a.rank - b.rank;
    });
    this.game.io
      .to(this.game.id)
      .emit("player", { player: this.info, rank: wordRes.rank });
    this.game.messageOp(
      this.info.name,
      `Отгадал слово ${word}(${wordRes.rank})`
    );
  }
}

export default Player;
