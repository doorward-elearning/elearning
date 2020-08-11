import { Injectable, InjectionToken } from '@angular/core';
import { CanvasWhiteboardUpdate } from '@doorward/whiteboard/canvas-whiteboard-update.model';
import { CanvasWhiteboardService } from '@doorward/whiteboard/canvas-whiteboard.service';
import { CanvasWhiteboardComponent } from '@doorward/whiteboard/canvas-whiteboard.component';

export enum CanvasWhiteboardUpdateTypes {
  BATCH_UPDATE = 1,
  CLEAR_CANVAS = 2,
  UNDO = 3,
  REDO = 4,
  MOUSE_MOVE = 5,
  SYNCHRONIZATION_REQUEST = 6,
}

export type CanvasWhiteboardSyncData =
  | {
      type: CanvasWhiteboardUpdateTypes.BATCH_UPDATE;
      batch: CanvasWhiteboardUpdate[];
      totalBatches: number;
      currentBatch: number;
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
    }
  | {
      type: CanvasWhiteboardUpdateTypes.SYNCHRONIZATION_REQUEST;
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
  private whiteboard: CanvasWhiteboardComponent;
  private MAX_BATCH_SIZE = 100;

  public abstract send(data: CanvasWhiteboardSyncData, to?: string);

  public receive(data: CanvasWhiteboardSyncData) {
    this.onReceive(data);
  }

  public setWhiteboardService(whiteboardService: CanvasWhiteboardService) {
    this.canvasWhiteboardService = whiteboardService;
  }

  public setWhiteboard(whiteboard: CanvasWhiteboardComponent) {
    this.whiteboard = whiteboard;
  }

  private onReceive(data: CanvasWhiteboardSyncData) {
    if (data.type === CanvasWhiteboardUpdateTypes.BATCH_UPDATE) {
      if (data.currentBatch === 0) {
        this.canvasWhiteboardService.clearCanvas();
      }
      this.canvasWhiteboardService.drawCanvas({
        currentBatch: data.currentBatch,
        totalBatches: data.totalBatches,
        batch: data.batch,
      });
    } else if (data.type === CanvasWhiteboardUpdateTypes.CLEAR_CANVAS) {
      this.canvasWhiteboardService.clearCanvas();
    } else if (data.type === CanvasWhiteboardUpdateTypes.UNDO) {
      this.canvasWhiteboardService.undoCanvas(data.updateUUID);
    } else if (data.type === CanvasWhiteboardUpdateTypes.REDO) {
      this.canvasWhiteboardService.redoCanvas(data.updateUUID);
    } else if (data.type === CanvasWhiteboardUpdateTypes.MOUSE_MOVE) {
      this.canvasWhiteboardService.updatePosition(data.update, data.sender);
    } else if (data.type === CanvasWhiteboardUpdateTypes.SYNCHRONIZATION_REQUEST) {
      this.sendBatch(this.whiteboard.cloneWhiteboard());
    }
  }

  public sendBatch(batch: CanvasWhiteboardUpdate[]) {
    const updates = batch.reduce((acc, update) => {
      const prevArray = acc[0];
      if (prevArray && prevArray.length < this.MAX_BATCH_SIZE) {
        prevArray.push(update);
      } else {
        acc.push([update]);
      }
      return acc;
    }, []);

    updates.forEach((update, index) => {
      setTimeout(() => {
        this.send({
          type: CanvasWhiteboardUpdateTypes.BATCH_UPDATE,
          totalBatches: updates.length,
          currentBatch: index + 1,
          batch: update,
        });
      }, 50);
    });
  }
}
