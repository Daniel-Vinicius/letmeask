import { ReactNode } from "react";
import "./styles.scss";

type QuestionProps = {
  // eslint-disable-next-line react/require-default-props
  children?: ReactNode;
  content: string;
  userName: string | undefined;
  author: {
    name: string;
    avatar: string;
  };
};

export function Question({
  children = null,
  content,
  author,
  userName = "",
}: QuestionProps): JSX.Element {
  return (
    <div className="question">
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
