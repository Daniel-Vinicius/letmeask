import { FormEvent, useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";

import { useTheme, useAuth, useRoom } from "../hooks";

import { database } from "../services/firebase";

import {
  Button,
  Logo,
  Question,
  RoomCode,
  ToggleThemeButton,
  NoQuestionsAuthPage,
} from "../components";

import "../styles/room.scss";

type RoomParams = { id: string };

export function Room(): JSX.Element {
  const history = useHistory();
  const params = useParams<RoomParams>();
  const roomId = params.id;

  const { currentTheme } = useTheme();
  const { user, signInWithGoogle } = useAuth();
  const { titleRoom, questions, roomAuthorId } = useRoom(roomId);

  const [isAdm, setIsAdm] = useState(false);
  const [newQuestion, setNewQuestion] = useState("");
  const buttonSendQuestionDisabled = !user || !newQuestion.trim();

  async function handleSendQuestion(event: FormEvent): Promise<void> {
    event.preventDefault();

    if (newQuestion.trim() === "") {
      return;
    }

    if (!user) {
      throw new Error("You must be logged in");
    }

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar,
      },
      isHighlighted: false,
      wasAnswered: false,
    };

    await database.ref(`rooms/${roomId}/questions`).push(question);
    setNewQuestion("");
  }

  async function handleLikeQuestion(questionId: string, likeId: string | null) {
    if (likeId) {
      await database
        .ref(`rooms/${roomId}/questions/${questionId}/likes/${likeId}`)
        .remove();
    } else {
      await database.ref(`rooms/${roomId}/questions/${questionId}/likes`).push({
        authorId: user?.id,
      });
    }
  }

  useEffect(() => {
    if (user?.id && roomAuthorId) {
      if (user.id === roomAuthorId) {
        setIsAdm(true);
      }
    }
  }, [history, roomAuthorId, roomId, user]);

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <Logo />
          <div>
            <RoomCode code={roomId} />
            {!isAdm && (
              <Button
                data-cy="exit-room"
                type="button"
                onClick={() => history.push("/")}
              >
                Sair da sala
              </Button>
            )}
            {isAdm && (
              <Link className="see-how-mobile" to={`/admin/rooms/${roomId}`}>
                Ver como administrador
              </Link>
            )}
          </div>
        </div>
      </header>
      <main>
        <div className="room-title">
          <div>
            <h1 className={currentTheme === "dark" ? "dark" : ""}>
              {titleRoom}
            </h1>
            <span>{questions.length} pergunta(s)</span>
          </div>

          {isAdm && (
            <Link className="see-how" to={`/admin/rooms/${roomId}`}>
              Ver como administrador
            </Link>
          )}
        </div>
        <form onSubmit={handleSendQuestion}>
          <textarea
            placeholder="O que você quer perguntar?"
            value={newQuestion}
            onChange={(event) => setNewQuestion(event.target.value)}
          />

          <div className="form-footer">
            {!user ? (
              <span>
                Para enviar uma pergunta ou dar likes,{" "}
                <button type="button" onClick={signInWithGoogle}>
                  faça seu login
                </button>
              </span>
            ) : (
              <div className="user-info">
                <img src={user.avatar} alt={`Foto de ${user.name}`} />
                <span>{user.name}</span>
              </div>
            )}
            <Button
              id="send-question"
              type="submit"
              disabled={buttonSendQuestionDisabled}
            >
              Enviar pergunta
            </Button>
          </div>
        </form>
        <div className="toggleThemeContainer">
          <ToggleThemeButton />
        </div>
        <div className="question-list">
          {questions.length >= 1 ? (
            questions.map((question) => (
              <Question
                content={question.content}
                userName={user?.name}
                author={question.author}
                isHighlighted={question.isHighlighted}
                wasAnswered={question.wasAnswered}
                key={question.id}
              >
                {!question.wasAnswered ? (
                  <button
                    className={`like-button ${question.likeId ? "liked" : ""}`}
                    type="button"
                    aria-label="Marcar como gostei"
                    disabled={!user}
                    onClick={() =>
                      handleLikeQuestion(question.id, question.likeId)
                    }
                  >
                    {question.likeCount > 0 && (
                      <span>{question.likeCount}</span>
                    )}
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V13C2 12.4696 2.21071 11.9609 2.58579 11.5858C2.96086 11.2107 3.46957 11 4 11H7M14 9V5C14 4.20435 13.6839 3.44129 13.1213 2.87868C12.5587 2.31607 11.7956 2 11 2L7 11V22H18.28C18.7623 22.0055 19.2304 21.8364 19.5979 21.524C19.9654 21.2116 20.2077 20.7769 20.28 20.3L21.66 11.3C21.7035 11.0134 21.6842 10.7207 21.6033 10.4423C21.5225 10.1638 21.3821 9.90629 21.1919 9.68751C21.0016 9.46873 20.7661 9.29393 20.5016 9.17522C20.2371 9.0565 19.9499 8.99672 19.66 9H14Z"
                        stroke="#737380"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                ) : (
                  <button type="button" className="counterLikesAdm">
                    <span>{question.likeCount} like(s)</span>
                  </button>
                )}
              </Question>
            ))
          ) : (
            <NoQuestionsAuthPage />
          )}
        </div>
      </main>
    </div>
  );
}
