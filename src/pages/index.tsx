import type { Liff } from "@line/liff";
import { Player } from "@remotion/player";
import { useAtom, useAtomValue } from "jotai";
import type { NextPage } from "next";
import { useEffect } from "react";
import { Form } from "src/components/Form";
import { accessTokenAtom, template1DataAtom } from "src/libs/jotai/atom";
import { Templater01 } from "src/remotion/Templater01";

const Home: NextPage<{ liff: Liff | null; liffError: string | null }> = ({
  liff,
  liffError,
}) => {
  const [accessToken, setAccessToken] = useAtom(accessTokenAtom);
  const template1Data = useAtomValue(template1DataAtom);

  useEffect(() => {
    if (liff) {
      liff.ready.then(() => {
        setAccessToken(liff.getAccessToken());
      });
    }
  }, [liff, setAccessToken]);
  return (
    <div>
      <Player
        component={Templater01}
        inputProps={template1Data}
        durationInFrames={120}
        compositionWidth={1080}
        compositionHeight={1080}
        fps={30}
        style={{ width: "100%" }}
        controls={false}
        loop
        autoPlay
      />
      {liff && <Form liff={liff} />}
      <p className="text-xs text-gray-300">{`template1Data: ${template1Data.image_url}`}</p>
    </div>
  );
};

export default Home;
