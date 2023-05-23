import "./Profile.css";
import { useRecoilState } from "recoil";

import {
  userBooksAtom
} from "../../recoil/atom/userBooksAtom";

function Profile() {
  const [books, setBooks] = useRecoilState(userBooksAtom);

  return(
    <div>
      
    </div>
  )



  return <section id="profile"></section>;
}

export { Profile };
