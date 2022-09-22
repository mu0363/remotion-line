import { template1DataAtom } from "./../../libs/jotai/atom";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import * as line from "src/libs/line";
import { Template1Type } from "src/libs/types";

type ProfileRes = {
  userId: string;
  displayName: string;
  pictureUrl: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const data = req.body as {
    accessToken: string;
    template1Data: Template1Type;
  };
  console.log(data);

  // const { data } = await axios.get<ProfileRes>(
  //   "https://api.line.me/v2/profile",
  //   {
  //     headers: {
  //       Authorization: `Bearer ${accessToken}`,
  //     },
  //   }
  // );
  // console.log(data);

  // line.client.pushMessage(data.userId, {
  //   type: "text",
  //   text: "書き出しを開始しました 🚀  こちらに動画のリンク先をお送りしますので数分お待ちください🦄",
  // });

  res.status(200);
};

export default handler;
