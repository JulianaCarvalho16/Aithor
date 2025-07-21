import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../services/api";
import "./Chat.css";

const temas = {
  fofo: {
    fundo: "#ffeef5",
    userBg: "#ffc0cb",
    botBg: "#f8bbd0",
    navbar: "#ffc0cb",
    emoji: "💖",
  },
  engraçado: {
    fundo: "#fffbe6",
    userBg: "#fdd835",
    botBg: "#ffe082",
    navbar: "#fdd835",
    emoji: "😂",
  },
  formal: {
    fundo: "#f0f4f8",
    userBg: "#90be6d",
    botBg: "#c9d8c5",
    navbar: "#90be6d",
    emoji: "🧑‍💼",
  },
  serio: {
    fundo: "#eeeeee",
    userBg: "#9e9e9e",
    botBg: "#cfcfcf",
    navbar: "#757575",
    emoji: "🕴️",
  },
  sarcastico: {
    fundo: "#fff5f5",
    userBg: "#f94144",
    botBg: "#ffaaaa",
    navbar: "#f94144",
    emoji: "🙄",
  },
};

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const theme = localStorage.getItem("theme") || "light";
  const userName = localStorage.getItem("userName") || "usuário";
  const estilo = localStorage.getItem("style") || "fofo";
  const tema = temas[estilo];

  const getGreetingByStyle = (name, style) => {
    switch (style) {
      case "fofo":
        return `Oi oi, ${name}! Que alegria te ver aqui 🥰 Vamos conversar?`;
      case "engraçado":
        return `E aí, ${name}? Preparado(a) pra dar risada com esse bot? 😂`;
      case "formal":
        return `Olá, ${name}. Estou à disposição para ajudá-lo(a).`;
      case "serio":
        return `Olá, ${name}. Vamos direto ao ponto.`;
      case "sarcastico":
        return `Nossa, ${name}... mais um humano querendo respostas. Vamos lá 🙃`;
      default:
        return `Olá, ${name}! Vamos bater um papo.`;
    }
  };

  useEffect(() => {
    const greetingMessage = {
      role: "assistant",
      content: getGreetingByStyle(userName, estilo)
    };
    setMessages([greetingMessage]); 

    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/chat/history", {
          headers: { Authorization: `Bearer ${token}` }
        });

        const messagesFromDB = res.data.flatMap(conv => conv.messages);
        setMessages((prev) => [...prev, ...messagesFromDB]);
      } catch (err) {
        console.error("Erro ao buscar histórico:", err.message);
      }
    };

    fetchMessages();
  }, []);

  const handleEstiloChange = async (novoEstilo) => {
    localStorage.setItem("style", novoEstilo);
    setEstilo(novoEstilo);
    try {
      const token = localStorage.getItem("token");

      await axios.put("/auth/style", { style: novoEstilo }, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (err) {
      console.error("Erro ao atualizar estilo no banco:", err.message);
    }

    window.location.reload();
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    navigate("/login");
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post("/chat/message", { message: input }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      const botMessage = { role: "assistant", content: res.data.reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      alert("Erro ao enviar mensagem");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-wrapper">
      <div
        className="chat-header"
        style={{
          backgroundColor: theme === "dark" ? "#1e1e1e" : tema.navbar,
          color: theme === "dark" ? "#f1f1f1" : "#000",
        }}
      >
        <span className="chat-welcome">
          {tema.emoji} Bem-vindo, {userName}!
        </span>

        <div className="chat-controls">
          <label htmlFor="estilo-select">Estilo:</label>
          <select
            id="estilo-select"
            value={estilo}
            onChange={(e) => handleEstiloChange(e.target.value)}
            className="style-select"
          >
            <option value="fofo">Fofo</option>
            <option value="engraçado">Engraçado</option>
            <option value="formal">Formal</option>
            <option value="serio">Sério</option>
            <option value="sarcastico">Sarcastico</option>
          </select>

          <button onClick={logout} className="logout-btn">Sair</button>
        </div>
      </div>

      <div
        className="chat-messages"
        style={{
          backgroundColor: theme === "dark" ? "#1e1e1e" : tema.fundo,
          color: theme === "dark" ? "#f9f9f9" : "#222",
        }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className="chat-message"
            style={{
              backgroundColor: msg.role === "user" ? tema.userBg : tema.botBg,
              color: "#000",
              alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
              textAlign: msg.role === "user" ? "right" : "left",
            }}
          >
            {msg.content}
          </div>
        ))}

        {loading && (
          <div className="chat-message loading" style={{ backgroundColor: tema.botBg }}>
            Escrevendo...
          </div>
        )}
      </div>

      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Digite sua mensagem..."
        />
        <button onClick={sendMessage}>Enviar</button>
      </div>
    </div>
  );
}

export default Chat;