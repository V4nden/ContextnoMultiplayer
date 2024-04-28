import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const server = createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

let games = {};

app.use(cors());
app.use(express.json());

app.post("/join", (req, res) => {
  const rb = req.body;

  if (games[rb.game.id]) {
    console.log(1);
    games[rb.game.id]["players"][rb.user.id] = {
      info: rb.user,
      words: [],
    };
  } else {
    console.log(2);
    games[rb.game.id] = { players: {} };
  }
  console.log("GAMES: \n", JSON.stringify(games, null, 2));

  res.send({ text: "all right" });
});

app.post("/gamestate", (req, res) => {
  const rb = req.body;
  if (games[rb["id"]]) {
    res.send(games[rb["id"]]);
  } else {
    res.send({ error: "Game not found" });
  }
});

app.get("/:game/players/", (req, res) => {
  const rb = req.body;
  if (!games[req.params.game]) {
    res.send({});
    return;
  }
  const players = games[req.params.game]["players"];

  res.send(
    Object.keys(players).reduce((acc, el) => {
      return {
        ...acc,
        [players[el]["info"]["id"]]: {
          rank: players[el]["words"].sort((a, b) => {
            return a.rank - b.rank;
          })[0].rank,
          user: players[el]["info"],
        },
      };
    }, {})
  );
});

io.on("connection", (socket) => {
  socket.on("oper", (game) => {
    socket.join(game);
  });

  socket.on("word", (word) => {
    console.clear();
    socket.join(word.game.id);
    console.log(word);
    games[word.game.id]["players"][word.user.id]["words"] = [
      ...games[word.game.id]["players"][word.user.id]["words"],
      word.word,
    ];
    io.to(word.game.id).emit("word", {
      rank: games[word.game.id]["players"][word.user.id]["words"].sort(
        (a, b) => {
          return a.rank - b.rank;
        }
      )[0].rank,
      user: word.user,
    });
  });
});

server.listen(25535);
