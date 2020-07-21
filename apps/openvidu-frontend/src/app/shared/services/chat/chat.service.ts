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
import { UtilsService } from '../utils/utils.service';
import { SideNavComponents } from '../../../video-room/video-room.component';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  messagesObs: Observable<ChatMessage[]>;
  messagesUnreadObs: Observable<number>;

  private _messageList = new BehaviorSubject([]);

  private messageList: ChatMessage[] = [];
  private chatOpened = false;
  private messagesUnread = 0;
  private log: ILogger;

  private localUser: UserModel;

  private _messagesUnread = new BehaviorSubject(0);

  constructor(
    private loggerSrv: LoggerService,
    private oVSessionService: OpenViduSessionService,
    private remoteUsersService: RemoteUsersService,
    private notificationService: NotificationService,
    private signalsService: SignalsService,
    private utilsService: UtilsService
  ) {
    this.log = this.loggerSrv.get('ChatService');
    this.messagesObs = this._messageList.asObservable();
    this.messagesUnreadObs = this._messagesUnread.asObservable();
    this.oVSessionService.getUsers().subscribe(user => {
      this.localUser = user[0];
    });
    this.utilsService.sidenavContentObs.subscribe(open => {
      this.chatOpened = open === SideNavComponents.CHAT;
      if (this.chatOpened) {
        this.messagesUnread = 0;
        this._messagesUnread.next(this.messagesUnread);
      }
    });
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
        this.notificationService.newMessage(sender, message, this.toggleChat.bind(this));
      }
      this._messageList.next(this.messageList);
    });
  }

  sendMessage(message: string) {
    message = message.replace(/ +(?= )/g, '').trim();
    if (message !== '') {
      const sender = this.localUser.session.user;
      this.messageList.push({
        isLocal: true,
        nickname: sender.name,
        message,
        userAvatar: sender.avatar,
      });
      this._messageList.next(this.messageList);
      this.signalsService
        .send(SignalTypes.CHAT, {
          message,
          sender,
        })
        .then(() => {});
    }
  }

  toggleChat() {
    this.utilsService.toggleSideNav(SideNavComponents.CHAT);
  }

  private isChatOpened(): boolean {
    return this.chatOpened;
  }

  private addMessageUnread() {
    this.messagesUnread++;
    this._messagesUnread.next(this.messagesUnread);
  }
}
