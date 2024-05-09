import postData from "./postData";

class CtxApi {
  api = "https://апи.конекстно.рф/";
  async get_score(
    challenge_id: string,
    user_id: string,
    word: string
  ): Promise<{
    completed: boolean;
    details: string;
    error: boolean;
    rank: number;
    tips: number;
    tries: number;
    word: string;
  }> {
    const req = await fetch(
      this.api +
        `get_score?challenge_id=${challenge_id}&user_id=${user_id}&word=${word}&challenge_type=unofficial`
    );
    const json = await req.json();
    return json;
  }
  async create_user_challenge(
    user_id: string,
    word: string
  ): Promise<{
    challenge_id: string;
    error: boolean;
    words: string[];
  }> {
    const res = await postData(
      "https://апи.контекстно.рф/create_user_challenge",
      {
        user_id: user_id,
        word: word,
      }
    );
    return res;
  }

  async publish_challenge(
    challenge_id: string,
    user_id: string
  ): Promise<{
    challenge_id: string;
    challenge_name: string;
    error: boolean;
  }> {
    const res = await postData("https://апи.контекстно.рф/publish_challenge", {
      challenge_id: challenge_id,
      user_id: user_id,
    });

    return res;
  }
}

export default new CtxApi();
