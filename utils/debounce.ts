import { useCallback, useState } from "react";

function useDebounce<T>(
  func: (...args: Array<T>) => void,
  waitTime: number
): (...args: Array<T>) => void {
  const [timeout, setTimeoutValue] = useState(null);
  return useCallback(
    (...args: Array<T>) => {
      const later: () => void = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      setTimeoutValue(setTimeout(later, waitTime));
    },
    [timeout, setTimeout, func, waitTime]
  );
}

export default useDebounce;
