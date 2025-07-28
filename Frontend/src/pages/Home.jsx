import React from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";

// Animated gradient background
const GradientBg = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -2;
  background: radial-gradient(
      ellipse 80% 60% at 70% 10%,
      #95e3ff88 0%,
      transparent 70%
    ),
    radial-gradient(
      ellipse 70% 80% at 18% 72%,
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

// Floating SVG decorations
const Decorations = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: -1;

  .bubble {
    position: absolute;
    border-radius: 50%;
    opacity: 0.16;
    filter: blur(15px) brightness(1.18);
    animation: float 18s ease-in-out infinite alternate;
  }
  .bubble1 {
    width: 135px;
    height: 135px;
    left: 68vw;
    top: 13vh;
    background: #fff;
    animation-delay: 0.3s;
  }
  .bubble2 {
    width: 72px;
    height: 72px;
    left: 12vw;
    top: 82vh;
    background: #fff;
    animation-delay: 3.2s;
  }
  .bubble3 {
    width: 48px;
    height: 48px;
    left: 79vw;
    top: 59vh;
    background: #fff;
    opacity: 0.13;
    animation-delay: 6s;
  }
  @keyframes float {
    0% {
      transform: translateY(0) scale(1);
    }
    100% {
      transform: translateY(-20px) scale(1.08);
    }
  }
  .squiggle {
    position: absolute;
    width: 230px;
    left: 16vw;
    bottom: 14vh;
    opacity: 0.1;
    filter: blur(0.5px);
  }
`;

// This ensures *perfect centering* using flex on the full height.
const CenterWrapper = styled.div`
  min-height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center; // key centering
  position: relative;
  z-index: 1;
`;

const GlassCard = styled.div`
  padding: 3.2rem 2rem 2.7rem 2rem;
  background: rgba(255, 255, 255, 0.13);
  backdrop-filter: blur(23px) saturate(1.4);
  border-radius: 36px;
  border: 1.7px solid rgba(220, 220, 255, 0.14);
  box-shadow: 0 6px 48px 0 rgba(66, 133, 244, 0.095);
  max-width: 424px;
  min-width: 296px;
  width: 92vw;
  margin: 1.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  @media (max-width: 600px) {
    padding: 2.4rem 0.5rem 1.7rem 0.5rem;
    min-width: unset;
    max-width: 99vw;
    margin: 0.5em;
  }
`;

// Slightly bigger, fun, and bolder title
const Title = styled.h1`
  font-size: 2.65rem;
  font-weight: 900;
  background: linear-gradient(91deg, #70a1ff 8%, #2ed573 80%, #b874ee 100%);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
  line-height: 1.19;
  letter-spacing: 1.09px;
  margin-bottom: 0.45em;
  text-shadow: 0 1px 18px #62a1ff22;
`;

const Tagline = styled.p`
  font-size: 1.19rem;
  font-weight: 500;
  color: #e1e9fd;
  margin-bottom: 2em;
  margin-top: 0.12em;
  text-shadow: 0 2px 10px #3e436213;
  max-width: 370px;
  line-height: 1.57;
  letter-spacing: 0.07px;
`;

const Actions = styled.div`
  display: flex;
  gap: 1.08em;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-top: 0.9em;
`;

const StyledLink = styled(Link)`
  display: inline-block;
  min-width: 118px;
  font-size: 1.07rem;
  background: #fff;
  color: #5b60ec;
  padding: 0.68em 2em;
  border: none;
  border-radius: 2em;
  font-weight: 800;
  letter-spacing: 0.025em;
  margin: 0.18em 0;
  box-shadow: 0 2px 14px #6886e150;
  cursor: pointer;
  transition: background 0.18s, color 0.18s, box-shadow 0.2s, transform 0.16s;
  user-select: none;

  &:hover,
  &:focus {
    background: #6366f1;
    color: #fff;
    box-shadow: 0 5px 25px #6075ffad;
    transform: translateY(-1.5px) scale(1.045);
    text-decoration: none;
    outline: none;
  }
`;

const OrderLink = styled(StyledLink)`
  background: linear-gradient(111deg, #35eae7, #4ecdc4);
  color: #10222f;
  font-weight: 800;
  box-shadow: 0 2px 20px #35eae7c0;
  &:hover,
  &:focus {
    background: linear-gradient(104deg, #30e3ca 70%, #43e97b 100%);
    color: #283e39;
    box-shadow: 0 6px 28px #30e3ca90;
  }
`;

const HelperText = styled.p`
  font-size: 0.99rem;
  margin: 1.9em 0 0.6em 0;
  color: #fff;
  opacity: 0.74;
`;

// Modern, always visible, modest Footer
const Footer = styled.footer`
  text-align: center;
  color: #dbeaff;
  font-size: 1.01rem;
  position: fixed;
  left: 0;
  bottom: 13px;
  width: 100vw;
  z-index: 100;
  font-weight: 500;
  text-shadow: 0 2px 10px #515d948a;

  @media (max-width: 600px) {
    font-size: 0.89rem;
    bottom: 3px;
  }
`;

export default function Home() {
  return (
    <>
      <GradientBg />
      <Decorations>
        <div className="bubble bubble1" />
        <div className="bubble bubble2" />
        <div className="bubble bubble3" />
        <svg className="squiggle" viewBox="0 0 230 37" fill="none">
          <path
            d="M7 29Q43.5 2.5 67 20t38 0 38 12.5q19.5-16.5 48.5-.5t33-8.5"
            stroke="#fff"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Decorations>
      <CenterWrapper>
        <GlassCard>
          <Title>
            🚀 Welcome to
            <br />
            Orderly
          </Title>
          <Tagline>
            Effortlessly <b>manage</b>, <b>track</b> and <b>monitor</b> all your
            orders in one beautiful dashboard.
            <br />
            <span style={{ fontWeight: 400, fontSize: ".98em" }}>
              Log in or register to organize your day, or quickly{" "}
              <span style={{ color: "#00dbc2", fontWeight: 700 }}>
                track your order status
              </span>
              .
            </span>
          </Tagline>
          <Actions>
            <StyledLink to="/login">Login</StyledLink>
            <StyledLink to="/register">Register</StyledLink>
            <OrderLink to="/orders/lookup">Track Order</OrderLink>
          </Actions>
          <HelperText>
            Try Orderly now — <u>simple</u>, <u>modern</u> & <u>reliable</u>
          </HelperText>
        </GlassCard>
      </CenterWrapper>
      <Footer>
        Made with{" "}
        <span aria-label="love" style={{ color: "#4ecdc4" }}>
          ♥
        </span>{" "}
        by <b>Orderly Team</b>
        <span style={{ opacity: 0.6 }}>Empowering your workflow. Always.</span>
      </Footer>
    </>
  );
}
