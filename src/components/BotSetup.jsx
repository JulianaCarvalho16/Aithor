import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function BotSetup() {
    const [styles, setStyles] = useState("");
    const [taste, setTaste] = useState("");
    const navegate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const botConfig = { styles, taste };
        localStorage.setItem("botConfig", JSON.stringify
            (botConfig));

            navegate("/chat");
    };

    return (
        <div className="container">
            <h3> Como você quer que seu chatbot se comport? </h3>
            <form onSubmit={handleSubmit}>
                <label> Escolha o estilo: </label>
                <select value={styles} onChange={(e) => setStyles(e.target.value)} required>
                    <option value=""> Select </option>
                    <option value="cute"> Fofo </option>
                    <option value="funny"> Engracado </option>
                    <option value="formal"> Formal </option>
                    <option value="serious"> Serio </option>
                    <option value="sarcastc"> Sarcastico </option>
                </select>
                <label>
                    Há mais alguma coisa que o bot deva saber? (opcional)
                </label>
                <input 
                    type="text"
                    value={taste}
                    onChange={(e) => setTaste(e.target.value)}
                    placeholder="Seus gostos, estilos e preferencias..." 
                />

                <button type="submit"> Iniciar Chat </button>
            </form>
        </div>
    );
}