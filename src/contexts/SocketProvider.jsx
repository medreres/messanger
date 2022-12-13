import React, { useContext, useEffect, useState } from "react";
import io from "socket.io-client";

const SocketContext = React.createContext({});

export function useSocket() {
  return useContext(SocketContext);
}

const SocketProvider = ({ children, id }) => {
  const [socket, setSocket] = useState();

  useEffect(() => {
    const newSocket = io("192.168.31.11:5001", {
      withCredentials: true,
      query: {
        id,
      },
      transports: ["websocket"],
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [id]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
