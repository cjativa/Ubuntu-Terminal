import React, { Component, useState, useEffect, useRef } from "react";
import { generateOutputForCommand, showHelpList } from "./commandHelper";

export const TerminalContent = props => {
  const { config, inputRef } = props;

  const [inputs, setInputs] = useState([]);
  const [input, setInput] = useState("");

  const terminalContainerRef = useRef<HTMLDivElement>(null);

  /** Handles input being submitted */
  const submitInput = () => {
    // If the input was to clear, empty our previously entered inputs
    if (input === "clear") {
      setInputs([]);
    }

    // Otherwise, handle as a command
    else {
      let output;

      // For the help command, display the list of commands
      if (input === "help") output = showHelpList();
      // Otherwise, generate the output
      else output = generateOutputForCommand(input);

      const inputToAdd = {
        input,
        output
      };

      const newInputs = [...inputs, inputToAdd];
      setInputs(newInputs);
    }

    setInput("");
  };

  /** Scrolls terminal to bottom after input is entered */
  useEffect(() => {
    const updateScrollToBottom = () => {
      const terminalContent = terminalContainerRef.current;
      terminalContent.scrollTo({
        top: terminalContent.scrollHeight,
        behavior: "smooth"
      });
    };

    updateScrollToBottom();
  }, [inputs]);

  /** Handles input changes in ther terminal input line */
  const onInputChange = event => {
    const value = event.target.value;
    setInput(value);
  };

  useEffect(() => {
    /** Listens for the enter key being pressed on main keyboard/numpad */
    const enterKeyListener = event => {
      const code = event.code || event.key;
      if (code === "NumpadEnter" || code === "Enter") {
        submitInput();
      }
    };

    // Registers the enter key listener on mount
    window.addEventListener("keypress", enterKeyListener);
    return () => {
      // Unregisters the enter key listener on unmount
      window.removeEventListener("keypress", enterKeyListener);
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

  /** Generates the lines of previously entered inputs */
  const displayPreviousInputs = () => {
    return (
      <div>
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
      </div>
    );
  };

  return (
    <div
      style={{ overflowY: "auto", height: "100%", whiteSpace: "pre-line" }}
      ref={terminalContainerRef}
    >
      {/** Renders previously entered inputs */}
      {displayPreviousInputs()}

      {/** Renders the command input line  */}
      <div className="input-container">
        {generateLine()}
        <input
          className="terminal-input"
          type="text"
          autoFocus
          onChange={onInputChange}
          spellCheck={false}
          value={input}
          ref={inputRef}
          placeholder={inputs.length == 0 ? `Enter "help" for a list of commands` : ""}
        />
      </div>
    </div>
  );
};
