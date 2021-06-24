import { useParams, useHistory } from "react-router-dom";

import { useTheme, useAuth, useRoom } from "../hooks";

import { database } from "../services/firebase";

import { deleteImg } from "../assets";

import {
  Logo,
  Question,
  RoomCode,
  ToggleThemeButton,
  Button,
} from "../components";

import "../styles/room.scss";

type RoomParams = { id: string };

export function AdminRoom(): JSX.Element {
  const history = useHistory();
  const params = useParams<RoomParams>();
  const roomId = params.id;

  const { currentTheme } = useTheme();
  const { user } = useAuth();
  const { titleRoom, questions } = useRoom(roomId);

  // useEffect(() => {
  //   if (authorIdRoom !== user?.id) {
  //     history.replace("/");
  //   }
  // }, [authorIdRoom, history, user?.id]);

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    });

    history.push("/");
  }

  async function handleDeleteQuestion(questionId: string) {
    // eslint-disable-next-line no-alert
    if (window.confirm("Tem certeza que você deseja excluir essa pergunta?")) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <Logo />
          <div>
            <RoomCode code={roomId} />
            <Button isOutlined onClick={handleEndRoom}>
              Encerrar Sala
            </Button>
          </div>
        </div>
      </header>
      <main>
        <div className="room-title">
          <h1 className={currentTheme === "dark" ? "dark" : ""}>{titleRoom}</h1>
          <span>{questions.length} pergunta(s)</span>
        </div>
        <div className="toggleThemeContainer">
          <ToggleThemeButton />
        </div>
        <div className="question-list">
          {questions.map((question) => (
            <Question
              content={question.content}
              userName={user?.name}
              author={question.author}
              key={question.id}
            >
              <button
                type="button"
                onClick={() => handleDeleteQuestion(question.id)}
              >
                <img src={deleteImg} alt="Remover pergunta" />
              </button>
            </Question>
          ))}
        </div>
      </main>
    </div>
  );
}
