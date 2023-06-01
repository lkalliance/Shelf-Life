// This component renders the login form

import "./login.css";
import React, { useState, useEffect, useContext } from "react";
import { useRecoilState } from "recoil";
import {
  userBookcaseAtom,
  userBooksAtom,
  userItemsAtom,
} from "../../recoil/atom/userBooksAtom";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../../utils/mutations";
import { SignupContext } from "../../App";
import Auth from "../../utils/auth";
import { convert } from "../../utils/dragUtils";

function LoginForm() {
  // Contexts and states to manage the modals
  const { setShowSignupModal, showloginModal, setShowloginModal } =
    useContext(SignupContext);
  const [userFormData, setUserFormData] = useState({ email: "", password: "" });
  const [showAlert, setShowAlert] = useState(false);
  // Atoms to accept the user's books and bookcase
  const [books, setBooks] = useRecoilState(userBooksAtom);
  const [bcase, setbCase] = useRecoilState(userBookcaseAtom);
  const [items, setItems] = useRecoilState(userItemsAtom);
  // Mutation
  const [login, { error, data }] = useMutation(LOGIN);

  const handleSwitch = () => {
    // Switches between login and signup
    setShowloginModal(false);
    setShowSignupModal(true);
  };

  const handleClose = () => {
    // Closes both login and signup
    setShowloginModal(false);
    setShowSignupModal(false);
  };

  useEffect(() => {
    // Shows an error if login fails
    if (error) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [error]);

  const handleInputChange = (event) => {
    // Keeps track of user input into forms
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    // Handles login submission
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await login({
        variables: { ...userFormData },
      });

      setBooks(data.login.user);
      setbCase(data.login.bookcase);
      setItems(convert(data.login.bookcase));
      await Auth.login(data.login.token);
      handleClose();
    } catch (err) {
      console.error(err);
    }
    setUserFormData({
      email: "",
      password: "",
    });
  };

  return (
    <>
      <div
        tabIndex="-1"
        className={
          showloginModal
            ? `fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`
            : `fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`
        }
        id="loginForm"
      >
        <div className="mx-auto relative w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              onClick={() => {
                handleClose();
              }}
              type="button"
              className=" close-icon absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              data-modal-hide="authentication-modal"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className=" loginForm px-6 py-6 lg:px-8">
              <h3 className=" sign mb-4 text-xl font-medium text-gray-900 dark:text-white">
                Log in to your account
              </h3>
              <form
                className="space-y-6"
                action="#"
                noValidate
                onSubmit={handleFormSubmit}
              >
                <div>
                  <label
                    htmlFor="email"
                    className="loginLabel block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="email"
                    onChange={handleInputChange}
                    value={userFormData.email}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className=" loginLabel block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    onChange={handleInputChange}
                    value={userFormData.password}
                    required
                  />
                </div>

                <button
                  disabled={!(userFormData.email && userFormData.password)}
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Log in to your account
                </button>
              </form>
              <div className=" switch sign text-sm font-medium text-gray-500 dark:text-gray-300">
                No account?{" "}
                <a
                  href="#"
                  onClick={() => {
                    handleSwitch();
                  }}
                  className="text-blue-700 hover:underline dark:text-blue-500 switcher"
                >
                  Create one
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export { LoginForm };
