import React, { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (mode, replace = false) => {
    if (replace === false) {
      setHistory(prev => [...prev, mode]);// equiv .push(mode)
    } else {
      setHistory(prev => [...prev.slice(0, prev.length-1), mode]);
    }
  };
  
  const back = () => {
    if (history.length < 2) {
      return;
    }
    setHistory(prev => [...prev.slice(0, history.length - 1)]);
  };

  
  return { 
    mode: history[history.length-1],
    transition: transition,
    back: back
  }; 
}
