export type Template1Type = {
  composition: string;
  image_url: string;
  text: string;
  template_number: number;
  user_id: string;
};

// 書き出し時にポーリング関数へ渡す情報
export type RenderInfo = {
  id: string;
  renderId: string;
  bucketName: string;
  functionName: string;
  region:
    | "eu-central-1"
    | "eu-west-1"
    | "eu-west-2"
    | "us-east-1"
    | "us-east-2"
    | "us-west-2"
    | "ap-south-1"
    | "ap-southeast-1"
    | "ap-southeast-2"
    | "ap-northeast-1";
  createdAt: string;
};
