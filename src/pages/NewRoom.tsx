import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { useAuth } from "../hooks/useAuth";

import illustrationImg from "../assets/images/illustration.svg";

import "../styles/auth.scss";

import { Button, Logo, FooterAuthPage } from "../components";

import { database } from "../services/firebase";

export function NewRoom(): JSX.Element {
  const { user } = useAuth();

  const [newRoom, setNewRoom] = useState("");

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    if (!user) {
      return;
    }

    if (newRoom.trim() === "") {
      toast.error("Digite o nome da sala!");
      return;
    }

    if (newRoom.length < 3) {
      toast.error("Mínimo de 3 caracteres!");
      return;
    }

    if (newRoom.length >= 20) {
      toast.error("Máximo de 20 caracteres!");
      return;
    }

    const roomRef = database.ref("rooms");

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user.id,
    });

    window.location.href = `/admin/rooms/${firebaseRoom.key}`;
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
          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Nome da sala"
              onChange={(event) => setNewRoom(event.target.value)}
              value={newRoom}
            />
            <Button type="submit">Criar sala</Button>
          </form>
          <p>
            Quer entrar em uma sala existente? <Link to="/">clique aqui</Link>
          </p>
          <FooterAuthPage />
        </div>
      </main>
    </div>
  );
}
