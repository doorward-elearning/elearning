import { MessageBody, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway({ transports: ['websocket'] })
export default class ChatGateway {
  @SubscribeMessage('join')
  onEvent(@MessageBody() body: any) {
    console.log(body);
  }
}
