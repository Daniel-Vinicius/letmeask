import { useContext } from "react";
import { ThemeContext, ThemeContextType } from "../contexts/ThemeContext";

export function useTheme(): ThemeContextType {
  return useContext(ThemeContext);
}
