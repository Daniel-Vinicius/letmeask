import { useEffect, useState } from "react";
import Toggle from "react-toggle";

import { useTheme } from "../../hooks";

import "./styles.scss";

export function ToggleThemeButton(): JSX.Element {
  const { currentTheme, toggleTheme } = useTheme();
  const [checked, setChecked] = useState(() => {
    return currentTheme === "dark";
  });

  useEffect(() => {
    setChecked(currentTheme !== "light");
  }, [checked, currentTheme]);

  return (
    <Toggle
      value={currentTheme}
      id="toggle-mode-button"
      color="#29292e"
      checked={checked}
      onChange={toggleTheme}
      icons={{
        checked: "🌜",
        unchecked: "🌞",
      }}
    />
  );
}
