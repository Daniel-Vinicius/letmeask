import { noQuestions } from "../../assets";
import "./styles.scss";

export function NoQuestionsAuthPage(): JSX.Element {
  return (
    <div className="no-questions">
      <img src={noQuestions} alt="" />
      <h3>Nenhuma pergunta por aqui...</h3>
      <span>
        Envie o código desta sala para seus amigos e comece a responder
        perguntas!
      </span>
    </div>
  );
}
