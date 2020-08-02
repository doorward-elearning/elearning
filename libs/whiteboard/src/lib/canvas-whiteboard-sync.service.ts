import { Injectable, InjectionToken } from '@angular/core';
import { CanvasWhiteboardUpdate } from '@doorward/whiteboard/canvas-whiteboard-update.model';
import { CanvasWhiteboardService } from '@doorward/whiteboard/canvas-whiteboard.service';

export enum CanvasWhiteboardUpdateTypes {
  BATCH_UPDATE = 1,
  CLEAR_CANVAS = 2,
  UNDO = 3,
  REDO = 4,
  MOUSE_MOVE = 5,
}

export type CanvasWhiteboardSyncData =
  | {
      type: CanvasWhiteboardUpdateTypes.BATCH_UPDATE;
      batch: CanvasWhiteboardUpdate[];
      sender?: {
        name: string;
        id: string;
      };
    }
  | {
      type: CanvasWhiteboardUpdateTypes.CLEAR_CANVAS;
      sender?: {
        name: string;
        id: string;
      };
    }
  | {
      type: CanvasWhiteboardUpdateTypes.REDO | CanvasWhiteboardUpdateTypes.UNDO;
      updateUUID: string;
      sender?: {
        name: string;
        id: string;
      };
    }
  | {
      type: CanvasWhiteboardUpdateTypes.MOUSE_MOVE;
      update: CanvasWhiteboardUpdate;
      sender?: {
        name: string;
        id: string;
      };
    };

export const CANVAS_WHITEBOARD_SYNC_SERVICE = new InjectionToken<CanvasWhiteboardSyncService>(
  'Whiteboard Sync Service'
);

@Injectable()
export default abstract class CanvasWhiteboardSyncService {
  private canvasWhiteboardService: CanvasWhiteboardService;

  public abstract send(data: CanvasWhiteboardSyncData);

  public receive(data: CanvasWhiteboardSyncData) {
    this.onReceive(data);
  }

  public setWhiteboardService(whiteboardService: CanvasWhiteboardService) {
    this.canvasWhiteboardService = whiteboardService;
  }

  private onReceive(data: CanvasWhiteboardSyncData) {
    if (data.type === CanvasWhiteboardUpdateTypes.BATCH_UPDATE) {
      this.canvasWhiteboardService.drawCanvas(data.batch);
    } else if (data.type === CanvasWhiteboardUpdateTypes.CLEAR_CANVAS) {
      this.canvasWhiteboardService.clearCanvas();
    } else if (data.type === CanvasWhiteboardUpdateTypes.UNDO) {
      this.canvasWhiteboardService.undoCanvas(data.updateUUID);
    } else if (data.type === CanvasWhiteboardUpdateTypes.REDO) {
      this.canvasWhiteboardService.redoCanvas(data.updateUUID);
    } else if (data.type === CanvasWhiteboardUpdateTypes.MOUSE_MOVE) {
      this.canvasWhiteboardService.updatePosition(data.update, data.sender);
    }
  }
}
