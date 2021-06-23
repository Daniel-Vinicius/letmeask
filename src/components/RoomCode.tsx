import { toast } from "react-toastify";

import copyImg from "../assets/images/copy.svg";
import "../styles/room-code.scss";

type RoomCodeProps = {
  code: string;
};

export function RoomCode({ code }: RoomCodeProps): JSX.Element {
  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(code);
    toast.success("Código da sala copiado");
  }

  return (
    <button
      className="room-code"
      type="button"
      onClick={copyRoomCodeToClipboard}
    >
      <div>
        <img src={copyImg} alt="Copy room code to clipboard" />
      </div>
      <span>#{code}</span>
    </button>
  );
}
