import ReactModal, { Props } from "react-modal";

interface ModalProps extends Props {
  isOpen: boolean;
  setIsOpen: () => void;
  children: React.ReactNode;
}

function Modal({ isOpen, setIsOpen, children }: ModalProps): JSX.Element {
  return (
    <ReactModal
      shouldCloseOnOverlayClick={!false}
      onRequestClose={setIsOpen}
      isOpen={isOpen}
      ariaHideApp={false}
      style={{
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "var(--white-background)",
          width: "90%",
          maxWidth: "31.25rem",
          minWidth: "21.875rem",
        },
        overlay: {
          backgroundColor: "var(--shadow)",
        },
      }}
    >
      {children}
    </ReactModal>
  );
}

export { Modal };
