import { atom } from "jotai";
import { Template1DefaultProps } from "../const";

export const idTokenAtom = atom<string | null>("");
export const template1DataAtom = atom(Template1DefaultProps);
