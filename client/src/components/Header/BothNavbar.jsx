import React, { useState, useEffect } from 'react';
import DesktopNavbar from './DesktopNavbar';
import MobileNavbar from './MobileNavbar';

const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(window.matchMedia(query).matches);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    const listener = (event) => setMatches(event.matches);

    mediaQueryList.addEventListener('change', listener);
    return () => mediaQueryList.removeEventListener('change', listener);
  }, [query]);

  return matches;
};

const BothNavbar = () => {
  const isDesktop = useMediaQuery('(min-width:768px)');

  return (
    <>
      {isDesktop ? <DesktopNavbar /> : <MobileNavbar />}
    </>
  );
};

export default BothNavbar;
