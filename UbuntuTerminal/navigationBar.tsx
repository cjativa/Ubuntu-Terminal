import React, { Component, useState, useEffect, useRef } from "react";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/** Navigation bar for the Ubuntu terminal */
export const NavigationBar = props => {
  const {
    drag,
    maximize,
    maximized,
    resetMaximize,
    addTerminal,
    index,
    removeTerminal,
    minimize,
    config
  } = props;

  const { name, computer } = config;

  return (
    <div className="ubuntu__navigation-bar" onMouseDown={drag}>
      {/** Left side of the navigation bar */}
      <div className="nb__left">
        <FontAwesomeIcon
          icon={faPlus}
          size="sm"
          className="raised"
          onClick={() => addTerminal()}
        />
      </div>

      {/** Center of the navigation bar */}
      <div className="nb__center">
        <span className="nb__center--cp">{`${name}@${computer}:~`}</span>
      </div>

      {/** Right side of the navigation bar */}
      <div className="nb__right">
        <FontAwesomeIcon icon={faSearch} size="sm" className="raised" />
        <FontAwesomeIcon icon={faBars} size="sm" className="raised" />
        <FontAwesomeIcon
          icon={faMinus}
          size="sm"
          className="min"
          onClick={() => minimize()}
        />
        <div>
          {/** If not maximized, show "Square" icon for maximixing */}
          {!maximized && (
            <FontAwesomeIcon
              icon={faSquare}
              size="sm"
              onClick={() => maximize()}
              className="max-square"
            />
          )}
          {/** If maximized, show "Compress" icon for minimizing */}
          {maximized && (
            <FontAwesomeIcon
              icon={faCompress}
              size="sm"
              onClick={() => resetMaximize()}
              className="min-square"
            />
          )}
        </div>

        {/** Stacked FontAwesome icons for the "Close" button */}
        <span className="fa-stack custom" onClick={() => removeTerminal(index)}>
          <FontAwesomeIcon
            icon={faCircle}
            size="xs"
            className="fa-stack-2x close"
          />
          <FontAwesomeIcon icon={faTimes} size="xs" className="fa-stack-1x" />
        </span>
      </div>
    </div>
  );
};
