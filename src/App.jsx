import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import BotSetup from "./components/BotSetup";
import Chat from "./components/Chat";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/setup" element={<BotSetup />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  );
}