import { gameType } from "./types";

export default async function getGame(
  id: string,
  user: string
): Promise<gameType> {
  const res = await fetch(
    `https://xn--80aqu.xn--e1ajbkccewgd.xn--p1ai/get_challenge_info?challenge_id=${id}`
  );

  return await res.json();
}
