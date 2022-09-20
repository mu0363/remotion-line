import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Template1DefaultProps } from "src/libs/const";
import { Template1Type } from "src/libs/types";

export const template1Slice = createSlice({
  name: "template1",
  initialState: Template1DefaultProps,
  reducers: {
    updateT1Text: (
      states,
      action: PayloadAction<Pick<Template1Type, "text">>
    ) => {
      states.text = action.payload.text;
    },
    updateImage: (
      states,
      action: PayloadAction<Pick<Template1Type, "image_url">>
    ) => {
      states.image_url = action.payload.image_url;
    },
  },
});

export const selectAllTemplate1Data = (state: RootState) => state.template1;
export const { updateT1Text, updateImage } = template1Slice.actions;

export default template1Slice.reducer;
