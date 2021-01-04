import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

export type WebSocketContextType = {
  socket: SocketIOClient.Socket;
};

export const WebSocketContext = React.createContext<WebSocketContextType>({
  socket: null,
});

const WebSocket: React.FunctionComponent<WebSocketProps> = React.memo(
  (props): JSX.Element => {
    const [socket, setSocket] = useState();

    useEffect(() => {
      const socket = io(props.endpoint);
      socket.on('connect', () => {
        if (props.initialize) {
          props.initialize(socket);
        }
      });
      setSocket(socket);
    }, []);

    return <WebSocketContext.Provider value={{ socket }}>{socket && props.children(socket)}</WebSocketContext.Provider>;
  }
);

export interface WebSocketProps {
  endpoint: string;
  initialize?: (socket: SocketIOClient.Socket) => void;
  children: (socket: SocketIOClient.Socket) => JSX.Element;
}

export default WebSocket;
