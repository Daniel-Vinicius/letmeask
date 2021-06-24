import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

import { useTheme, useAuth, useRoom } from "../hooks";

import { database } from "../services/firebase";

import { closeImg, deleteImg, trashRedImg } from "../assets";

import {
  Logo,
  Question,
  RoomCode,
  ToggleThemeButton,
  Button,
  ModalRemove,
} from "../components";

import "../styles/room.scss";

type RoomParams = { id: string };

export function AdminRoom(): JSX.Element {
  const history = useHistory();
  const params = useParams<RoomParams>();
  const roomId = params.id;

  const { currentTheme } = useTheme();
  const { user } = useAuth();
  const { titleRoom, roomAuthorId, questions } = useRoom(roomId);
  const [modalRemoveQuestionOpen, setModalRemoveQuestionOpen] = useState("");
  const [modalRemoveRoomOpen, setModalRemoveRoomOpen] = useState(false);

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    });

    history.replace("/");
  }

  function handleRequestDeleteQuestion(questionId: string) {
    setModalRemoveQuestionOpen(questionId);
  }

  async function handleDeleteQuestion() {
    await database
      .ref(`rooms/${roomId}/questions/${modalRemoveQuestionOpen}`)
      .remove();
    setModalRemoveQuestionOpen("");
  }

  useEffect(() => {
    if (user?.id && roomAuthorId) {
      if (user?.id !== roomAuthorId) {
        history.replace(`/rooms/${roomId}`);
      }
    }

    if (!user?.id && roomAuthorId) {
      history.replace(`/rooms/${roomId}`);
    }
  }, [history, roomAuthorId, roomId, user]);

  return (
    <div id="page-room">
      <ModalRemove
        title="Excluir pergunta"
        description="Tem certeza que você deseja excluir esta pergunta?"
        buttonText="Sim, excluir"
        iconSrc={trashRedImg}
        isOpen={Boolean(modalRemoveQuestionOpen)}
        handleRemove={handleDeleteQuestion}
        setIsOpen={() =>
          setModalRemoveQuestionOpen(
            modalRemoveQuestionOpen ? "" : modalRemoveQuestionOpen
          )
        }
      />

      <ModalRemove
        title="Encerrar sala"
        description="Tem certeza que você deseja encerrar esta sala?"
        buttonText="Sim, encerrar"
        iconSrc={closeImg}
        isOpen={modalRemoveRoomOpen}
        handleRemove={handleEndRoom}
        setIsOpen={() => setModalRemoveRoomOpen(!modalRemoveRoomOpen)}
      />

      <header>
        <div className="content">
          <Logo />
          <div>
            <RoomCode code={roomId} />
            <Button isOutlined onClick={() => setModalRemoveRoomOpen(true)}>
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
                onClick={() => handleRequestDeleteQuestion(question.id)}
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
