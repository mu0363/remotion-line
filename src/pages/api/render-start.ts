import axios from "axios";
import {
  getFunctions,
  getRenderProgress,
  renderMediaOnLambda,
  RenderProgress,
} from "@remotion/lambda";
import { REGION, SITE_ID } from "src/libs/const";
import type { NextApiRequest, NextApiResponse } from "next";
import type { Template1Type } from "src/libs/types";
import * as line from "src/libs/line";

type ProfileRes = {
  userId: string;
  displayName: string;
  pictureUrl: string;
};

export type RenderProgressType =
  | {
      type: "progress";
      percent: number;
    }
  | {
      type: "success";
      percent: number;
      url: string;
    }
  | {
      type: "error";
      percent: number;
      errors: string;
    };

const getRenderProgressStatus = (
  progress: RenderProgress
): RenderProgressType => {
  if (progress.outputFile) {
    return {
      type: "success",
      percent: 100,
      url: progress.outputFile,
    };
  }

  if (progress.fatalErrorEncountered) {
    return {
      type: "error",
      percent: 0,
      errors: progress.errors[0].stack,
    };
  }

  return {
    type: "progress",
    percent: progress.overallProgress,
  };
};

const timeout = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return;
  console.log("backend start");

  try {
    // FIXME: アサーション削除
    const { accessToken, templateData } = req.body as {
      accessToken: string;
      templateData: Template1Type;
    };

    // lineからProfileを取得
    const { data } = await axios.get<ProfileRes>(
      "https://api.line.me/v2/profile",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    // 書き出し開始のpush通知を送信
    const messageData = await line.client.pushMessage(data.userId, {
      type: "text",
      text: "書き出しを開始しました 🚀 \n完了したら動画のリンク先をお送りしますので数分お待ちください🦄",
    });

    // 書き出し開始
    const [first] = await getFunctions({
      compatibleOnly: true,
      region: REGION,
    });

    const { renderId, bucketName } = await renderMediaOnLambda({
      region: REGION,
      functionName: first.functionName,
      serveUrl: SITE_ID,
      composition: templateData.composition,
      inputProps: templateData,
      codec: "h264",
      imageFormat: "jpeg",
      maxRetries: 1,
      framesPerLambda: 80,
      privacy: "public",
    });
    let currentProgressStatus: RenderProgressType = {
      type: "progress",
      percent: 0,
    };

    while (currentProgressStatus.type !== "success") {
      console.log("whileに入った");
      const progress = await getRenderProgress({
        renderId,
        bucketName,
        functionName: first.functionName,
        region: REGION,
      });

      const progressStatus = getRenderProgressStatus(progress);
      currentProgressStatus = progressStatus;
      await timeout(1000);
      console.log(progressStatus);
    }

    // 映像URLのpush通知を送信
    line.client.pushMessage(data.userId, {
      type: "text",
      text: `完了しました 🎁 \n${currentProgressStatus.url}`,
    });

    // res.status(200).send(true);

    // // res.status(200).json(newInfo);
  } catch (error) {
    console.log(error);
  }
}
