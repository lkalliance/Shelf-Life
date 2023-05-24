import { atom } from "recoil";
import { fakeUser, fakeBookcase } from "../../utils/dragUtils";
import { convert } from "../../utils/dragUtils";

export const userBooksAtom = atom({
  key: "userBooks",
  default: {
    userName: "",
    bookList: [],
  },
});

export const userBookcaseAtom = atom({
  key: "userBookcase",
  default: {
    year: "",
    user_id: "",
    shelves: [],
    unshelved: [],
  },
});

export const userItemsAtom = atom({
  key: "userItems",
  default: {},
});

export const fetchedAtom = atom({
  key: "fetched",
  default: false,
});
