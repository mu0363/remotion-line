import { Template1Type } from "../types";

export const WATERMARK_BLACK =
  "https://worhhbmrflaaoczgxikp.supabase.co/storage/v1/object/public/images/watermark/watermark_black.webp";
export const WATERMARK_WHITE =
  "https://worhhbmrflaaoczgxikp.supabase.co/storage/v1/object/public/images/watermark/watermark_white.webp";
export const WATERMARK_EMPTY =
  "https://worhhbmrflaaoczgxikp.supabase.co/storage/v1/object/public/images/watermark/watermark_empty.webp";
export const USER_ID = "22DFD4AE-6E10-491F-81BE-8D9C66CCDDB0";

export const storageUrl =
  "https://worhhbmrflaaoczgxikp.supabase.co/storage/v1/object/public";

export const Template1DefaultProps: Template1Type = {
  music:
    "https://worhhbmrflaaoczgxikp.supabase.co/storage/v1/object/public/music/music1.mp3",
  watermark: WATERMARK_BLACK,
  composition: "template01",
  image_url: `${storageUrl}/images/image-01.jpg`,
  text: "素敵な友人に\n恵まれた大学時代",
};
