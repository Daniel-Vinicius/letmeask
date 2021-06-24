import { useHistory } from "react-router-dom";
import logoImgLight from "../assets/images/logo.svg";
import logoImgDark from "../assets/images/logo-dark-mode.svg";

import { useTheme } from "../hooks/useTheme";

export function Logo(): JSX.Element {
  const { currentTheme } = useTheme();
  const history = useHistory();
  return (
    <img
      src={currentTheme === "dark" ? logoImgDark : logoImgLight}
      alt="Letmeask"
      onClick={() => history.push("/")}
      onKeyDown={() => history.push("/")}
      id="logo"
      role="presentation"
    />
  );
}
