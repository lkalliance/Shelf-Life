import { atom } from "recoil";

export const userBooksAtom = atom({
  // This atom is for the user's flat book list
  key: "userBooks",
  default: {
    userName: "",
    bookList: [],
  },
});

export const userBookcaseAtom = atom({
  // This atom is for the user's bookcase for this year
  key: "userBookcase",
  default: {
    year: "",
    user_id: "",
    shelves: [],
    unshelved: [],
  },
});

export const userItemsAtom = atom({
  // This atom is for the drag-and-drop data object
  key: "userItems",
  default: {},
});

export const fetchedAtom = atom({
  // This atom tracks whether the data has been fetched
  key: "fetched",
  default: false,
});

export const yearAtom = atom({
  // This atom keeps track of the year the user is browsing
  key: "year",
  default: 2023,
});
