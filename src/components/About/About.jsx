import "./About.css";

function About() {
  return (
    <section className="about" id="about">
      <div className="about__content">
        <h2 className="about__title">Sobre o autor</h2>
        <p className="about__text">
          Olá! Sou o Ricardo Tuttmann, brasileiro, professor e desenvolvedor
          web em formação no programa de Desenvolvimento Web da TripleTen. O
          Recipe Explorer é o meu projeto final.
        </p>
        <p className="about__text">
          Neste curso aprendi HTML, CSS, JavaScript, React, Node.js, Express,
          MongoDB e a publicar aplicações em servidores na nuvem. Este projeto
          usa React e a API pública TheMealDB.
        </p>
      </div>
    </section>
  );
}

export default About;
