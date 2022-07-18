import React, { useReducer } from "react";
import "./App.css";
import Digitbutton from "./DigitButton";
import OperationButton from "./OperationButton";

//actions are our cases

export const ACTIONS = {
  ADD_DIGIT: "add_digit",
  CLEAR: "CLEAR",
  DELETE_DIGIT: "DELETE_DIGIT",
  CHOOSE_OPERATIONS: "CHOOSE_OPERATIONS",
  EVAULATE: "EVAULATE",
};
//whatever reducer will return will be assigned to the state
const Reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (payload.digit === "0" && state.current_operand === "0") return state;
      if (payload.digit === "." && state.current_operand === undefined)
        return { ...state, current_operand: "0." };
      if (payload.digit === "." && state.current_operand.includes("."))
        return state;

      //...state means everything that is written in the state
      //current operand is undefined it should show double quotes
      //payload.digit is the button that is clicked

      return {
        ...state,
        current_operand: `${state.current_operand || ""}${payload.digit}`,
      };
    case ACTIONS.DELETE_DIGIT:
      //if there is nothing written on our screen then nothing would happen
      if (state.current_operand == null) return state;
      //if there is a single digit on our screen then it the current operand will be none
      if (state.current_operand.length == 1) {
        return { ...state, current_operand: null };
      }
      //this slice will just remove the last digit
      return {
        ...state,
        current_operand: state.current_operand.slice(0, -1),
      };
    case ACTIONS.CLEAR:
      return {};
    case ACTIONS.CHOOSE_OPERATIONS:
      if (state.current_operand == null && state.previous_operand == null)
        return state;
      if (state.current_operand == null)
        return {
          ...state,
          operation: payload.operation,
        };
      if (state.previous_operand == null)
        return {
          ...state,
          operation: payload.operation,
          current_operand: null,
          previous_operand: state.current_operand,
        };
    case ACTIONS.EVAULATE:
      if (
        state.operation === null ||
        state.current_operand === null ||
        state.previous_operand === null
      ) {
        return state;
      }
      return {
        ...state,
        overwrite: true,
        previous_operand: null,
        operation: null,
        current_operand: evalute(state),
      };
  }
};
const DIGIT_FORMATTER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
});

function format_Operand(operand) {
  if (operand == null) return;
  const [integer, decimal] = operand.split(".");
  if (decimal == null) return DIGIT_FORMATTER.format(integer);
  return `${DIGIT_FORMATTER.format(integer)}.${decimal}`;
}

function evalute({ current_operand, previous_operand, operation }) {
  const previous = parseFloat(previous_operand);
  const current = parseFloat(current_operand);
  let computation = "";
  switch (operation) {
    case "+":
      computation = previous + current;
      break;
    case "-":
      computation = previous - current;
      break;
    case "*":
      computation = previous * current;
      break;
    case "÷":
      computation = previous / current;
      break;
  }
  return computation.toString();
}

const App = () => {
  //state is the one that is going to be manipulated
  //dispatch is going to the reducer function with the action written inside of it
  //redcuer function will contain all of our conditions
  //curly bracksts are the intial value for the state
  const [state, dispatch] = useReducer(Reducer, {});

  //disptach is a function and we are calling it
  //everything written inside dispatch function will be sent to the reducer function as action
  //type is used for the differeating our cases
  //payload is used to send something to the reducer function
  //whenever dispatch is called reducer function will be executed
  // dispatch({ type: ACTIONS.ADD_DIGIT, payload: "DEL" })
  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">
          {format_Operand(state.previous_operand)} {state.operations}
        </div>
        <div className="current-operand">
          {format_Operand(state.current_operand)}
        </div>
      </div>
      <button
        onClick={() => dispatch({ type: ACTIONS.CLEAR })}
        className="span-two"
      >
        AC
      </button>
      <button onClick={(e) => dispatch({ type: ACTIONS.DELETE_DIGIT })}>
        DEL
      </button>

      <OperationButton operation="÷" dispatch={dispatch} />
      <Digitbutton digit="1" dispatch={dispatch} />
      <Digitbutton digit="2" dispatch={dispatch} />
      <Digitbutton digit="3" dispatch={dispatch} />
      <OperationButton operation="*" dispatch={dispatch} />
      <Digitbutton digit="4" dispatch={dispatch} />
      <Digitbutton digit="5" dispatch={dispatch} />
      <Digitbutton digit="6" dispatch={dispatch} />
      <OperationButton operation="+" dispatch={dispatch} />
      <Digitbutton digit="7" dispatch={dispatch} />
      <Digitbutton digit="8" dispatch={dispatch} />
      <Digitbutton digit="9" dispatch={dispatch} />
      <OperationButton operation="-" dispatch={dispatch} />
      <Digitbutton digit="." dispatch={dispatch} />
      <Digitbutton digit="0" dispatch={dispatch} />
      <button
        onClick={() => dispatch({ type: ACTIONS.EVAULATE })}
        className="span-two"
      >
        =
      </button>
    </div>
  );
};

export default App;
