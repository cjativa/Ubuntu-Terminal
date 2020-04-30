import React, {
  Component,
  useState,
  useEffect,
  useRef,
  useCallback
} from "react";
import { render } from "react-dom";
import "./styles.scss";
import { UbuntuTerminal } from "./UbuntuTerminal/ubuntuTerminal";

const Application = () => {
  const ubuntuRef = useRef(null);
  const [appRef, setAppRef] = useState(null);
  const [terminals, updateTerminals] = useState([]);
  const [config, setConfig] = useState({});

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

  const onRefChange = useCallback(node => {
    if (node) setAppRef(node);
  }, []);

  const UbuntuTerminalFactory = () => (
    <UbuntuTerminal
      appRef={appRef}
      addTerminal={addTerminal}
      removeTerminal={removeTerminal}
    />
  );

  return (
    <div className="app" ref={onRefChange}>
      {/** Renders an Ubuntu Terminal component */}
      {appRef && appRef.style && (
        <UbuntuTerminal
          appRef={appRef}
          addTerminal={addTerminal}
          removeTerminal={removeTerminal}
          config={config}
          setConfig={setConfig}
        />
      )}
    </div>
  );
};

render(<Application />, document.getElementById("root"));
