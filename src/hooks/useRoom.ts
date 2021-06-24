/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { database } from "../services/firebase";
import { useAuth } from "./useAuth";

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
    likes?: Record<
      string,
      {
        authorId: string;
      }
    >;
  }
>;

type QuestionType = {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  isHighlighted: boolean;
  wasAnswered: boolean;
  likeCount: number;
  likeId: string | null;
};

type UseRoomRetorn = {
  questions: QuestionType[];
  titleRoom: string;
  authorIdRoom?: string;
};

export function useRoom(roomId: string): UseRoomRetorn {
  const { user } = useAuth();
  const history = useHistory();
  const [titleRoom, setTitleRoom] = useState("");
  const [authorIdRoom, setAuthorIdRoom] = useState("");
  const [questions, setQuestions] = useState<QuestionType[]>([]);

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`);

    roomRef.on("value", (roomCallback) => {
      const room = roomCallback.val();

      try {
        const firebaseQuestions: FirebaseQuestions = room.questions ?? {};

        const parsedQuestions = Object.entries(firebaseQuestions).map(
          ([key, { author, content, isHighlighted, wasAnswered, likes }]) => {
            const likeEntrie = Object.entries(likes ?? {}).find(
              ([likeId, like]) => like.authorId === user?.id
            );

            const likeId = likeEntrie?.[0] ?? null;

            return {
              id: key,
              content,
              author,
              isHighlighted,
              wasAnswered,
              likeCount: Object.values(likes ?? {}).length,
              likeId,
            };
          }
        );

        setTitleRoom(room?.title);
        setAuthorIdRoom(room?.authorId);
        setQuestions(parsedQuestions);

        return () => {
          roomRef.off("value");
        };
      } catch (error) {
        history.replace("/");
      }
    });
  }, [history, roomId, user?.id]);

  return { questions, titleRoom, authorIdRoom };
}
