import GameSockets from "../sockets/GameSockets";
import { gameType, submitWordResponse } from "./types";

export default async function submitWord(
  word: string,
  game: gameType,
  user: string,
  gameSockets: GameSockets
): Promise<submitWordResponse> {
  const res: submitWordResponse = await (
    await fetch(
      `https://xn--80aqu.xn--e1ajbkccewgd.xn--p1ai/get_score?challenge_id=${game.id}&user_id=${user}&word=${word}`
    )
  ).json();
  !res.error && gameSockets.word(res.word, res.rank);

  return res;
}
