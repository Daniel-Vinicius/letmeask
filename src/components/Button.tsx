/* eslint-disable react/button-has-type */
import { ButtonHTMLAttributes } from "react";

import "../styles/button.scss";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props: ButtonProps): JSX.Element {
  return <button className="button" {...props} />;
}
