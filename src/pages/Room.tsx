import { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";
import { useTheme } from "../hooks/useTheme";

import { database } from "../services/firebase";

import { Button } from "../components/Button";
import { ToggleThemeButton } from "../components/ToggleThemeButton";
import { Logo } from "../components/Logo";
import { RoomCode } from "../components/RoomCode";

import "../styles/room.scss";

type FirebaseQuestions = Record<
  string,
  {
    author: {
      name: string;
      avatar: string;
    };
    content: string;
    isHighlighted: boolean;
    wasAnswered: boolean;
  }
>;

type Question = {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  isHighlighted: boolean;
  wasAnswered: boolean;
};

type RoomParams = { id: string };

export function Room(): JSX.Element {
  const params = useParams<RoomParams>();
  const { user, signInWithGoogle } = useAuth();
  const { currentTheme } = useTheme();

  const [titleRoom, setTitleRoom] = useState("");
  const [newQuestion, setNewQuestion] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);

  const roomId = params.id;
  const buttonSendQuestionDisabled = !user || !newQuestion;

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`);

    roomRef.on("value", (roomCallback) => {
      const room = roomCallback.val();
      const firebaseQuestions: FirebaseQuestions = room.questions ?? {};

      const parsedQuestions = Object.entries(firebaseQuestions).map(
        ([key, { author, content, isHighlighted, wasAnswered }]) => {
          return {
            id: key,
            content,
            author,
            isHighlighted,
            wasAnswered,
          };
        }
      );

      setTitleRoom(room.title);
      setQuestions(parsedQuestions);
    });
  }, [roomId]);

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

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <Logo />
          <RoomCode code={roomId} />
        </div>
      </header>
      <main>
        <div className="room-title">
          <h1 className={currentTheme === "dark" ? "dark" : ""}>{titleRoom}</h1>
          <span>{questions.length} pergunta(s)</span>
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
                Para enviar uma pergunta,{" "}
                <button type="button" onClick={signInWithGoogle}>
                  faça seu login
                </button>
              </span>
            ) : (
              <div className="user-info">
                <img src={user.avatar} alt={`Foto de ${user.name}`} />
                <span className={currentTheme === "dark" ? "dark" : ""}>
                  {user.name}
                </span>
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
        {/* {JSON.stringify(questions)} */}
      </main>
    </div>
  );
}
