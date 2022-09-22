import { atom } from "jotai";
import { Template1DefaultProps } from "../const";

export const accessTokenAtom = atom<string | null>("");
export const template1DataAtom = atom(Template1DefaultProps);
