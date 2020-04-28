import React, { Component, useState, useEffect, useRef } from "react";

export const InitialTerminalContent = props => {
  const { inputRef, setConfig } = props;
  const [enteredInputs, setEnteredInputs] = useState([]);
  const [input, setInput] = useState("");

  const [prompts, updatePrompts] = useState([
    {
      text: "PRESS ANY KEY TO BEGIN",
      complete: false,
      value: null,
      name: "initial"
    },
    {
      text: "Please enter your nickname",
      complete: false,
      value: null,
      name: "name"
    },
    {
      text: "Please enter your computer nickname",
      complete: false,
      value: null,
      name: "computer"
    }
  ]);

  /** Handles input being submitted */
  const submitInput = () => {
    // Find index of current prompt
    const currentPromptIndex = prompts.findIndex(
      prompt => prompt.complete == false
    );

    // Update the current prompt
    const currentPrompt = prompts[currentPromptIndex];
    const updatedCurrentPrompt = {
      ...currentPrompt,
      complete: true,
      value: input
    };

    // Replace the old value for it and update the state
    prompts.splice(currentPromptIndex, 1, updatedCurrentPrompt);
    updatePrompts([...prompts]);

    // Clear the input
    setInput("");
  };

  /** Handles input changes in ther terminal input line */
  const onInputChange = event => {
    // Get the current input and set it
    const value = event.target.value;
    setInput(value);

    // Check the current prompt -- if it was initial, then submit the input immediately
    const currentPrompt = prompts.find(prompt => prompt.complete == false);
    if (currentPrompt.name === "initial") submitInput();
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
  }, [input]);

  useEffect(() => {
    const { value: name } = prompts.find(prompt => prompt.name === "name");
    const { value: computer } = prompts.find(
      prompt => prompt.name === "computer"
    );
  
    if (name && computer) {
      setConfig({
        name,
        computer
      });
    }
  }, [prompts]);

  /** Genereates the lines for previously entered prompts/input */
  const generatePreviousInputLine = () => {
    return prompts.map((prompt, index) => {
      if (prompt.complete)
        return <div key={index}>{`${prompt.text}: ${prompt.value}`}</div>;
    });
  };

  /** Genereates the current input line */
  const generateCurrentInputLine = () => {
    const currentPrompt = prompts.find(prompt => prompt.complete == false);
    return (
      <div>
        <span>{currentPrompt.text}: </span>
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
    );
  };

  return (
    <div>
      {/** Renders the command input line  */}
      <div className="input">
        {generatePreviousInputLine()}

        {/** Only display the current prompt if there's still one to be completed*/}
        {prompts.some(prompt => prompt.complete == false) &&
          generateCurrentInputLine()}
      </div>
    </div>
  );
};
