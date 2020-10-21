import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (mode, replace = false) => {
    if (replace === false) {
      history.push(mode);
      // setHistory(prev => [...prev, mode]);// equiv .push(mode)
    } else {
      history[history.length - 1] = mode;
      // setHistory(prev => [...prev.slice(0, prev.length-1), mode]);
    }
    setMode(mode);
  };
  
  const back = () => {
    if (history.length > 1) {
      history.pop();
      setMode(history[history.length - 1]);
    }
    return;
  };

  
  return { 
    mode: mode,
    transition: transition,
    back: back
  }; 
}
