import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

export type WebSocketContextType = {
  socket: SocketIOClient.Socket;
};

export const WebSocketContext = React.createContext<WebSocketContextType>({
  socket: null,
});

const WebSocket: React.FunctionComponent<WebSocketProps> = (props): JSX.Element => {
  const [socket] = useState(io(props.endpoint));

  useEffect(() => {
    socket.on('connect', () => {
      if (props.initialize) {
        props.initialize(socket);
      }
    });
  }, []);

  return <WebSocketContext.Provider value={{ socket }}>{props.children(socket)}</WebSocketContext.Provider>;
};

export interface WebSocketProps {
  endpoint: string;
  initialize?: (socket: SocketIOClient.Socket) => void;
  children: (socket: SocketIOClient.Socket) => JSX.Element;
}

export default WebSocket;
