import React, { FC } from "react";
import { interpolate, useCurrentFrame } from "remotion";

export const T01Text: FC<{ text: string }> = ({ text }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [20, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      className="absolute right-0 z-30 mr-28 whitespace-pre-wrap font-sans text-6xl font-bold leading-normal text-gray-700"
      style={{
        opacity,
        fontFamily: "Kiwi Maru",
        textShadow: "0 0 5px #FFF,0 0 5px #FFF,0 0 5px #FFF,0 0 5px #FFF",
      }}
    >
      {text}
    </div>
  );
};
