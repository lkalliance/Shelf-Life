import "./About.css";
import React, { useState, useEffect, useContext } from "react";

function About() {
  const [showModal, setShowModal] = useState(false);
  const handleModalSubmit = () => {
    setShowModal(!showModal);
    // document.body.style.filter = "blur(2px)";
  };

  const handleClose = () => {
    setShowModal(false)
  }



  return (
    <div class="About">

      <button onClick={() => {
        handleModalSubmit();
      }} class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
        About
      </button>


      <div id="defaultModal" tabindex="-1" className={
        showModal ? `fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full` : `fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
        <div class="relative w-full max-w-2xl max-h-full">

          <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">

            <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                Shelf Life
              </h3>
              <button onClick={() => {
                handleClose();
              }} type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="defaultModal">
                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                <span class="sr-only">Close modal</span>
              </button>
            </div>

            <div class="p-6 space-y-6">

              <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente fugiat corrupti accusamus eveniet laborum consequuntur?
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente fugiat corrupti accusamus eveniet laborum consequuntur?
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente fugiat corrupti accusamus eveniet laborum consequuntur?
              </p>
            </div>

          </div>
        </div>
      </div>


    </div>);

}

export { About };
