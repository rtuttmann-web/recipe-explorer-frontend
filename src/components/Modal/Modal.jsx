import { useEffect } from "react";
import "./Modal.css";

function Modal({ isOpen, onClose, title, name, children }) {
  // fecha com a tecla Esc; o listener só existe enquanto o modal está aberto
  useEffect(() => {
    if (!isOpen) return undefined;

    function handleEscClose(evt) {
      if (evt.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleEscClose);
    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  // fecha ao clicar na sobreposição (fora da caixa do modal)
  function handleOverlayMouseDown(evt) {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  }

  return (
    <div
      className={`modal modal_type_${name}`}
      onMouseDown={handleOverlayMouseDown}
    >
      <div
        className="modal__container"
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <button
          className="modal__close"
          type="button"
          aria-label="Fechar"
          onClick={onClose}
        />
        {children}
      </div>
    </div>
  );
}

export default Modal;
