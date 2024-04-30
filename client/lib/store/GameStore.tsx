import { makeAutoObservable } from "mobx";
import GameSockets from "../sockets/GameSockets";
import { playerType } from "../player/types";

class GameStore {
  players: { [key: string]: playerType } = {};
  gameSockets: GameSockets;
  game;
  words = [];

  constructor() {
    makeAutoObservable(this);
  }

  setPlayers = (players) => {
    this.players = players;
  };

  addPlayer = (player) => {
    this.players = { ...this.players, [player.user.id]: player };
  };

  setGameSockets = (gameSockets) => {
    this.gameSockets = gameSockets;
  };

  setGame = (game) => {
    this.game = game;
  }; // SEX

  setWords = (words) => {
    this.words = words;
  };

  addWord = (word) => {
    this.words = [...this.words, word];
  };
}

export default new GameStore();
