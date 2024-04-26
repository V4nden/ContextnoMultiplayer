import postData from "../fetchPost";

export default async function createGame(
  word: string,
  user: string
): Promise<{
  challenge_id: string;
  challenge_name: string;
  error: boolean;
}> {
  const res: {
    challenge_id: string;
    error: boolean;
    words: string[];
  } = await postData(
    "https://xn--80aqu.xn--e1ajbkccewgd.xn--p1ai/create_user_challenge",
    { user_id: user, word: word }
  );

  if (!res.error) {
    let publishRes = await postData(
      "https://xn--80aqu.xn--e1ajbkccewgd.xn--p1ai/publish_challenge",
      {
        challenge_id: res.challenge_id,
        user_id: user,
      }
    );

    return publishRes;
  } else {
    return {
      challenge_id: null,
      challenge_name: null,
      error: true,
    };
  }
}
