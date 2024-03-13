import { useEffect } from 'react';

export const useScrollToBottom = (ref, dependency) => {
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [dependency, ref]);
};
