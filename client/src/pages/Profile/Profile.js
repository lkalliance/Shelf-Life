import "./Profile.css";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { QUERY_ME, QUERY_BOOKCASE } from "../../utils/queries";
import { useQuery } from "@apollo/client";

import {
  userBooksAtom,
  userBookcaseAtom,
  userItemsAtom,
} from "../../recoil/atom/userBooksAtom";

function Profile() {
  const [books, setBooks] = useRecoilState(userBooksAtom);
  const [cases, setCases] = useRecoilState(userBookcaseAtom);
  const [items, setItems] = useRecoilState(userItemsAtom);

  const { loading, data } = useQuery(QUERY_ME);

  return <section id="profile">Profile page</section>;
}

export { Profile };
