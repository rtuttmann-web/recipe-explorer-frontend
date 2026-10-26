import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import About from "../About/About.jsx";
import "./Main.css";

function Main() {
  const location = useLocation();

  // rola até a seção indicada no endereço (ex.: /#about)
  useEffect(() => {
    if (location.hash) {
      const section = document.querySelector(location.hash);
      section?.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  return (
    <main className="main">
      <section className="hero">
        <h1 className="hero__title">Receitas do mundo inteiro</h1>
        <p className="hero__subtitle">
          Digite o nome de um prato e descubra receitas de vários países, com
          ingredientes, modo de preparo e vídeo.
        </p>
      </section>
      <About />
    </main>
  );
}

export default Main;
