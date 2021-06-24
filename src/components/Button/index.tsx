/* eslint-disable react/button-has-type */
import { ButtonHTMLAttributes } from "react";

import "./styles.scss";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  // eslint-disable-next-line react/require-default-props
  isOutlined?: boolean;
};

export function Button({
  isOutlined = false,
  ...props
}: ButtonProps): JSX.Element {
  return (
    <button className={`button ${isOutlined ? "outlined" : ""}`} {...props} />
  );
}
