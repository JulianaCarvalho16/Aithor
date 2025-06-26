import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [erro, setErro] = useState("");

    const heandleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${import.meta.env.VITE_FIREBASE_API_KEY}`,
                {
                    email,
                    password,
                    returnSecureToken: true
                }
            );
            const token = response.data.idToken;
            localStorage.setItem("token", token);

            navigate("/setup");
        } catch(erro) {
            setErro("Dados inválidos. Tente novamente!");
            console.error(erro)
        }
    };

    return (
        <div className="container">
            <h2> Login </h2>
            <form onSubmit={heandleLogin}>
                <input 
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required  
                />
                <input 
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit"> Login </button>
                {erro && <p style={{ color: "red" }}>{erro}</p>}
            </form>
            <p>
                Não tem conta? <a href="/register"> Register </a>
            </p>
        </div>
    );
}