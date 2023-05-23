import { atom } from "recoil";
import { fakeUser, fakeBookcase } from "../../utils/dragUtils";
import { convert } from "../../utils/dragUtils";

export const userBooksAtom = atom({
  key: "userBooks",
  default: fakeUser,
});

export const userBookcaseAtom = atom({
  key: "userBookcase",
  default: fakeBookcase,
});

export const userItemsAtom = atom({
  key: "userItems",
  default: convert(fakeBookcase),
});
