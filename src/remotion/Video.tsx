import type { FC } from "react";
import { Provider } from "react-redux";
import { Composition } from "remotion";
import { Templater01 } from "./Templater01";
import { store } from "src/libs/store";

export const MyVideo: FC = () => {
  return (
    <Provider store={store}>
      <Composition
        id="template01"
        component={Templater01}
        durationInFrames={120}
        width={1080}
        height={1080}
        fps={30}
        defaultProps={{
          text: "World",
          image_url:
            "https://worhhbmrflaaoczgxikp.supabase.co/storage/v1/object/public/images/image-02.jpg",
        }}
      />
    </Provider>
  );
};
