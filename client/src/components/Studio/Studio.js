import "./Studio.css";

export function Studio({ selected, setSelected }) {
  // Set up styles vs classes
  const colorStyle = selected.color.charAt(0) === "#";
  const textColorStyle = selected.text.charAt(0) === "#";
  const heightStyle = !isNaN(selected.height);
  const thicknessStyle = !isNaN(selected.thickness);
  const handleChange = (e) => {
    const { id, value } = e.target;
    setSelected({ ...selected, [id]: value });
    console.log(id, value);
  };

  return (
    <div id="studio">
      <div id="preview">
        <div
          className={`book ${colorStyle ? "" : selected.color} ${
            thicknessStyle ? "" : selected.thickness
          } ${heightStyle ? "" : selected.height} ${selected.style}
          }`}
          id={selected}
          style={{
            backgroundColor: colorStyle ? selected.color : "",
            height: heightStyle ? `${selected.height}px` : "",
            width: thicknessStyle ? `${selected.thickness}px` : "",
          }}
        >
          <div className="accent top"></div>
          <div className="spineText">
            <span
              key="title"
              className="title"
              style={{
                color: textColorStyle ? selected.text : "black",
              }}
            >
              {selected.title}
            </span>
          </div>
          <div className="accent bottom"></div>
        </div>
      </div>
      <fieldset id="colors">
        <label htmlFor="color">Spine:</label>
        <input
          type="color"
          value={colorStyle ? selected.color : "#ffffff"}
          id="color"
          onChange={handleChange}
        />
        <label htmlFor="text">Text:</label>
        <input
          type="color"
          value={textColorStyle ? selected.text : "000000"}
          id="text"
          onChange={handleChange}
        />
      </fieldset>
      <fieldset id="styles">
        <label htmlFor="style">Style:</label>
        <select id="style" onChange={handleChange} value={selected.style}>
          <option value="paperback">paperback</option>
          <option value="hardcover">hardcover</option>
          <option value="leather">leatherbound</option>
        </select>
      </fieldset>
      <fieldset id="dimensions">
        <label htmlFor="height">Height:</label>
        <input
          type="range"
          min={125}
          max={160}
          value={heightStyle ? selected.height : "145"}
          id="height"
          onChange={handleChange}
        />
        <label htmlFor="thickness">Width:</label>
        <input
          type="range"
          min={20}
          max={45}
          value={thicknessStyle ? selected.thickness : "30"}
          id="thickness"
          onChange={handleChange}
        />
      </fieldset>
    </div>
  );
}
