// This component renders the signup form

import "./login.css";
import React, { useState, useEffect, useContext } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../../utils/mutations";
import { SignupContext } from "../../App";
import Auth from "../../utils/auth";

function SignupForm() {
  // Contexts to manage showing which modal
  const { showSignupModal, setShowSignupModal, setShowloginModal } =
    useContext(SignupContext);
  // States for alerts and form data
  const [userFormData, setUserFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [showAlert, setShowAlert] = useState(false);
  // Mutation
  const [addUser, { error }] = useMutation(ADD_USER);

  const handleModalSubmit = () => {
    // Handler to remove the signup modal
    setShowSignupModal(!showSignupModal);
  };

  const handleSwitch = () => {
    // Handler to switch to login modal
    setShowSignupModal(false);
    setShowloginModal(true);
  };

  useEffect(() => {
    // Check for alert status
    if (error) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [error]);

  const handleInputChange = (event) => {
    // Handler to follow changing input values
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    // Handler to submit form data
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    try {
      const { data } = await addUser({
        variables: { ...userFormData },
      });
      console.log(data);
      Auth.login(data.addUser.token);
    } catch (err) {
      console.error(err);
      console.log(err.message);
    }

    setUserFormData({
      userName: "",
      email: "",
      password: "",
    });
    handleModalSubmit();
  };
  return (
    <>
      <div
        tabIndex="-1"
        className={
          showSignupModal
            ? `loginForm fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`
            : `loginForm fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`
        }
        id="signupForm"
      >
        <div className=" mx-auto relative w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              onClick={() => {
                handleModalSubmit();
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
            <div className="px-6 py-6 lg:px-8">
              <h3 className=" sign mb-4 text-xl font-medium text-gray-900 dark:text-white">
                Sign up for our platform
              </h3>
              <form
                className="space-y-6"
                action="#"
                noValidate
                onSubmit={handleFormSubmit}
              >
                {/* <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
                  Something went wrong with your signup!
                </Alert> */}
                <div>
                  <label
                    htmlFor="userName"
                    className="loginLabel block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your username
                  </label>
                  <input
                    type="text"
                    name="userName"
                    id="userName"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="username"
                    onChange={handleInputChange}
                    value={userFormData.userName}
                    required
                  />
                </div>
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
                    className="loginLabel block mb-2 text-sm font-medium text-gray-900 dark:text-white"
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
                  disabled={
                    !(
                      userFormData.userName &&
                      userFormData.email &&
                      userFormData.password
                    )
                  }
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Sign up
                </button>
              </form>
              <div className=" switch sign text-sm font-medium text-gray-500 dark:text-gray-300">
                Already signed up?{" "}
                <a
                  href="#"
                  onClick={() => {
                    handleSwitch();
                  }}
                  className="switcher text-blue-700 hover:underline dark:text-blue-500"
                >
                  Log in
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export { SignupForm };
