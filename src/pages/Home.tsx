import { FormEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import { illustrationImg, googleIconImg } from "../assets";

import "../styles/auth.scss";

import { Button } from "../components/Button";
import { Logo } from "../components/Logo";
import { ToggleThemeButton } from "../components/ToggleThemeButton";

import { useAuth } from "../hooks/useAuth";

import { database } from "../services/firebase";

export function Home(): JSX.Element {
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();

  const [roomCode, setRoomCode] = useState("");

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle();
    }

    history.push("/rooms/new");
  }

  async function handleJoinRoom(event: FormEvent): Promise<void> {
    event.preventDefault();

    if (roomCode.trim() === "") {
      toast.error("Digite o código da sala!");
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      toast.error("Sala não encontrada!");
      return;
    }

    if (roomRef.val().endedAt) {
      toast.error("A sala já foi encerrada pelo administrador!");
      return;
    }

    history.push(`/rooms/${roomCode}`);
  }

  return (
    <div id="page-auth">
      <aside>
        <img
          src={illustrationImg}
          alt="Ilustração simbolizando perguntas e respostas"
        />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>
      <main>
        <div className="main-content">
          <Logo />
          <button
            className="create-room"
            type="button"
            onClick={handleCreateRoom}
          >
            <img src={googleIconImg} alt="Logo do Google" />
            Crie sua sala com o Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              value={roomCode}
              onChange={(event) => setRoomCode(event.target.value)}
            />
            <Button type="submit">Entrar na sala</Button>
          </form>
          <div className="toggleThemeContainer">
            <ToggleThemeButton />
          </div>
        </div>
      </main>
    </div>
  );
}
