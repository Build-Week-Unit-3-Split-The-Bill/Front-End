import React, { useState } from "react";

export default function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    const keyValue = window.localStorage.getItem(key);
    return keyValue ? JSON.parse(keyValue) : initialValue;
  });
  const setKeyValue = value => {
    setStoredValue(value);
    window.localStorage.setItem(key, JSON.stringify(value));
  };
  return [storedValue, setKeyValue];
}