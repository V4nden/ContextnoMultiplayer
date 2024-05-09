import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import cors from "cors";
import { playerInfo } from "./types";
import Game from "./Game";
import Player from "./Player";
import postData from "./postData";
import CtxApi from "./CtxApi";

const app = express();
const server = createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());

let games: { [id: string]: Game } = {};

app.get("/game", async (req, res) => {
  if (!req.query.id) {
    res.send({ error: true, content: "Game not found" });
    return;
  }
  if (!games[req.query.id.toString()]) {
    res.send({ error: true, content: "Game not found" });
    return;
  }
  res.send(games[req.query.id.toString()].info());
});

//@ts-ignore
app.post("/create", async (req, res) => {
  const rb: {
    word: string;
    author: playerInfo;
  } = req.body;

  const gameCreationResponse = await CtxApi.create_user_challenge(
    rb.author.id,
    rb.word
  );

  const gamePublishResponse = await CtxApi.publish_challenge(
    gameCreationResponse.challenge_id,
    rb.author.id
  );

  games[gameCreationResponse.challenge_id] = new Game(
    gameCreationResponse.challenge_id,
    gamePublishResponse.challenge_name,
    gameCreationResponse.words,
    rb.author,
    io
  );

  console.log(
    `Game created ${gameCreationResponse.challenge_id}, ${gameCreationResponse.words[0]}, ${rb.author.name}`
  );
  res.send({ error: false, id: gameCreationResponse.challenge_id });
});

io.on("connection", (socket) => {
  socket.on("join", (joingame: { game: string; player: playerInfo }) => {
    new Player(socket, joingame.player, games[joingame.game]);
  });
});

server.listen(25535);
