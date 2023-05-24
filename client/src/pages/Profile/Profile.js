import "./Profile.css";
import { useRecoilState } from "recoil";

import { userBooksAtom } from "../../recoil/atom/userBooksAtom";

function Profile() {
  const [books, setBooks] = useRecoilState(userBooksAtom);

  return <section id="profile">Profile page</section>;
}

export { Profile };
