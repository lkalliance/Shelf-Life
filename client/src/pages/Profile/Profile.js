import "./Profile.css";
import { useRecoilState } from "recoil";
import Auth from "../../utils/auth";

import { userBooksAtom } from "../../recoil/atom/userBooksAtom";

function Profile() {
  if (!Auth.loggedIn()) window.location.href = "/";

  const [books, setBooks] = useRecoilState(userBooksAtom);

  return <div>I'm on the profile page</div>;

  return <section id="profile"></section>;
}

export { Profile };
