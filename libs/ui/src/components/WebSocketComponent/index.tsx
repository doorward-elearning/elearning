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

  useEffect(() => {}, []);

  return <WebSocketContext.Provider value={{ socket }}>{props.children}</WebSocketContext.Provider>;
};

export interface WebSocketProps {
  endpoint: string;
}

export default WebSocket;
