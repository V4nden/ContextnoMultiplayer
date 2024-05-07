import postData from "../fetchPost";
import { userType } from "../player/types";

export default async function createGame(
  word: string,
  user: userType
): Promise<{
  challenge_id: string;
  challenge_name: string;
  error: boolean;
}> {
  const res: {
    challenge_id: string;
    error: boolean;
    words: string[];
  } = await postData("https://апи.контекстно.рф/create_user_challenge", {
    user_id: user.id,
    word: word,
  });

  if (!res.error) {
    let publishRes = await postData(
      "https://апи.контекстно.рф/publish_challenge",
      {
        challenge_id: res.challenge_id,
        user_id: user.id,
      }
    );
    postData(`${process.env.NEXT_PUBLIC_SOCKET_IO_SERVER}/create`, {
      ...res,
      name: publishRes.challenge_name,
      author: user,
    });
    return publishRes;
  } else {
    return {
      challenge_id: null,
      challenge_name: null,
      error: true,
    };
  }
}
