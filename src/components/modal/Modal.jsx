import React from "react";
import "./modal.scss";
import ReactDom from "react-dom";
import { useState } from "react";
export default function Modal({
  open,
  onClose,
  width,
  length,
  configGrid,
  configSpeed,
}) {
  const maxLength = 10;
  const maxWidth = 10;

  const [state, setState] = useState({ width: width, length: length });
  const [difficulty, setDifficulty] = useState("Easy");
  if (!open) {
    return null;
  }
  const lengthList = [];
  for (let i = 1; i <= maxLength; i++) {
    lengthList.push(i);
  }
  const widthList = [];
  for (let i = 1; i <= maxWidth; i++) {
    widthList.push(i);
  }

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    state[name] = value;
    setState({ ...state });
  };

  const handleSubmit = () => {
    onClose();
    configGrid(state.length, state.width);
    configSpeed(difficulty);
  };
  const handleDifficulty = (e) => {
    setDifficulty(e.target.value);
  };

  return ReactDom.createPortal(
    <>
      <div className="overlay"></div>
      <div className="modal">
        <form action="">
          <label htmlFor="length">Length:</label>
          <select name="length" value={state.length} onChange={handleChange}>
            {lengthList.map((d, index) => (
              <option value={d}>{d}</option>
            ))}
          </select>{" "}
          <br />
          <label htmlFor="width">Width: </label>
          <select name="width" value={state.width} onChange={handleChange}>
            {widthList.map((d) => (
              <option value={d}>{d}</option>
            ))}
          </select>{" "}
          <br />
          <label htmlFor="speed">Speed: </label>
          <select
            name="length"
            value={state.difficulty}
            onChange={handleDifficulty}
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>{" "}
          <br />
        </form>
        <button className="submit" onClick={handleSubmit} type="submit">
          Submit
        </button>
      </div>
    </>,
    document.getElementById("portal")
  );
}
