/* eslint-disable react/require-default-props */
import { ReactNode } from "react";
import cx from "classnames";

import "./styles.scss";

type QuestionProps = {
  children?: ReactNode;
  content: string;
  userName?: string;
  author: {
    name: string;
    avatar: string;
  };
  wasAnswered?: boolean;
  isHighlighted?: boolean;
};

export function Question({
  content,
  author,
  children = null,
  userName = "",
  wasAnswered = false,
  isHighlighted = false,
}: QuestionProps): JSX.Element {
  return (
    <div
      className={cx(
        "question",
        { answered: wasAnswered },
        { highlighted: isHighlighted && !wasAnswered }
      )}
    >
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.name} />
          <span>
            {userName === author.name ? `Você | ${author.name}` : author.name}
          </span>
        </div>
        <div>{children}</div>
      </footer>
    </div>
  );
}
