import { atom } from "recoil";
import { fakedata } from "../../utils/dragUtils";
import { convert } from "../../utils/dragUtils";

export const userBooksAtom = atom({
  key: "userBooks",
  default: fakedata,
});

export const userItemsAtom = atom({
  key: "userItems",
  default: convert(fakedata.years[0].bookcase),
});
