import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const server = createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

let games = {};
let sockets = {};

function gameAction(gameId, user, content) {
  if (!games[gameId]) return;
  games[gameId]["recentActions"] = [
    ...games[gameId]["recentActions"],
    { author: user, content: content, time: Date.now() },
  ];
  io.to(gameId).emit("action", games[gameId]);
}

function hasWord(gameId, user, word) {
  return (
    games[gameId]["players"][user.id]["words"].reduce((acc, el) => {
      return (acc += el.word === word ? 1 : 0);
    }, 0) > 0
  );
}

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
    gameAction(rb.game.id, rb.user, `Присоеденился к комнате`);
    res.send({ text: "all right" });
  } else {
    res.send({ error: "not found" });
  }
  console.log("GAMES: \n", JSON.stringify(games, null, 2));
});

app.post("/create", (req, res) => {
  const rb = req.body;
  games[rb.challenge_id] = {
    players: {},
    words: rb.words.slice(0, 100),
    name: rb.name,
    author: rb.author,
    recentActions: [
      {
        author: {
          name: "Игра",
          color: "#aaaaaa",
          id: "1",
        },
        content: `Игра ${rb.name} создана`,
        time: Date.now(),
      },
    ],
  };

  console.log(rb);

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
  console.log("P", players);
  res.send(
    Object.keys(players).reduce((acc, el) => {
      return {
        ...acc,
        [players[el]["info"]["id"]]: {
          rank:
            players[el]["words"].length == 0
              ? 20000
              : players[el]["words"].sort((a, b) => {
                  return a.rank - b.rank;
                })[0].rank,
          user: players[el]["info"],
        },
      };
    }, {})
  );
});

io.on("connection", (socket) => {
  socket.on("disconnect", (reason) => {
    console.log("DISCONNECT", reason);
  });
  // !!! REMOVE PLAYER ON DISCONNECT
  socket.on("oper", (game) => {
    socket.join(game);
  });

  socket.on("hint", (hint) => {
    if (sockets[hint.to]) {
      io.to(sockets[hint.to]).emit("hint", {
        word: hint.word,
        from: hint.from,
      });
      console.log(hint);
    }
  });

  socket.on("word", (word) => {
    socket.join(word.game.id);
    console.log("WORD", JSON.stringify(games[word.game.id]));
    sockets[word.user.id] = socket.id;
    if (word.rank == 1) {
      games[word.game.id]["players"][word.user.id]["winner"] = true;
    }
    games[word.game.id]["players"][word.user.id]["words"] = [
      ...games[word.game.id]["players"][word.user.id]["words"],
      word.word,
    ];
    gameAction(
      word.game.id,
      word.user,
      `Отгадал слово ${word.word.word}(${word.word.rank})`
    );
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
