import type { FC } from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { T01Image } from "./T01Image";
import { T01Text } from "./T01Text";

type Props = {
  text: string;
  image_url: string;
};

export const Templater01: FC<Props> = ({ text, image_url }) => {
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
        <T01Text text={text} />
      </AbsoluteFill>
    </Sequence>
  );
};
