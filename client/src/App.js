import "./App.css";
import { RecoilRoot } from "recoil";
import { Bookcase } from "./pages/Bookcase/Bookcase";

function App() {
  return (
    <RecoilRoot>
      <div className="App">
        <header>Starter code</header>
        <Bookcase />
      </div>
    </RecoilRoot>
  );
}

export default App;
