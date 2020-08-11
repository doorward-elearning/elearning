import { Injectable } from '@angular/core';
import CanvasWhiteboardSyncService, {
  CanvasWhiteboardSyncData,
} from '@doorward/whiteboard/canvas-whiteboard-sync.service';
import { SignalsService } from '../signals/signals.service';
import SignalTypes from '@doorward/common/utils/meetingSignalTypes';
import { OpenViduSessionService } from '../openvidu-session/openvidu-session.service';
import { RemoteUsersService } from '../remote-users/remote-users.service';

@Injectable()
export class WhiteboardSyncService extends CanvasWhiteboardSyncService {
  constructor(
    private signalService: SignalsService,
    private openviduSessionService: OpenViduSessionService,
    private remoteUsersService: RemoteUsersService
  ) {
    super();
  }

  public subscribeToUpdates() {
    this.signalService.subscribe(SignalTypes.WHITEBOARD_UPDATE, this.receive.bind(this));
  }

  send(data: CanvasWhiteboardSyncData, to?: string) {
    const recipients = to && [this.remoteUsersService.getRemoteUserByUserId(to)];
    this.signalService.send(
      SignalTypes.WHITEBOARD_UPDATE,
      {
        ...data,
        sender: {
          name: this.openviduSessionService.getUser()?.getNickname(),
          id: this.openviduSessionService.getUser()?.getUserId(),
        },
      },
      recipients
    );
  }
}
