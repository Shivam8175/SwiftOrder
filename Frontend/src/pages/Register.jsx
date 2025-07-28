import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { AuthContext } from "../contexts/AuthContext";
import { register } from "../api/auth";

// Background with smooth animated gradient
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
  animation: bgFade 12s infinite alternate ease-in-out;
  @keyframes bgFade {
    0% {
      filter: brightness(1.12);
    }
    100% {
      filter: brightness(1);
    }
  }
`;

// Flex center wrapper keeping content perfectly centered
const CenterWrapper = styled.div`
  min-height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 0;
  box-sizing: border-box;
  z-index: 1;
`;

// Glassmorphism card container
const GlassCard = styled.div`
  background: rgba(255, 255, 255, 0.18);
  backdrop-filter: blur(20px) saturate(1.2);
  border-radius: 30px;
  border: 1.5px solid rgba(210, 220, 255, 0.14);
  box-shadow: 0 8px 36px 0 rgba(80, 110, 244, 0.13);
  padding: 2.6rem 2.1rem 2.2rem 2.1rem;
  width: 94vw;
  max-width: 380px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem;

  @media (max-width: 500px) {
    width: 96vw;
    padding: 1.4rem 1rem 1.2rem 1rem;
    margin: 0.6rem;
  }
`;

// Heading styled with gradient text
const Title = styled.h2`
  font-weight: 800;
  font-size: 2.3rem;
  margin-bottom: 1.1em;
  margin-top: 0;
  background: linear-gradient(91deg, #70a1ff 20%, #3be4b6 82%, #b874ee 100%);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
  letter-spacing: 1.07px;
  text-align: center;
`;

// Form container
const StyledForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 0.2rem;
`;

// Input label styling
const Label = styled.label`
  font-weight: 500;
  color: #374bce;
  margin-bottom: 6px;
  margin-left: 4px;
  letter-spacing: 0.025em;
`;

// Styled input fields
const Input = styled.input`
  width: 100%;
  box-sizing: border-box;
  font-size: 1.05rem;
  padding: 11px 14px;
  margin-bottom: 18px;
  border: 1.5px solid #c4d6fc;
  background: rgba(255, 255, 255, 0.41);
  border-radius: 8px;
  font-weight: 500;
  outline: none;
  transition: border-color 0.18s, box-shadow 0.18s;

  &:focus {
    border-color: #6298fa;
    box-shadow: 0 1px 9px #3be4b629;
    background: rgba(255, 255, 255, 0.63);
  }
`;

// Submit button styling
const Button = styled.button`
  width: 100%;
  padding: 12px 0;
  background: linear-gradient(90deg, #6366f1, #32e2b2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  font-size: 1.09rem;
  letter-spacing: 0.025em;
  margin-top: 0.4em;
  box-shadow: 0 2px 15px #64faf034;
  transition: background 0.16s, box-shadow 0.18s, transform 0.15s;

  &:hover,
  &:focus {
    background: linear-gradient(100deg, #32e2b2 40%, #6366f1 98%);
    box-shadow: 0 5px 22px #17e4b484;
    transform: scale(1.03) translateY(-2.5px);
    outline: none;
  }
`;

// Styled error message
const ErrorMsg = styled.p`
  color: #fa4444;
  font-weight: 600;
  margin-top: 12px;
  font-size: 1rem;
  letter-spacing: 0.01em;
  text-align: center;
`;

export default function Register() {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { user, token } = await register(form);
      setUser(user);
      localStorage.setItem("token", token);
      navigate("/admin");
    } catch (err) {
      setError(err?.response?.data?.message || "Registration failed");
    }
  };

  return (
    <>
      <GradientBg />
      <CenterWrapper>
        <GlassCard>
          <Title>Create an Account</Title>
          <StyledForm onSubmit={handleSubmit} autoComplete="on">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              autoComplete="name"
              placeholder="John Doe"
              autoFocus
            />
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              autoComplete="email"
              placeholder="email@example.com"
            />
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
              autoComplete="new-password"
              placeholder="••••••••"
            />
            <Button type="submit">Register</Button>
            {error && <ErrorMsg>{error}</ErrorMsg>}
          </StyledForm>
        </GlassCard>
      </CenterWrapper>
    </>
  );
}
