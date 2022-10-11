import { IconCloudStorm } from "@tabler/icons";
import { format } from "date-fns";
import { ChangeEvent, FC, useState } from "react";
import {
  DEFAULT_IMAGE_URL,
  storageUrl,
  USER_ID,
} from "src/libs/const/remotion-config";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { supabaseClient } from "src/libs/supabase/supabaseClient";
import { Template1Type } from "src/libs/types";
import { accessTokenAtom, template1DataAtom } from "src/libs/jotai/atom";
import { useAtom, useAtomValue } from "jotai";
import { Liff } from "@line/liff/dist/lib";
import axios from "axios";

/** @package */
export const Form: FC<{ liff: Liff }> = ({ liff }) => {
  const [isFirstSelect, setIsFirstSelect] = useState(true);
  const [isRendering, setIsRendering] = useState(false);
  const accessToken = useAtomValue(accessTokenAtom);
  const [template1Data, setTemplate1Data] = useAtom(template1DataAtom);

  // 書き出し開始
  const renderStart = async () => {
    setIsRendering(true);
    await axios.post<boolean>("/api/render-start", {
      accessToken,
      templateData: template1Data,
    });
  };

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    if (isFirstSelect) {
      setIsFirstSelect(false);
    }
    const file = e.target.files[0];
    const filename = `T1_${format(new Date(), "yyyyMMddhhmmss")}`;
    const objectUrl = window.URL.createObjectURL(file);
    setTemplate1Data({ ...template1Data, image_url: objectUrl });
    (async () => {
      const { data, error } = await supabaseClient.storage
        .from("images")
        .upload(
          `liff/${format(new Date(), "yyMMdd")}/${USER_ID}/${filename}`,
          file
        );
      if (error) {
        throw new Error("something went wrong");
      }
      await supabaseClient
        .from("liff_info")
        .insert<Omit<Template1Type, "id" | "created_at" | "composition">>([
          {
            user_id: USER_ID,
            image_url: `${storageUrl}/images/${data.path}`,
            text: "",
            template_number: 1,
          },
        ]);
      setTemplate1Data({
        ...template1Data,
        image_url: `${storageUrl}/images/${data.path}`,
      });
    })().catch((err) => console.log(err));
  };

  const handleClose = () => {
    // liff.sendMessages([
    //   {
    //     type: "text",
    //     text: "書き出しを開始しました 🚀 \n完了したら動画のリンク先をお送りしますので数分お待ちください🦄",
    //   },
    // ]);
    liff.closeWindow();
  };

  return (
    <div className="flex items-center justify-center mt-10">
      {isRendering && (
        <div className="flex flex-col items-center justify-center space-y-5">
          <p className="font-bold text-gray-600">書き出しを受け付けました 👍</p>
          <button
            className="flex items-center bg-orange-400 text-white py-2 px-6 rounded-full font-bold"
            onClick={handleClose}
            disabled={template1Data.image_url === DEFAULT_IMAGE_URL}
          >
            <p>閉じる</p>
          </button>
        </div>
      )}
      <div className="flex flex-col justify-center items-center space-y-4">
        {template1Data.image_url.includes("blob:") ? (
          <div>Loading</div>
        ) : template1Data.image_url.includes("blob:") ||
          (template1Data.image_url !== DEFAULT_IMAGE_URL && !isRendering) ? (
          <button
            className="flex items-center bg-orange-400 text-white py-2 px-6 rounded-full font-bold"
            onClick={renderStart}
            disabled={template1Data.image_url === DEFAULT_IMAGE_URL}
          >
            <IconCloudStorm className="mr-3" />
            <p>映像ゲット!</p>
          </button>
        ) : null}
        {!template1Data.image_url.includes("blob:") && !isRendering && (
          <label className="inline-block cursor-pointer">
            <div className="flex items-center space-x-2 bg-orange-400 text-white px-3 py-2 rounded-full">
              <PhotoIcon className="h-6" />
              {isFirstSelect ? (
                <p className="font-bold">写真をアップロード</p>
              ) : (
                <p className="font-bold">写真を変更</p>
              )}
            </div>
            <input
              type="file"
              name="avatar-upload"
              accept="image/*"
              className="hidden"
              onChange={handleImage}
            />
          </label>
        )}
      </div>
    </div>
  );
};
