// This component renders the styling controls for an added book

import "./Studio.css";
import { cloneDeep } from "lodash";
import { titleSmooshing } from "../../utils/dragUtils";

export function Studio({ selected, setSelected, bookList }) {
  // Create a list for the copy function, most recent book first
  const reverseList = cloneDeep(bookList).toReversed();
  // Set up flags to indicate if styling is rendered as a style or a class
  const colorStyle = selected.color.charAt(0) === "#";
  const textColorStyle = selected.text && selected.text.charAt(0) === "#";
  const textSizeStyle = selected.textSize && parseInt(selected.textSize) > 0;
  const heightStyle = !isNaN(selected.height);
  const thicknessStyle = !isNaN(selected.thickness);

  const handleChange = (e) => {
    // Handles the change of any input or slider and saves to selected
    const { id, value } = e.target;
    setSelected({ ...selected, [id]: value });
  };

  const handleTextChange = (e) => {
    // Handles the selection of a text abbreviation type
    const { value } = e.target;
    setSelected({
      ...selected,
      shortTitle: titleSmooshing(selected.title, value),
    });
  };

  const handleCopy = (e) => {
    // Handles the selection of a previously-added book to copy its styling
    const { value } = e.target;
    // If the selection is the placeholder text for the menu, forget it
    if (value === reverseList.length) return;

    const thisBook = reverseList[value];
    if (thisBook) {
      setSelected({
        ...selected,
        color: thisBook.color,
        text: thisBook.text || "",
        height: thisBook.height,
        thickness: thisBook.thickness,
        style: thisBook.style,
      });
    }
  };

  return (
    <div id="studio">
      <fieldset id="copy" className="control-col">
        <label htmlFor="copyStyles">Copy styles from:</label>
        <select id="copyStyles" onChange={handleCopy} defaultValue={-1}>
          <option value={bookList.length} key={bookList.length}>
            Select a book to copy
          </option>
          {bookList.toReversed().map((book, index) => {
            return (
              <option value={index} key={index}>{`${book.title} (${book.year})${
                book.audio ? " 🎧" : ""
              }`}</option>
            );
          })}
        </select>
      </fieldset>
      <div id="preview">
        <div id="shortSample" className="samples"></div>
        <div
          className={
            // Use classes for old-style books
            `book ${colorStyle ? "" : selected.color} ${
              thicknessStyle ? "" : selected.thickness
            } ${heightStyle ? "" : selected.height} ${selected.style} ${
              selected.audio ? "audio" : ""
            }
          `
          }
          id={selected.bookId}
          style={{
            // Use styles for new-style books
            backgroundColor: colorStyle ? selected.color : "",
            height: thicknessStyle ? `${selected.thickness}px` : "",
            width: heightStyle ? `${selected.height}px` : "",
          }}
        >
          <div className="accent top"></div>
          <div className="spineText">
            <span
              key="title"
              className="title"
              style={{
                color: textColorStyle
                  ? selected.text
                  : selected.color === "yellow" || selected.color === "white"
                  ? "black"
                  : "whte",
                // Set font size and line height based on available space
                fontSize: textSizeStyle
                  ? `${selected.textSize}px`
                  : selected.thickness === "thin" || selected.thickness < 28
                  ? "8px"
                  : selected.thickness === "mid" || selected.thickness < 35
                  ? "10px"
                  : "",
                lineHeight: textSizeStyle
                  ? `${parseInt(selected.textSize) + 1}px`
                  : selected.thickness === "thin" || selected.thickness < 28
                  ? "9px"
                  : selected.thickness === "mid" || selected.thickness < 35
                  ? "11px"
                  : "",
              }}
            >
              {selected.shortTitle}
              {selected.audio ? <div className="aud">🎧</div> : ""}
            </span>
          </div>
          <div className="accent bottom"></div>
        </div>
        <div id="longSample" className="samples"></div>
      </div>

      <div id="styles-colors">
        <div id="style-title">
          <fieldset id="styles" className="control-row">
            <label htmlFor="style">Style:</label>
            <select id="style" onChange={handleChange} value={selected.style}>
              <option value="paperback">paperback</option>
              <option value="hardcover">hardcover</option>
              <option value="leather">leatherbound</option>
            </select>
          </fieldset>
          <fieldset id="title" className="control-row">
            <label htmlFor="titleText">Title:</label>
            <select
              id="titleText"
              onChange={handleTextChange}
              defaultValue={"full"}
            >
              <option value="full">full title</option>
              <option value="abbrev">abbreviated</option>
              <option value="short">short</option>
              <option value="shorter">shorter</option>
              <option value="shortest">shortest</option>
            </select>
          </fieldset>
        </div>
        <div id="colors">
          <fieldset id="spine" className="control-row">
            <label htmlFor="color">Spine color:</label>
            <input
              type="color"
              value={colorStyle ? selected.color : "#ffffff"}
              id="color"
              onChange={handleChange}
            />
          </fieldset>
          <fieldset id="text" className="control-row">
            <label htmlFor="text">Text color:</label>
            <input
              type="color"
              value={textColorStyle ? selected.text : "000000"}
              id="text"
              onChange={handleChange}
            />
          </fieldset>
        </div>
      </div>
      <fieldset id="dimensions" className="control-col">
        <div>
          <label htmlFor="height">Height:</label>
          <input
            type="range"
            min={125}
            max={160}
            value={heightStyle ? selected.height : "145"}
            id="height"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="thickness">Width:</label>
          <input
            type="range"
            min={20}
            max={45}
            value={thicknessStyle ? selected.thickness : "30"}
            id="thickness"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="textSize">Text size:</label>
          <input
            type="range"
            min={8}
            max={15}
            value={
              textSizeStyle
                ? selected.textSize
                : selected.thickness === "thin" || selected.thickness < 28
                ? 8
                : selected.thickness === "mid" || selected.thickness < 35
                ? 10
                : 12
            }
            id="textSize"
            onChange={handleChange}
          />
        </div>
      </fieldset>
    </div>
  );
}
