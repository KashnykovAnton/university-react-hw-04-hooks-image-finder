import { useEffect } from "react";
import { createPortal } from "react-dom";

const modalRoot = document.querySelector("#modal-root");

const Modal = ({ onClose, largeImageURL }) => {
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  const handleKeyDown = (e) => {
    if (e.code === "Escape") {
      onClose();
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div className="Overlay" onClick={handleOverlayClick}>
      <div className="Modal">
        <img src={largeImageURL} alt={largeImageURL} />
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;
