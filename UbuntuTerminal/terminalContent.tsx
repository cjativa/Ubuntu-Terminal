import React, { Component, useState, useEffect, useRef } from "react";
import { generateOutputForCommand } from "./commandHelper";

export const TerminalContent = props => {
  const { config, inputRef } = props;

  const [inputs, setInputs] = useState([]);
  const [input, setInput] = useState("");

  const inputContainerRef = useRef(null);

  /** Handles input being submitted */
  const submitInput = () => {
    if (input === "clear") {
      setInputs([]);
    } else {
      let output = generateOutputForCommand(input);

      const newInput = {
        input,
        output
      };
      const newInputs = [...inputs, newInput];
      setInputs(newInputs);
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

        const updateScrollToBottom = () => {
          const terminalContent = inputContainerRef.current;
          terminalContent.scrollTop = terminalContent.scrollHeight;
        };

        updateScrollToBottom();
      }
    };

    // Registers the enter key listener on mount
    window.addEventListener("keydown", enterKeyListener);

    return () => {
      // Unregisters the enter key listener on unmount
      window.removeEventListener("keydown", enterKeyListener);
    };
  }, [input]);

  /** Genereates the `user@computer:~$` line seen at the beginning of entered command inputs */
  const generateLine = () => {
    const { name, computer } = config;
    return (
      <span className="command__green" style={{ marginRight: "5px" }}>
        {`${name}@${computer}`}
        <span className="command__white">:</span>
        <span className="command__blue">~</span>
        <span className="command__white">$</span>
      </span>
    );
  };

  return (
    <div style={{ overflowY: "auto", height: "100%", whiteSpace: "pre-line" }}>
      {/** Renders the list of previously entered inputs */}
      {inputs.map((inputObject, index) => {
        const { input, output } = inputObject;
        return (
          <div key={index}>
            <div>
              {generateLine()}
              {input}
              {output && <div>{output}</div>}
            </div>
          </div>
        );
      })}

      {/** Renders the command input line  */}
      <div className="input-container" ref={inputContainerRef}>
        {generateLine()}
        <input
          className="terminal-input"
          type="text"
          autoFocus
          onChange={onInputChange}
          spellCheck={false}
          value={input}
          ref={inputRef}
        />
      </div>
    </div>
  );
};
