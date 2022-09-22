import { IconCamera, IconCloudStorm } from "@tabler/icons";
import { format } from "date-fns";
import { ChangeEvent, FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { storageUrl, USER_ID } from "src/libs/const/remotion-config";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { supabaseClient } from "src/libs/supabase/supabaseClient";
import { Template1Type } from "src/libs/types";
import { accessTokenAtom, template1DataAtom } from "src/libs/jotai/atom";
import { useAtom, useAtomValue } from "jotai";
import { Liff } from "@line/liff/dist/lib";
import axios from "axios";

/** @package */
export const Form: FC<{ liff: Liff }> = ({ liff }) => {
  const accessToken = useAtomValue(accessTokenAtom);
  const [template1Data, setTemplate1Data] = useAtom(template1DataAtom);

  // 書き出し開始
  const renderStart = async () => {
    liff.closeWindow();
    await axios.post("/api/render", {
      accessToken,
      templateData: template1Data,
    });
  };

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
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

  return (
    <div className="flex items-center justify-center mt-10 space-x-6">
      <label className="inline-block cursor-pointer">
        <PhotoIcon className="h-8 text-gray-600" />
        <input
          type="file"
          name="avatar-upload"
          accept="image/*"
          className="hidden"
          onChange={handleImage}
        />
      </label>
      <button
        className="flex items-center bg-orange-400 text-white py-2 px-6 rounded-full font-bold"
        onClick={renderStart}
      >
        <IconCloudStorm className="mr-3" />
        <p>映像ゲット!</p>
      </button>
    </div>
  );
};
