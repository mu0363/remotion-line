import type { Liff } from "@line/liff";
import { Player } from "@remotion/player";
import type { NextPage } from "next";
import { useSelector } from "react-redux";
import { Form } from "src/components/Form";
import { selectAllTemplate1Data } from "src/libs/store/features/template1Slice";
import { Templater01 } from "src/remotion/Templater01";

const Home: NextPage<{ liff: Liff | null; liffError: string | null }> = ({
  liff,
  liffError,
}) => {
  const template1Data = useSelector(selectAllTemplate1Data);
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
    </div>
  );
};

export default Home;
