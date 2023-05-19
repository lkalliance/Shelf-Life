import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Bookcase } from "./pages/Bookcase/Bookcase";
import LoginForm from "./components/Login/LoginForm";
import SignupForm from "./components/Login/SignupForm";
import { createContext, useState } from "react";
export const SignupContext = createContext()
// export const loginContext = createContext()

function App() {
  const [showSignupModal, setShowSignupModal] = useState(false)
  // const [showloginModal, setShowloginModal] = useState(false)
  return (
    <SignupContext.Provider value={{ showSignupModal, setShowSignupModal }}>
      <div className="App">
        <header>Starter code</header>

        <Bookcase />
        <LoginForm />
        <SignupForm />


      </div>
    </SignupContext.Provider>
  );
}

export default App;
