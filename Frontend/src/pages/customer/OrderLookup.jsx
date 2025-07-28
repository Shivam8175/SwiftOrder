import React, { useState } from "react";
import styled from "@emotion/styled";
import { getOrderById } from "../../api/order";
import OrderStatusBadge from "../../components/OrderStatusBadge";

const GradientBg = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -2;
  background: radial-gradient(
      ellipse 80% 60% at 70% 10%,
      #91dafd80 0%,
      transparent 100%
    ),
    radial-gradient(
      ellipse 70% 75% at 15% 75%,
      #a0a0ff 0,
      #c1b7ff 55%,
      transparent 100%
    ),
    linear-gradient(135deg, #6a7bd0, #8ac6d1);
  animation: bg-fade 15s ease-in-out infinite alternate;
  @keyframes bg-fade {
    0% {
      filter: brightness(1.1);
    }
    100% {
      filter: brightness(1);
    }
  }
`;

const CenterWrapper = styled.div`
  min-height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 4rem 1rem 3rem;
  box-sizing: border-box;
  z-index: 1;
`;

const GlassCard = styled.div`
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px) saturate(1.4);
  border-radius: 30px;
  border: 1.5px solid rgba(200, 200, 255, 0.3);
  box-shadow: 0 6px 48px 0 rgba(102, 123, 234, 0.27);
  width: 100%;
  max-width: 620px;
  padding: 2.8rem 3rem 3rem 3rem;
  color: #14324f;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;

  @media (max-width: 640px) {
    padding: 2rem 1.5rem 2.4rem 1.5rem;
  }
`;

const Title = styled.h2`
  font-weight: 900;
  font-size: 2.5rem;
  margin-bottom: 1.4rem;
  background: linear-gradient(95deg, #376bfd, #3cdae9, #ff7cc4);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  letter-spacing: 1.4px;
  text-align: center;
  user-select: none;
`;

const Form = styled.form`
  display: flex;
  gap: 0.8rem;
  margin-bottom: 24px;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const Input = styled.input`
  flex: 1;
  padding: 12px 14px;
  font-size: 1.12rem;
  border-radius: 0.5rem;
  border: 2px solid #b4c6ff66;
  background: rgba(255, 255, 255, 0.5);
  outline: none;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  font-weight: 600;
  color: #1c2b46;

  &:focus {
    border-color: #376bfd;
    box-shadow: 0 0 8px 2px #376bfd88;
    background: rgba(255, 255, 255, 0.85);
  }

  &::placeholder {
    font-weight: 400;
    color: #7a8bb4;
  }
`;

const Button = styled.button`
  padding: 12px 28px;
  border-radius: 0.65rem;
  border: none;
  background: linear-gradient(90deg, #376bfd, #3cdae9);
  color: white;
  font-weight: 800;
  font-size: 1.11rem;
  cursor: pointer;
  box-shadow: 0 3px 18px #3cdae9aa;
  transition: background 0.25s ease, transform 0.22s ease;
  user-select: none;

  &:hover,
  &:focus {
    background: linear-gradient(90deg, #3cdae9, #376bfd);
    transform: translateY(-2px) scale(1.05);
    outline: none;
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

const ErrorMsg = styled.div`
  color: #f44336;
  font-weight: 700;
  font-size: 1.05rem;
  margin-bottom: 1rem;
  user-select: none;
`;

const OrderDetails = styled.div`
  color: #102a45;
  font-weight: 600;
  user-select: none;

  p {
    margin: 0.4rem 0 1.1rem 0;
    font-size: 1.18rem;
    line-height: 1.3;
  }

  h3 {
    margin-top: 2.2rem;
    font-weight: 700;
    font-size: 1.45rem;
    color: #2a3a5c;
  }

  ul {
    padding-left: 1.3rem;
    margin-top: 0.9rem;
    list-style-type: disc;

    li {
      margin-bottom: 0.8rem;
      font-weight: 500;
      font-size: 1.12rem;
      color: #384967;
    }
  }
`;

export default function OrderLookup() {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");

  async function handleLookup(e) {
    e.preventDefault();
    setError("");
    setOrder(null);
    if (!orderId.trim()) {
      setError("Please enter an order ID.");
      return;
    }

    try {
      const data = await getOrderById(orderId.trim());
      setOrder(data);
    } catch {
      setError("Order not found");
    }
  }

  return (
    <>
      <GradientBg />
      <CenterWrapper>
        <GlassCard>
          <Title>Track Your Order</Title>
          <Form onSubmit={handleLookup} noValidate>
            <Input
              type="text"
              placeholder="Enter Order ID"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              required
              aria-label="Order ID"
              spellCheck="false"
              autoComplete="off"
            />
            <Button type="submit" aria-label="Lookup order">
              Lookup
            </Button>
          </Form>
          {error && <ErrorMsg role="alert">{error}</ErrorMsg>}
          {order && (
            <OrderDetails>
              <p>
                <strong>Status:</strong>{" "}
                <OrderStatusBadge status={order.status} />
              </p>
              <p>
                <strong>Customer:</strong> {order.customer?.name || "N/A"}
              </p>
              <p>
                <strong>Placed At:</strong>{" "}
                {order.timestamps?.placedAt
                  ? new Date(order.timestamps.placedAt).toLocaleString()
                  : "N/A"}
              </p>
              <h3>Order Items</h3>
              <ul>
                {order.items?.length > 0 ? (
                  order.items.map((item) => (
                    <li key={item._id}>
                      {item.product?.name || "Unknown product"} - Quantity:{" "}
                      {item.quantity} - Price: ${item.price.toFixed(2)}
                    </li>
                  ))
                ) : (
                  <li>No items found.</li>
                )}
              </ul>
            </OrderDetails>
          )}
        </GlassCard>
      </CenterWrapper>
    </>
  );
}
