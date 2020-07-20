import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ChatMessage } from '../../types/chat-type';
import { OpenViduSessionService } from '../openvidu-session/openvidu-session.service';
import { MatSidenav } from '@angular/material/sidenav';
import { RemoteUsersService } from '../remote-users/remote-users.service';
import { LoggerService } from '../logger/logger.service';
import { ILogger } from '../../types/logger-type';
import { NotificationService } from '../notifications/notification.service';
import { UserModel } from '../../models/user-model';
import { SignalsService } from '../signals/signals.service';
import SignalTypes from '@doorward/common/utils/meetingSignalTypes';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  messagesObs: Observable<ChatMessage[]>;
  messagesUnreadObs: Observable<number>;
  toggleChatObs: Observable<boolean>;

  private chatComponent: MatSidenav;

  private _messageList = <BehaviorSubject<ChatMessage[]>>new BehaviorSubject([]);
  private _toggleChat = <BehaviorSubject<boolean>>new BehaviorSubject(false);

  private messageList: ChatMessage[] = [];
  private chatOpened: boolean;
  private messagesUnread = 0;
  private log: ILogger;

  private localUser: UserModel;

  private _messagesUnread = <BehaviorSubject<number>>new BehaviorSubject(0);

  constructor(
    private loggerSrv: LoggerService,
    private oVSessionService: OpenViduSessionService,
    private remoteUsersService: RemoteUsersService,
    private notificationService: NotificationService,
    private signalsService: SignalsService
  ) {
    this.log = this.loggerSrv.get('ChatService');
    this.messagesObs = this._messageList.asObservable();
    this.toggleChatObs = this._toggleChat.asObservable();
    this.messagesUnreadObs = this._messagesUnread.asObservable();
    this.oVSessionService.getUsers().subscribe(user => {
      this.localUser = user[0];
    });
  }

  setChatComponent(chatSidenav: MatSidenav) {
    this.chatComponent = chatSidenav;
  }

  subscribeToChat() {
    this.signalsService.subscribe(SignalTypes.CHAT, ({ message, sender }, event) => {
      const connectionId = event.from.connectionId;
      const isMyOwnConnection = this.oVSessionService.isMyOwnConnection(connectionId);
      this.messageList.push({
        isLocal: isMyOwnConnection,
        nickname: sender.name,
        message,
        userAvatar: sender.avatar,
      });
      if (!this.isChatOpened()) {
        this.addMessageUnread();
        this.notificationService.newMessage(sender.name.toUpperCase(), this.toggleChat.bind(this));
      }
      this._messageList.next(this.messageList);
    });
  }

  sendMessage(message: string) {
    message = message.replace(/ +(?= )/g, '').trim();
    if (message !== '') {
      this.signalsService.send(SignalTypes.CHAT, {
        message,
        sender: this.localUser.session.user,
      });
    }
  }

  closeSideBar() {
    this.chatComponent.toggle();
  }

  toggleChat(open) {
    this.chatOpened = open;
    this._toggleChat.next(this.chatOpened);
    if (this.chatOpened) {
      this.messagesUnread = 0;
      this._messagesUnread.next(this.messagesUnread);
    }
  }

  private isChatOpened(): boolean {
    return this.chatOpened;
  }

  private addMessageUnread() {
    this.messagesUnread++;
    this._messagesUnread.next(this.messagesUnread);
  }
}
