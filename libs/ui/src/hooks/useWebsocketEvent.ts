import { useContext, useEffect } from 'react';
import { WebSocketContext } from '@doorward/ui/components/WebSocketComponent';

export type WebsocketEventResponse = {
  event: string;
  data: any;
};

const useWebsocketEvent = <T = any>(
  event: string,
  callback: (data: T) => WebsocketEventResponse | void | Array<WebsocketEventResponse>,
  deps?: Array<any>
) => {
  const { socket } = useContext(WebSocketContext);

  useEffect(() => {
    const listener = (data) => {
      const response = callback(data);

      if (response) {
        if (response instanceof Array) {
          response.forEach((res) => socket.emit(res.event, res.data));
        } else {
          socket.emit(response.event, response.data);
        }
      }
    };
    const emitter = socket.once(event, listener);

    return () => emitter.removeListener(event, listener);
  }, [socket, ...(deps || [])]);
};

export default useWebsocketEvent;
