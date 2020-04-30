import React, { Component, useState, useEffect, useRef } from "react";
import { render } from "react-dom";

import { NavigationBar } from "./navigationBar";
import { Body } from "./body";

/** The Ubuntu Terminal component */
export const UbuntuTerminal = props => {
  const {
    appRef,
    index,
    addTerminal,
    removeTerminal,
    config,
    setConfig
  } = props;

  const ubuntuRef = useRef(null);
  const [maximized, setMaximized] = useState(null);
  const [minimized, setMinimized] = useState(null);

  const [xy, updateXY] = useState([]);
  const [dimensions, updateDimensions] = useState([]);

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
      const [width, height] = dimensions;
      const shouldAllowDrag =
        newX > 0 &&
        newX < window.innerWidth - width &&
        (newY > 0 && newY < window.innerHeight - height);

      if (shouldAllowDrag && !maximized) {
        ubuntuRef.current.style.transition = `transform 0.2s smooth`;
        ubuntuRef.current.style.transform = `translate(${newX}px, ${newY}px)`;

        const { x, y } = ubuntuRef.current.getBoundingClientRect();
        updateXY([x, y]);
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
    const [width, height] = dimensions;

    ubuntuRef.current.style.width = `${width}px`;
    ubuntuRef.current.style.height = `${height}px`;

    ubuntuRef.current.style.transition = `height 0.2s ease-in, width 0.2s ease-in, transform 0.2s ease-in`;

    const [x, y] = xy;
    ubuntuRef.current.style.transform = `translate(${x}px, ${y}px)`;
    setMaximized(false);

    // If the terminal was minimized prior, reset the state of it
    if (minimized) setMinimized(false);
  };

  /** Minimizes the terminal */
  const minimize = event => {
    ubuntuRef.current.style.transform = `translate(0, 96vh)`;
    ubuntuRef.current.style.width = `${dimensions[0]}`;

    ubuntuRef.current.style.transition = `transform 0.2s ease-in, width 0.2s ease-in`;
    setMinimized(true);

    // If the terminal was maximized before, reset the state of it
    if (maximize) setMaximized(false);
  };

  useEffect(() => {
    if (ubuntuRef.current) {
      const { offsetTop, offsetLeft } = ubuntuRef.current;
      const { width, height } = ubuntuRef.current.getBoundingClientRect();

      appRef.style.display = `block`;
      ubuntuRef.current.style.transform = `translate(${offsetLeft}px, ${offsetTop}px)`;

      updateDimensions([width, height]);
      updateXY([offsetLeft, offsetTop]);
    }
  }, [ubuntuRef]);

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
      <Body config={config} setConfig={setConfig} />
    </div>
  );
};
