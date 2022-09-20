import type { FC } from "react";
import { Composition } from "remotion";
import { Templater01 } from "./Templater01";
export const MyVideo: FC = () => {
  return (
    <>
      <Composition
        id="template01"
        component={Templater01}
        durationInFrames={120}
        width={1080}
        height={1920}
        fps={30}
        defaultProps={{
          text: "World",
          image_url:
            "https://worhhbmrflaaoczgxikp.supabase.co/storage/v1/object/public/images/image-02.jpg",
        }}
      />
    </>
  );
};
