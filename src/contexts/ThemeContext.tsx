import { useState, createContext, ReactNode, useEffect } from "react";

type Theme = "light" | "dark";

export type ThemeContextType = {
  currentTheme: Theme;
  toggleTheme: () => void;
};

type ThemeContextProviderProps = {
  children: ReactNode;
};

export const ThemeContext = createContext({} as ThemeContextType);

export function ThemeContextProvider({
  children,
}: ThemeContextProviderProps): JSX.Element {
  const [currentTheme, setCurrentTheme] = useState<Theme>(() => {
    const getTheme = localStorage.getItem("Theme");

    if (getTheme === "dark") {
      return getTheme;
    }

    return "light";
  });

  function toggleTheme(): void {
    const newTheme = currentTheme;
    setCurrentTheme(currentTheme === "light" ? "dark" : "light");

    if (newTheme === "light") {
      localStorage.setItem("Theme", "dark");
    } else {
      localStorage.setItem("Theme", "light");
    }
  }

  useEffect(() => {
    const getTheme = localStorage.getItem("Theme");
    setCurrentTheme(getTheme === "dark" ? "dark" : "light");

    if (getTheme === "dark") {
      return document.body.classList.add("dark-mode");
    }

    return document.body.classList.remove("dark-mode");
  }, [currentTheme]);

  return (
    <ThemeContext.Provider value={{ currentTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
