import { useState } from 'react';

export default function useFunctionAsState(fn: () => void) {
  const [val, setVal] = useState(() => fn);

  function setFunc(fn: () => void) {
    setVal(() => fn);
  }

  return [val, setFunc];
}
