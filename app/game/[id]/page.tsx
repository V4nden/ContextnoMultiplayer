"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const page = ({ params }: { params: { [key: string]: string } }) => {
  const [game, setGame] = useState<null | {
    id: string;
    name: string;
    type: string;
  }>(null);

  const [server, setServer] = useState(null);
  const [players, setPlayers] = useState<{
    [id: string]: { score: number; color: string; name: string; id: string };
  }>({});

  const [currentScore, setCurrentScore] = useState(20000);

  const [word, setWord] = useState("");
  const [recent, setRecent] = useState<{ word: string; rank: number } | null>(
    null
  );
  const [words, setWords] = useState<{ word: string; rank: number }[]>([]);
  const [details, setDetails] = useState("");

  const submitWord = async (word: string) => {
    const res = await (
      await fetch(
        `https://xn--80aqu.xn--e1ajbkccewgd.xn--p1ai/get_score?challenge_id=${
          game?.id
        }&user_id=${localStorage.getItem("user")}&word=${word}`
      )
    ).json();
    setDetails(res.details);
    if (!res.error) {
      setCurrentScore(currentScore > res.rank ? res.rank : currentScore);
      server.emit("word", {
        game: game.id,
        user: {
          id: localStorage.getItem("user"),
          color: localStorage.getItem("color"),
          score: currentScore > res.rank ? res.rank : currentScore,
          name: localStorage.getItem("name"),
        },
      });
      setWords([...words, { word: res.word, rank: res.rank }]);
      setRecent({ word: res.word, rank: res.rank });
    }
    setWord("");
    console.log(res);
  };

  useEffect(() => {
    const server = io(process.env.HOST);
    server.connect();
    server.emit("join", {
      game: params.id,
      user: {
        id: localStorage.getItem("user"),
        color: localStorage.getItem("color"),
        score: 20000,
        name: localStorage.getItem("name"),
      },
    });
    server.on("player", (player) => {
      setPlayers((players) => ({ ...players, [player.id]: player }));
      console.log({ ...players, [player.id]: player });
    });

    setServer(server);

    const fetchGame = async () => {
      const res = await fetch(
        `https://xn--80aqu.xn--e1ajbkccewgd.xn--p1ai/get_challenge_info?challenge_id=${params.id}`
      );
      const history = await fetch(
        `https://xn--80aqu.xn--e1ajbkccewgd.xn--p1ai/get_history?challenge_id=${
          params.id
        }&user_id=${localStorage.getItem("user")}&challenge_type=unofficial`
      );

      setWords((await history.json()).words);
      setGame(await res.json());
    };
    fetchGame();

    return () => {
      server.disconnect();
    };
  }, []);

  return (
    <main className="flex min-h-screen m-auto flex-col items-center mobile:px-4 noraml:px-24 py-24 gap-4 w-1/3">
      {game ? (
        <>
          <h1 className="text-3xl font-bold">Игра {game.name}</h1>
          {players && (
            <div className="p-2 text-sm flex flex-col gap-2 border rounded-lg w-full">
              {Object.keys(players).map((player) => {
                return (
                  <div
                    className="p-4 border w-full rounded-lg flex justify-between"
                    style={{ backgroundColor: players[player].color }}
                  >
                    <p className="text-xl font-bold">{players[player].name}</p>
                    <p className="font-bold">{players[player].score}</p>
                  </div>
                );
              })}
            </div>
          )}
          <Label>{details}</Label>
          <Input
            onKeyUp={(e) => {
              if (e.key != "Enter") return;
              submitWord(word);
            }}
            onChange={(e) => {
              setWord(e.target.value);
            }}
            value={word}
            placeholder="Слово"
          ></Input>
          {recent && (
            <div className="w-full border rounded-lg my-2 p-3 flex justify-between relative">
              <span className="font-bold drop-shadow-lg">
                {recent.word.replace(
                  recent.word[0],
                  recent.word[0].toLocaleUpperCase()
                )}
              </span>
              <span>{recent.rank}</span>
              <div
                className={`absolute top-0 left-0 -z-10 rounded-lg border bg-zinc-400 h-full`}
              ></div>
            </div>
          )}
          <div className="w-full flex flex-col gap-2">
            {words
              .sort((a, b) => {
                return a.rank - b.rank;
              })
              .map((el) => {
                return (
                  <div
                    key={el.word}
                    className="w-full border rounded-lg p-3 flex justify-between relative"
                  >
                    <span className="font-bold drop-shadow-lg">
                      {el.word.replace(
                        el.word[0],
                        el.word[0].toLocaleUpperCase()
                      )}
                    </span>
                    <span>{el.rank}</span>
                    <div
                      className={`absolute top-0 left-0 -z-10 rounded-lg border bg-zinc-400 h-full`}
                    ></div>
                  </div>
                );
              })}
          </div>
        </>
      ) : (
        <div>Loading</div>
      )}
    </main>
  );
};

export default page;

// https://xn--80aqu.xn--e1ajbkccewgd.xn--p1ai/create_user_challenge
// {user_id: "1d64caf1-e542-408b-aefa-56b984f59fc2", word: "привет"}

// res - challenge_id

// https://xn--80aqu.xn--e1ajbkccewgd.xn--p1ai/publish_challenge
// {challenge_id: "6625f153432e648b0dda9cbb", user_id: "1d64caf1-e542-408b-aefa-56b984f59fc2"}

// res - {
//     "challenge_id": "6625f153432e648b0dda9cbb",
//     "challenge_name": "#200124",
//     "error": false
// }

// https://xn--80aqu.xn--e1ajbkccewgd.xn--p1ai/get_score?challenge_id=6625f153432e648b0dda9cbb&user_id=1d64caf1-e542-408b-aefa-56b984f59fc2&word=%D1%80%D0%B0%D1%86%D0%B8%D1%8F

// res - {
//     "completed": false,
//     "details": "",
//     "error": false,
//     "rank": 18276,
//     "tips": 0,
//     "tries": 0,
//     "word": "\u0447\u0435\u0442\u0432\u0435\u0440\u0442\u044c"
// }

// https://xn--80aqu.xn--e1ajbkccewgd.xn--p1ai/get_challenge_info?challenge_id=6626011cd3cbe4fb9358d74d

// https://xn--80aqu.xn--e1ajbkccewgd.xn--p1ai/get_history?challenge_id=6626011cd3cbe4fb9358d74d&user_id=1d64caf1-e542-408b-aefa-56b984f59fc2&challenge_type=unofficial
