import { useCallback, useEffect } from 'react';

const useHotkey = (key: string, onKeyDown: (event: KeyboardEvent) => void) => {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === key) {
        onKeyDown(event);
      }
    },
    [key, onKeyDown],
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);
};

export default useHotkey;
