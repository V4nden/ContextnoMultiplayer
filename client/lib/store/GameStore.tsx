import { makeAutoObservable } from "mobx";
import GameSockets from "../sockets/GameSockets";
import { playerType, userType } from "../player/types";
import { Socket } from "socket.io-client";

class GameStore {
  players: { [key: string]: { info: userType; rank: number } }[] = [];
  words: { word: string; rank: number }[] = [];
  socket: Socket;
  constructor() {
    makeAutoObservable(this);
  }

  submitWord(word: string) {
    this.socket.emit("word", word);
  }

  addWord(word: string, rank: number) {
    this.words = [...this.words, { word: word, rank: rank }];
  }

  setPlayers(players: { [key: string]: { info: userType; rank: number } }[]) {
    this.players = players;
  }
}

export default new GameStore();
