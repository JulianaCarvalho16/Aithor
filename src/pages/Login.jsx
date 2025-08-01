import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../services/api";
import "./Login.css";
import darkHeart from  "../assets/dark_heart.png";
import pinkHeart from "../assets/pink_heart.png"
import tearsJoy from "../assets/tears_joy.png";
import offierWorker from "../assets/officer_worker.png";
import menInSuit from "../assets/men_in_suit.png";
import rollinEyes from "../assets/rolling_eyes.png";

const temas = {
  fofo: { fundo: "#ffeef5", emoji: "💖", backImage: pinkHeart},
  engraçado: { fundo: "#fffbe6", emoji: "😂", backImage:tearsJoy },
  formal: { fundo: "#f0f4f8", emoji: "🧑‍💼", backImage:offierWorker },
  serio: { fundo: "#eeeeee", emoji: "🕴️", backImage:menInSuit },
  sarcastico: { fundo: "#fff5f5", emoji: "🙄" , backImage:rollinEyes},
};

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [theme, setTheme] = useState("light");
  const navigate = useNavigate();

  const estilo = localStorage.getItem("estilo") || "fofo";
  const temaSelecionado = temas[estilo];

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.body.classList.toggle("dark", savedTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const novoTema = theme === "light" ? "dark" : "light";
    setTheme(novoTema);
    localStorage.setItem("theme", novoTema);
    document.body.classList.toggle("dark", novoTema === "dark");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/login", { email, password });
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userName", res.data.name);
        navigate("/chat");
    } catch (err) {
      console.error("Erro ao fazer login:", err);
      alert("Erro ao fazer login. Verifique suas credenciais.");
    }
  };

  return (
    <div
  className={`login-wrapper ${theme}`}
  style={{
    backgroundColor: theme === "dark" ? "#1e1e1e" : temaSelecionado.fundo,
    color: theme === "dark" ? "#f9f9f9" : "#222",
    backgroundImage: theme === "dark"
      ? `url(${darkHeart})`
      : temaSelecionado.backImage
      ? `url(${temaSelecionado.backImage})`
      : "none",
  }}
>
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === "light" ? "🌙 Modo Escuro" : "🌞 Modo Claro"}
        </button>
      <div className="login-box">

        <h1 className="login-title">
          {temaSelecionado.emoji} Login
        </h1>

        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Entrar</button>
          <p>
            Não tem conta? <a href="/register">Registre-se</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;