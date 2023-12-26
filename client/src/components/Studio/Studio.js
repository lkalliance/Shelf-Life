import "./Studio.css";
import { cloneDeep } from "lodash";
import { titleSmooshing } from "../../utils/dragUtils";

export function Studio({ selected, setSelected, bookList }) {
  // Set up styles vs classes
  const reverseList = cloneDeep(bookList).toReversed();
  const colorStyle = selected.color.charAt(0) === "#";
  const textColorStyle = selected.text && selected.text.charAt(0) === "#";
  const heightStyle = !isNaN(selected.height);
  const thicknessStyle = !isNaN(selected.thickness);
  const handleChange = (e) => {
    const { id, value } = e.target;
    setSelected({ ...selected, [id]: value });
  };
  const handleCheckChange = (e) => {
    const { id, checked } = e.target;
    setSelected({ ...selected, [id]: checked });
    console.log(id, checked);
  };
  const handleTextChange = (e) => {
    const { value } = e.target;
    setSelected({
      ...selected,
      shortTitle: titleSmooshing(selected.title, value),
    });
  };
  const handleCopy = (e) => {
    const { value } = e.target;
    if (value === reverseList.length) return;
    const thisBook = reverseList[value];
    setSelected({
      ...selected,
      color: thisBook.color,
      text: thisBook.text || "",
      height: thisBook.height,
      thickness: thisBook.thickness,
      style: thisBook.style,
    });
  };

  return (
    <div id="studio">
      <div id="preview">
        <div id="shortSample" className="samples"></div>
        <div
          className={`book ${colorStyle ? "" : selected.color} ${
            thicknessStyle ? "" : selected.thickness
          } ${heightStyle ? "" : selected.height} ${selected.style}
          `}
          id={selected.bookId}
          style={{
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
                fontSize:
                  selected.thickness === "thin" || selected.thickness < 28
                    ? "9px"
                    : selected.thickness === "mid" || selected.thickness < 35
                    ? "10px"
                    : "",
                lineHeight:
                  selected.thickness === "thin" || selected.thickness < 28
                    ? "10px"
                    : selected.thickness === "mid" || selected.thickness < 35
                    ? "11px"
                    : "",
              }}
            >
              {selected.shortTitle}
            </span>
          </div>
          <div className="accent bottom"></div>
        </div>
        <div id="longSample" className="samples"></div>
      </div>
      <fieldset id="copy" className="control-col">
        <label htmlFor="copyStyles">Copy styles from:</label>
        <select id="copyStyles" onChange={handleCopy} defaultValue={-1}>
          <option value={bookList.length} key={bookList.length}>
            Select a book to copy
          </option>
          {bookList.toReversed().map((book, index) => {
            return (
              <option
                value={index}
                key={index}
              >{`${book.title} (${book.year})`}</option>
            );
          })}
        </select>
      </fieldset>
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
      </fieldset>
    </div>
  );
}
