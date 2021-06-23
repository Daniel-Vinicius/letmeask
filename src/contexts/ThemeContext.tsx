import { useState, createContext, ReactNode, useEffect } from "react";

export type ThemeContextType = {
  darkMode: boolean;
  toggleTheme: () => void;
};

type ThemeContextProviderProps = {
  children: ReactNode;
};

export const ThemeContext = createContext({} as ThemeContextType);

export function ThemeContextProvider({
  children,
}: ThemeContextProviderProps): JSX.Element {
  const [darkMode, setDarkMode] = useState(() => {
    const getTheme = localStorage.getItem("Theme");

    if (getTheme === "dark") {
      return true;
    }

    return false;
  });

  function toggleTheme(): void {
    const newDarkMode = !darkMode;
    setDarkMode(!darkMode);

    if (newDarkMode) {
      localStorage.setItem("Theme", "dark");
    } else {
      localStorage.setItem("Theme", "light");
    }
  }

  useEffect(() => {
    const getTheme = localStorage.getItem("Theme");

    if (getTheme === "dark") {
      return document.body.classList.add("dark-mode");
    }

    return document.body.classList.remove("dark-mode");
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
