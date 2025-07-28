import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { AuthContext } from "../contexts/AuthContext";
import { login } from "../api/auth";

// Animated gradient background
const GradientBg = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -2;
  background: radial-gradient(
      ellipse 85% 60% at 68% 13%,
      #95e3ff99 0%,
      transparent 70%
    ),
    radial-gradient(
      ellipse 72% 78% at 20% 68%,
      #a18cd1 0,
      #fbc2eb 55%,
      transparent 100%
    ),
    linear-gradient(120deg, #6366f1 0%, #70a1ff 50%, #2ed573 100%);
  animation: bgFade 10s infinite alternate;
  @keyframes bgFade {
    0% {
      filter: brightness(1.12);
    }
    100% {
      filter: brightness(1);
    }
  }
`;

// Center everything using flexbox
const CenterWrapper = styled.div`
  min-height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  box-sizing: border-box;
  padding: 2vw 0;
`;

// Glassmorphism login card
const GlassCard = styled.div`
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(20px) saturate(1.2);
  border-radius: 30px;
  border: 1.5px solid rgba(210, 220, 255, 0.14);
  box-shadow: 0 8px 36px 0 rgba(80, 110, 244, 0.13);
  padding: 2.6rem 2.1rem 2.2rem 2.1rem;
  width: 94vw;
  max-width: 360px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem;
  @media (max-width: 500px) {
    padding: 1.15rem 0.4rem 0.7rem 0.4rem;
    max-width: 99vw;
  }
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 800;
  font-size: 2.2rem;
  margin-bottom: 0.9em;
  margin-top: 0.2em;
  background: linear-gradient(91deg, #70a1ff 20%, #3be4b6 82%, #b874ee 100%);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
  letter-spacing: 1.07px;
`;

const StyledForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 0.5rem;
`;

const Label = styled.label`
  font-weight: 500;
  color: #374bce;
  margin-bottom: 6px;
  margin-left: 4px;
  letter-spacing: 0.025em;
`;

const Input = styled.input`
  width: 100%;
  box-sizing: border-box;
  font-size: 1.04rem;
  padding: 11px 13px;
  margin-bottom: 18px;
  border: 1.5px solid #c4d6fc;
  background: rgba(255, 255, 255, 0.41);
  border-radius: 8px;
  font-weight: 500;
  outline: none;
  transition: border-color 0.17s, box-shadow 0.18s;
  &:focus {
    border-color: #6298fa;
    box-shadow: 0 1px 8px #3be4b629;
    background: rgba(255, 255, 255, 0.63);
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 12px 0;
  background: linear-gradient(90deg, #6366f1, #32e2b2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  font-size: 1.08rem;
  letter-spacing: 0.021em;
  margin-top: 0.5em;
  box-shadow: 0 2px 15px #64faf034;
  transition: background 0.16s, box-shadow 0.15s, transform 0.14s;
  &:hover,
  &:focus {
    background: linear-gradient(100deg, #32e2b2 40%, #6366f1 98%);
    box-shadow: 0 4px 22px #17e4b484;
    transform: scale(1.03) translateY(-2.5px);
  }
`;

const ErrorMsg = styled.p`
  color: #fa4444;
  font-weight: 600;
  text-align: center;
  margin-top: 8px;
  font-size: 1rem;
  letter-spacing: 0.01em;
`;

export default function Login() {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { user, token } = await login(form);
      setUser(user);
      localStorage.setItem("token", token);
      navigate("/admin");
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
      <GradientBg />
      <CenterWrapper>
        <GlassCard>
          <Title>Login</Title>
          <StyledForm onSubmit={handleSubmit} autoComplete="on">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              autoFocus
              autoComplete="email"
              placeholder="Enter your email"
            />
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
              placeholder="••••••••"
            />
            <Button type="submit">Login</Button>
            {error && <ErrorMsg>{error}</ErrorMsg>}
          </StyledForm>
        </GlassCard>
      </CenterWrapper>
    </>
  );
}
