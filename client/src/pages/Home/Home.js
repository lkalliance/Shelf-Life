import "./Home.css";
import Auth from "../../utils/auth";

function Home() {
  if (Auth.loggedIn()) window.location.href = "/profile";

  return <section id="home">I'm on the home screen</section>;
}

export { Home };
