import { gameHistotyType } from "./types";

export default async function getGameUserHistory(
  id: string,
  user: string
): Promise<gameHistotyType> {
  const res = await fetch(
    `https://апи.контекстно.рф/get_history?challenge_id=${id}&user_id=${user}&challenge_type=unofficial`
  );

  return await res.json();
}
