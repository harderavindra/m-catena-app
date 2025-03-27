import { useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

const API_URL = import.meta.env.VITE_BACKEND_URL; // Use environment variable

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { login, user } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setMessage("Email and password are required");
      return;
    }

    try {
        await login(email, password);
      console.log("Login Successful:", response.data);
      setMessage("Login successful!");
      // Store token if required (e.g., localStorage.setItem("token", response.data.token));
    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);
      setMessage(error.response?.data?.error || "Login failed. Try again.");
    }
  };

  return (
    <div>
      <h2>Login 2</h2>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default LoginPage;
