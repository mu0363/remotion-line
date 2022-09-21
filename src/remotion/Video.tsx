import type { FC } from "react";
import { Provider } from "react-redux";
import { Composition } from "remotion";
import { Templater01 } from "./Templater01";
import { store } from "../libs/store";
import { Template1DefaultProps } from "../libs/const";
import { Provider as JotaiProvider } from "jotai";

export const MyVideo: FC = () => {
  return (
    <JotaiProvider>
      <Provider store={store}>
        <Composition
          id="template01"
          component={Templater01}
          durationInFrames={120}
          width={1080}
          height={1080}
          fps={30}
          defaultProps={Template1DefaultProps}
        />
      </Provider>
    </JotaiProvider>
  );
};
