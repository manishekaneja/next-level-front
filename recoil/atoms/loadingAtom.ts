import { atom, RecoilState } from "recoil";

const loaderAtom: RecoilState<boolean> = atom({
  key: "loader",
  default: false,
});

export { loaderAtom };
