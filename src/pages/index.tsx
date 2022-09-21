import type { Liff } from "@line/liff";
import { Player } from "@remotion/player";
import { useAtom, useAtomValue } from "jotai";
import type { NextPage } from "next";
import { useEffect } from "react";
import { Form } from "src/components/Form";
import { idTokenAtom, template1DataAtom } from "src/libs/jotai/atom";
import { Templater01 } from "src/remotion/Templater01";
import { useAtomDevtools } from "jotai/devtools";

const Home: NextPage<{ liff: Liff | null; liffError: string | null }> = ({
  liff,
  liffError,
}) => {
  // const template1Data = useSelector(selectAllTemplate1Data);
  useAtomDevtools(idTokenAtom);
  const [idToken, setIdToken] = useAtom(idTokenAtom);
  const template1Data = useAtomValue(template1DataAtom);

  useEffect(() => {
    if (liff) {
      liff.ready.then(() => {
        setIdToken(liff.getIDToken());
      });
    }
  }, [liff, setIdToken]);

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
      <Form />
      <button onClick={() => console.log(idToken)}>Show IDToken</button>
    </div>
  );
};

export default Home;
