import type { Liff } from "@line/liff";
import { Player } from "@remotion/player";
import type { NextPage } from "next";
import { Templater01 } from "src/remotion/Templater01";

const Home: NextPage<{ liff: Liff | null; liffError: string | null }> = ({
  liff,
  liffError,
}) => {
  return (
    <div>
      <Player
        component={Templater01}
        inputProps={{
          text: "World",
          image_url:
            "https://worhhbmrflaaoczgxikp.supabase.co/storage/v1/object/public/images/image-02.jpg",
        }}
        durationInFrames={120}
        compositionWidth={1080}
        compositionHeight={1920}
        fps={30}
        style={{ width: "100%" }}
        controls={false}
        loop
        autoPlay
      />
    </div>
  );
};

export default Home;
