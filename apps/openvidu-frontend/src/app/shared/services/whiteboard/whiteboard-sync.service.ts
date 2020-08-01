import { Injectable } from '@angular/core';
import CanvasWhiteboardSyncService, {
  CanvasWhiteboardSyncData,
} from '@doorward/whiteboard/canvas-whiteboard-sync.service';
import { SignalsService } from '../signals/signals.service';
import SignalTypes from '@doorward/common/utils/meetingSignalTypes';

@Injectable()
export class WhiteboardSyncService extends CanvasWhiteboardSyncService {
  constructor(private signalService: SignalsService) {
    super();
  }

  public subscribeToUpdates() {
    this.signalService.subscribe(SignalTypes.WHITEBOARD_UPDATE, this.receive.bind(this));
  }

  send(data: CanvasWhiteboardSyncData) {
    this.signalService.send(SignalTypes.WHITEBOARD_UPDATE, data);
  }
}
