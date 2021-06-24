/* eslint-disable @typescript-eslint/no-explicit-any */
import "./styles.scss";

import { Modal } from "../Modal";
import { Button } from "../Button";

interface ModalRemoveProps {
  title: string;
  description: string;
  buttonText: string;
  iconSrc: string;
  isOpen: boolean;
  setIsOpen: () => void;
  handleRemove: (params?: any) => Promise<void>;
}

export function ModalRemove({
  title,
  description,
  buttonText,
  iconSrc,
  isOpen,
  setIsOpen,
  handleRemove,
}: ModalRemoveProps): JSX.Element {
  const handleRemoveCloseModal = async () => {
    handleRemove();
    setIsOpen();
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="modalRemove">
        <img
          src={iconSrc}
          alt="Círculo com a letra X dentro dele na cor vermelha"
          className="closeImg"
        />
        <h2>{title}</h2>
        <span className="description">{description}</span>

        <div className="buttons">
          <Button type="button" id="cancel" onClick={setIsOpen}>
            Cancelar
          </Button>

          <Button type="button" id="remove" onClick={handleRemoveCloseModal}>
            {buttonText}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
