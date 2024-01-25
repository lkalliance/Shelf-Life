// This component renders the title of the page and the menu for changing year

import "./TitleBar.css";
import Auth from "../../utils/auth";

export function TitleBar({
  type,
  uYear,
  uSetCase,
  uSetYear,
  uCase,
  bookCount,
  otherUser,
  otherYear,
  uName,
}) {
  // Get the current year for the selection menu
  const today = new Date();
  const thisYear = today.getFullYear();
  const yearlist = [];
  for (let i = thisYear; i >= 2000; i--) {
    yearlist.push(i);
  }

  const changeYear = (e) => {
    uSetCase({ ...uCase, fetched: false });
    uSetYear(e.target.value);
  };

  return (
    <div id="title-bar">
      <h1>
        {otherUser ? (
          uName === "none" ? (
            `This user either does not exist or does not have a bookcase for ${otherYear}.${
              Auth.loggedIn() ? " Your current bookcase shown below." : ""
            }`
          ) : (
            `${uName} ${otherYear} bookcase`
          )
        ) : (
          <>
            <select value={uYear} onChange={changeYear}>
              {yearlist.map((y, index) => {
                return (
                  <option key={index} value={y}>
                    {y}
                  </option>
                );
              })}
            </select>
            {type} ({bookCount} {`book${bookCount !== 1 ? "s" : ""}`})
          </>
        )}
      </h1>
    </div>
  );
}
