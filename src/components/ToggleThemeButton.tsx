import Toggle from "react-toggle";
import { useTheme } from "../hooks/useTheme";

import "../styles/toggle-mode-button.scss";

export function ToggleThemeButton(): JSX.Element {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <Toggle
      onClick={toggleTheme}
      id="toggle-mode-button"
      color="#29292e"
      icons={{
        checked: darkMode ? "🌜" : "🌞",
        unchecked: darkMode ? "🌜" : "🌞",
      }}
    />
  );
}
