import React, { Component, useState, useEffect, useRef } from "react";

export const TerminalContent = props => {
  const { config, inputRef } = props;
  const [enteredInputs, setEnteredInputs] = useState([]);
  const [terminalInput, setInput] = useState("");

  /** Handles input being submitted */
  const submitInput = () => {
    if (terminalInput === "clear") {
      setEnteredInputs([]);
    } else {
      const inputs = [...enteredInputs, terminalInput];
      setEnteredInputs(inputs);
    }

    setInput("");
  };

  /** Handles input changes in ther terminal input line */
  const onInputChange = event => {
    const value = event.target.value;
    setInput(value);
  };

  useEffect(() => {
    /** Listens for the enter key being pressed on main keyboard/numpad */
    const enterKeyListener = event => {
      if (event.code === "NumpadEnter" || event.code === "Enter") {
        submitInput();
      }
    };

    // Registers the enter key listener on mount
    window.addEventListener("keydown", enterKeyListener);

    return () => {
      // Unregisters the enter key listener on unmount
      window.removeEventListener("keydown", enterKeyListener);
    };
  }, [terminalInput]);

  /** Genereates the `user@computer:~$` line seen at the beginning of entered command inputs */
  const generateLine = () => {
    const { name, computer } = config;
    return (
      <span className="command__green">
        {`${name}@${computer}`}
        <span className="command__white">:</span>
        <span className="command__blue">~</span>
        <span className="command__white">$</span>{" "}
      </span>
    );
  };

  return (
    <div>
      {/** Renders the list of previously entered inputs */}
      {enteredInputs.map((input, index) => {
        return (
          <div key={index}>
            {generateLine()}
            {input}
          </div>
        );
      })}

      {/** Renders the command input line  */}
      <div className="input">
        {generateLine()}
        <input
          className="terminal-input"
          type="text"
          autoFocus
          onChange={onInputChange}
          spellCheck={false}
          value={terminalInput}
          ref={inputRef}
        />
      </div>
    </div>
  );
};
