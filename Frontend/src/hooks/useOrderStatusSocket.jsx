import { useEffect, useState } from "react";
import { useSocket } from "../contexts/SocketContext";

export default function useOrderStatusSocket() {
  const socket = useSocket();
  const [lastUpdate, setLastUpdate] = useState(null);

  useEffect(() => {
    if (!socket) return;
    const handler = (order) => {
      setLastUpdate(order);
    };
    socket.on("order-status-update", handler);

    return () => {
      socket.off("order-status-update", handler);
    };
  }, [socket]);

  return lastUpdate;
}
