import { useEffect, useRef } from 'react';

const useIsMounted = () => {
  const isMounted = useRef(false);
  useEffect(() => {
    isMounted.current = true;
    // eslint-disable-next-line no-return-assign
    return () => (isMounted.current = false);
  }, []);
  return isMounted;
};

export default useIsMounted;
