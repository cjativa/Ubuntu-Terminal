import React, { Component, useState, useEffect, useRef } from "react";
import { TerminalContent } from "./terminalContent";
import { InitialTerminalContent } from "./initialTerminalContent";

/** Body of the Ubuntu terminal — where the commands are executed */
export const Body = props => {
  const inputRef = useRef(null);
  const { config, setConfig } = props;

  return (
    <div className="ubuntu__body" onClick={() => inputRef.current.focus()}>
      {config.name && config.computer && (
        <TerminalContent config={config} inputRef={inputRef} />
      )}
      {!config.name && !config.computer && (
        <InitialTerminalContent config={config} inputRef={inputRef} />
      )}
    </div>
  );
};
