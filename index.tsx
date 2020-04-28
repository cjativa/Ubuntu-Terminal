import React, { Component, useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { render } from "react-dom";
import "./styles.scss";
import { faSquare } from "@fortawesome/free-regular-svg-icons";
import {
  faSearch,
  faBars,
  faMinus,
  faTimes,
  faPlus,
  faCircle,
  faCompress
} from "@fortawesome/free-solid-svg-icons";
import { UbuntuTerminal } from "./UbuntuTerminal/ubuntuTerminal";

const Application = () => {
  const appRef = useRef(null);
  const [terminals, updateTerminals] = useState([]);

  /** Todo - add terminal functionality */
  const addTerminal = () => {
    const newTerminals = [...terminals, <UbuntuTerminalFactory />];
    updateTerminals(newTerminals);
  };

  /** Todo - remove terminal functionality */
  const removeTerminal = (indexToRemove: number) => {
    const copyTerminals = [...terminals];
    copyTerminals.splice(indexToRemove, 1);

    updateTerminals(copyTerminals);
  };

  const UbuntuTerminalFactory = () => (
    <UbuntuTerminal
      appRef={appRef}
      addTerminal={addTerminal}
      removeTerminal={removeTerminal}
    />
  );

  useEffect(() => {
    const terminals = [<UbuntuTerminalFactory />];
    updateTerminals(terminals);
  }, []);

  return (
    <div className="app" ref={appRef}>
      {/** Renders an Ubuntu Terminal component */}
      <UbuntuTerminal
        appRef={appRef}
        addTerminal={addTerminal}
        removeTerminal={removeTerminal}
      />
    </div>
  );
};

render(<Application />, document.getElementById("root"));
