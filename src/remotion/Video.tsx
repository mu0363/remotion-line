import "../styles/globals.css";
import type { FC } from "react";
import { Composition } from "remotion";
import { Templater01 } from "./Templater01";
import { Template1DefaultProps } from "../libs/const";
import { Provider as JotaiProvider } from "jotai";

export const MyVideo: FC = () => {
  return (
    <JotaiProvider>
      <Composition
        id="template01"
        component={Templater01}
        durationInFrames={120}
        width={1080}
        height={1080}
        fps={30}
        defaultProps={Template1DefaultProps}
      />
    </JotaiProvider>
  );
};
