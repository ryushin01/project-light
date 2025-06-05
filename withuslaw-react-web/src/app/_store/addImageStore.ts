import { atom } from "jotai";

interface TAddImageAtom {
  imgSeqValue: string;
}

const initValue = atom<TAddImageAtom>({
  imgSeqValue: "",
});

const addImageAtom = atom(
  (get) => get(initValue),
  (get, set, state: TAddImageAtom) => {
    set(initValue, { ...state });
  }
);

export { addImageAtom };
