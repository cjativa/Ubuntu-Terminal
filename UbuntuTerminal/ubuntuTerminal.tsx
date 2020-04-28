import React, { Component, useState, useEffect, useRef } from "react";
import { render } from "react-dom";

import { NavigationBar } from "./navigationBar";
import { Body } from "./body";

/** The Ubuntu Terminal component */
export const UbuntuTerminal = props => {
  const { appRef, index, addTerminal, removeTerminal, config, setConfig } = props;
  const ubuntuRef = useRef(null);
  const [maximized, setMaximized] = useState(null);
  const [minimized, setMinimized] = useState(null);

  /** Performs the drag functionality of the terminal */
  const drag = event => {
    ubuntuRef.current.style.transition = "none";
    // Get the current position of the target
    const { target, clientX, clientY } = event;
    const { offsetTop, offsetLeft } = target;
    const { left, top } = ubuntuRef.current.getBoundingClientRect();

    // Determine the new drag points
    let dragStartLeft = left - offsetLeft;
    let dragStartTop = top - offsetTop;
    let dragStartX = clientX;
    let dragStartY = clientY;

    /** Modify position of the element when drag starts */
    const beginDrag = ({ clientX, clientY }) => {
      const newX = dragStartLeft + clientX - dragStartX;
      const newY = dragStartTop + clientY - dragStartY;

      // Constrain the new drag positions to the window size
      if (
        newX > 0 &&
        newX < window.innerWidth - 600 &&
        (newY > 0 && newY < window.innerHeight - 300)
      ) {
        ubuntuRef.current.style.transform = `translate(${newX}px, ${newY}px)`;
      }
    };

    /** Remove event listeners when dragging should stop */
    const stopDrag = () => {
      window.removeEventListener("mousemove", beginDrag, false);
      window.removeEventListener("mouseup", stopDrag, false);
    };

    window.addEventListener("mousemove", beginDrag, false);
    window.addEventListener("mouseup", stopDrag, false);
  };

  /** Handles maximizing the terminal when not maximied */
  const maximize = event => {
    // If terminal is not minimized, then terminal should become 100% of width and height
    if (!minimized) {
      ubuntuRef.current.style.height = `100%`;
      ubuntuRef.current.style.width = `100%`;

      ubuntuRef.current.style.transform = `translate(0px, 0px)`;
      ubuntuRef.current.style.transition = `height 0.2s ease-in, width 0.2s ease-in, transform 0.2s ease-in`;
      setMaximized(true);
    }
    // Otherwise, terminal is minimized and user wants to reset it to normal
    else {
      resetMaximize();
    }
  };

  /** Resets the maximized terminal to normal seize */
  const resetMaximize = (event?) => {
    ubuntuRef.current.style.height = `300px`;
    ubuntuRef.current.style.width = `600px`;
    ubuntuRef.current.style.transition = `height 0.2s ease-in, width 0.2s ease-in, transform 0.2s ease-in`;
    ubuntuRef.current.style.transform = `translate(0px, 0px)`;

    setMaximized(false);

    // If the terminal was minimized prior, reset the state of it
    if (minimized) setMinimized(false);
  };

  /** Minimizes the terminal */
  const minimize = event => {
    ubuntuRef.current.style.transform = `translate(0, 96vh)`;
    ubuntuRef.current.style.width = `600px`;

    ubuntuRef.current.style.transition = `transform 0.2s ease-in, width 0.2s ease-in`;
    setMinimized(true);

    // If the terminal was maximized before, reset the state of it
    if (maximize) setMaximized(false);
  };

  return (
    <div className="ubuntu" ref={ubuntuRef}>
      <NavigationBar
        drag={drag}
        maximize={maximize}
        resetMaximize={resetMaximize}
        maximized={maximized}
        addTerminal={addTerminal}
        removeTerminal={removeTerminal}
        index={index}
        minimize={minimize}
        config={config}
      />
      <Body config={config} setConfig={setConfig}/>
    </div>
  );
};
