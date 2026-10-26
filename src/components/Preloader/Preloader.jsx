import "./Preloader.css";

function Preloader({ text = "Procurando receitas..." }) {
  return (
    <div className="preloader" role="status">
      <i className="preloader__circle" />
      <p className="preloader__text">{text}</p>
    </div>
  );
}

export default Preloader;
