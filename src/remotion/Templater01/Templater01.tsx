import type { FC } from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { Template1Type } from "../../libs/types";
import { T01Image } from "./T01Image";
import { T01Text } from "./T01Text";

export const Templater01: FC<Template1Type> = ({ text, image_url }) => {
  return (
    <Sequence from={0} durationInFrames={120}>
      <AbsoluteFill
        style={{
          background: "white",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <T01Image image={image_url} />
        {/* <T01Text text={text} /> */}
      </AbsoluteFill>
    </Sequence>
  );
};
