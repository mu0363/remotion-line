import { Template1Type } from "../types";

export const WATERMARK_BLACK =
  "https://worhhbmrflaaoczgxikp.supabase.co/storage/v1/object/public/images/watermark/watermark_black.webp";
export const WATERMARK_WHITE =
  "https://worhhbmrflaaoczgxikp.supabase.co/storage/v1/object/public/images/watermark/watermark_white.webp";
export const WATERMARK_EMPTY =
  "https://worhhbmrflaaoczgxikp.supabase.co/storage/v1/object/public/images/watermark/watermark_empty.webp";
export const USER_ID = "22DFD4AE-6E10-491F-81BE-8D9C66CCDDB0";
export const SITE_ID =
  "https://remotionlambda-47aic418sn.s3.us-east-1.amazonaws.com/sites/remotion-liff/index.html";
export const REGION = "us-east-1";

export const storageUrl =
  "https://worhhbmrflaaoczgxikp.supabase.co/storage/v1/object/public";

export const Template1DefaultProps: Template1Type = {
  composition: "template01",
  image_url: `${storageUrl}/images/image-01.jpg`,
  text: "素敵な友人に\n恵まれた大学時代",
  template_number: 1,
  user_id: USER_ID,
};
