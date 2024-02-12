import { useEffect, useState } from "react";

/**
 * @param {string} key
 * @param {object} initialValue
 *
 * takes a key and initial  value
 * returns an array of of three elements with the stored value way to update it
 *  and way to reset it
 */

const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  const updateValue = (value) => {
    localStorage.setItem(key, JSON.stringify(value));
    setValue(value);
  };

  const resetValue = () => {
    localStorage.removeItem(key);
    setValue(initialValue);
  };

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === key && event.newValue === null) {
        setValue(initialValue);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [key, initialValue]);

  return [value, updateValue, resetValue];
};

export default useLocalStorage;
