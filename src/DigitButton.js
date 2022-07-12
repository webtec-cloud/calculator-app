import React from "react";
import { ACTIONS } from "./App";

const Digitbutton = ({ digit, dispatch }) => {
  return (
    <button
      onClick={() =>
        dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: digit } })
      }
    >
      {digit}
    </button>
  );
};

export default Digitbutton;
