import { IconCamera } from "@tabler/icons";
import { format } from "date-fns";
import Image from "next/image";
import { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { storageUrl, USER_ID } from "src/libs/const/remotion-config";
import {
  selectAllTemplate1Data,
  updateImage,
} from "src/libs/store/features/template1Slice";
import { supabaseClient } from "src/libs/supabase/supabaseClient";
import { Template1Type } from "src/libs/types";

/** @package */
export const Form = () => {
  const dispatch = useDispatch();
  const template1Data = useSelector(selectAllTemplate1Data);
  const { image_url } = template1Data;

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    const filename = `T1_${format(new Date(), "yyyyMMddhhmmss")}`;
    const objectUrl = window.URL.createObjectURL(file);
    dispatch(updateImage({ image_url: objectUrl }));
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
      dispatch(
        updateImage({
          image_url: `${storageUrl}/images/${data.path}`,
        })
      );
    })().catch((err) => console.log(err));
  };

  return (
    <div>
      {image_url !== undefined && (
        <div className="flex items-center justify-center mt-10">
          <label className="inline-block cursor-pointer">
            <div className="relative h-16 w-32">
              <IconCamera className="absolute top-0 left-0 z-10 h-16 w-32 rounded-xl p-3 text-gray-500 transition duration-200 ease-in-out bg-gray-200 opacity-40" />
              <Image
                width={160}
                height={80}
                src={image_url}
                objectFit="cover"
                alt="current-image"
                className="rounded-xl"
              />
            </div>
            <input
              type="file"
              name="avatar-upload"
              accept="image/*"
              className="hidden"
              onChange={handleImage}
            />
          </label>
        </div>
      )}
    </div>
  );
};
