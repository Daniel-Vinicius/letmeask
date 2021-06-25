/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

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
  roomAuthorId: string;
};

export function useRoom(roomId: string): UseRoomRetorn {
  const history = useHistory();

  const { user } = useAuth();

  const [roomAuthorId, setRoomAuthorId] = useState("");
  const [titleRoom, setTitleRoom] = useState("");
  const [questions, setQuestions] = useState<QuestionType[]>([]);

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`);

    roomRef.on("value", (roomCallback) => {
      const roomExist = roomCallback.exists();

      if (!roomExist) {
        toast.error("Sala não encontrada!");

        return history.replace("/");
      }

      const room = roomCallback.val();

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

      const questionsSortedPerAnswered = parsedQuestions.sort(
        (likeA, likeB) => {
          if (likeA.wasAnswered === likeB.wasAnswered) {
            return 0;
          }

          if (likeA.wasAnswered) {
            return 1;
          }

          return -1;
        }
      );

      const questionsSortedPerLikes = questionsSortedPerAnswered.sort(
        (likeA, likeB) => likeB.likeCount - likeA.likeCount
      );

      if (room.endedAt) {
        toast.error("Esta Sala já foi encerrada!");

        return history.replace("/");
      }

      setTitleRoom(room?.title);
      setRoomAuthorId(room?.authorId);
      setQuestions(questionsSortedPerLikes);

      return () => {
        roomRef.off("value");
      };
    });
  }, [history, roomAuthorId, roomId, user]);

  return { questions, titleRoom, roomAuthorId };
}
