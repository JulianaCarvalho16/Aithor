import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../services/api";
import "./Register.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [estilo, setEstilo] = useState("");
  const [theme, setTheme] = useState("light");
  const navigate = useNavigate();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.body.classList.toggle("dark", savedTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.body.classList.toggle("dark", newTheme === "dark");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/auth/register", { name, email, password, estilo });
      localStorage.setItem("userName", name);
      localStorage.setItem("estilo", estilo);
      alert("Cadastro realizado! Faça login.");
      navigate("/login");
    } catch (err) {
      alert("Erro ao registrar");
    }
  };

  return (
    <div className={`register-wrapper ${theme}`}>
      <button className="theme-toggle" onClick={toggleTheme} type="button">
        {theme === "light" ? "🌙 Escuro" : "🌞 Claro"}
      </button>
      <div className="register-box">

        <h1 className="register-title">Cadastro</h1>
        <form onSubmit={handleSubmit} className="register-form">
          <input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="estilo">Qual estilo de bot você prefere?</label>
            <select
              id="estilo"
              value={estilo}
              onChange={(e) => setEstilo(e.target.value)}
              required
            >
              <option value=""> </option>
              <option value="fofo">Fofo</option>
              <option value="engraçado">Engraçado</option>
              <option value="formal">Formal</option>
              <option value="serio">Sério</option>
              <option value="sarcastico">Sarcastico</option>
            </select>
          <button type="submit">Cadastrar</button>
          <p>
            Já tem conta? <a href="/login">Faça login</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;