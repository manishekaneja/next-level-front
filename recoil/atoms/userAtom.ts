import { atom, RecoilState } from "recoil";

interface UserAtomType {
  first_name: string;
  last_name: string;
  username: string;
}

const userAtom: RecoilState<UserAtomType | null> = atom({
  key: "user",
  default: null,
});

export { userAtom };
export type { UserAtomType };
