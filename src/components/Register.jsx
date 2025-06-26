import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [erro, setErro] = useState("");
    const navegate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        if ( password !== confirmPassword ) {
            setErro("As senhas não coincidem.");
            return;
        }

        try {
            const response = await axios.post(
                `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${import.meta.env.VITE_FIREBASE_API_KEY}`,
                {
                    email,
                    password,
                    returnSecureToken: true,
                }
            );

            const token = response.data.idToken;
            localStorage.setItem("token", token);

            navegate("/setup")
        } catch (erro) {
            setErro("Erro ao registrar. Tente novamente!");
            console.error(erro);
        }
    };

    return (
        <div className="container">
            <h2> Register </h2>
            <form onSubmit={handleRegister}>
                <input 
                    type="email"
                    placeholder="Email"
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
                <input 
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button type="submit"> Register </button>
                {erro && <p style={{ color: "red" }}> {erro}</p>}
            </form>
            <p>
                Já tem conta? <a href="/"> Login </a>
            </p>
        </div>
    );
}