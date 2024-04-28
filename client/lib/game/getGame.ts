import { gameType } from "./types";

export default async function getGame(
  id: string,
  user: string
): Promise<gameType> {
  const res = await fetch(
    `https://апи.контекстно.рф/get_challenge_info?challenge_id=${id}`
  );

  return await res.json();
}
