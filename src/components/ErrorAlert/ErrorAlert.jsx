import "./ErrorAlert.css";

function ErrorAlert({ message, onClose }) {
  return (
    <div className="error-alert" role="alert">
      <p className="error-alert__text">{message}</p>
      {onClose && (
        <button
          className="error-alert__close"
          type="button"
          aria-label="Fechar aviso"
          onClick={onClose}
        />
      )}
    </div>
  );
}

export default ErrorAlert;
