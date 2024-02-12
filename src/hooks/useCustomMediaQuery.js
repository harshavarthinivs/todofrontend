import { useState, useEffect } from "react";
/**
 *
 * @param {*} query
 *
 * this will  accept any valid   media query statement and return their current state
 *
 */

const useCustomMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);

    const handleMediaMatchesChange = (event) => {
      setMatches(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaMatchesChange);

    return () =>
      mediaQuery.removeEventListener("change", handleMediaMatchesChange);
  }, [query]);

  return matches;
};

export default useCustomMediaQuery;