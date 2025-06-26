import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Auth from "../services/firebase";
import ApiService from "../services/api";

export default function Chat() {
  const [mensagem, setMensagem] = useState("");
  const [conversa, setConversa] = useState([]);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  const botConfig = JSON.parse(localStorage.getItem("botConfig")) || {};

  useEffect(() => {
    const user = Auth.getCurrentUser();
    if (user) {
      setUserId(user.uid);
    } else {
      navigate("/");
    }
  }, [navigate]);

  const enviarMensagem = async (e) => {
    e.preventDefault();
    if (!mensagem.trim()) return;

    const mensagemAtual = mensagem;
    setConversa((prev) => [...prev, { remetente: "Você", texto: mensagemAtual }]);
    setMensagem("");

    try {
      const { resposta } = await ApiService.sendMessage(
        mensagemAtual,
        botConfig.styles,
        botConfig.taste
      );

      setConversa((prev) => [...prev, { remetente: "Bot", texto: resposta }]);

      await ApiService.saveConversation({
        userId,
        message: mensagemAtual,
        response: resposta,
        styles: botConfig.styles,
        taste: botConfig.taste
      });
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      setConversa((prev) => [
        ...prev,
        { remetente: "Bot", texto: "Erro ao se comunicar com o servidor." },
      ]);
    }
  };

  return (
    <div className="container">
      <h2>Chat com seu Bot</h2>
      <div className="chat-box">
        {conversa.map((msg, index) => (
          <div key={index}>
            <strong>{msg.remetente}:</strong> {msg.texto}
          </div>
        ))}
      </div>
      <form onSubmit={enviarMensagem}>
        <input
          type="text"
          value={mensagem}
          onChange={(e) => setMensagem(e.target.value)}
          placeholder="Digite sua mensagem..."
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}