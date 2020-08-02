import { CanvasWhiteboardUpdate } from './canvas-whiteboard-update.model';
import { Observable, Subject } from 'rxjs';

export interface CanvasBatchUpdate {
  batch: CanvasWhiteboardUpdate[];
  totalBatches: number;
  currentBatch: number;
}

export class CanvasWhiteboardService {
  private _canvasDrawSubject: Subject<CanvasBatchUpdate> = new Subject();
  canvasDrawSubject$: Observable<CanvasBatchUpdate> = this._canvasDrawSubject.asObservable();

  private _canvasClearSubject: Subject<any> = new Subject();
  canvasClearSubject$: Observable<any> = this._canvasClearSubject.asObservable();

  private _canvasUndoSubject: Subject<any> = new Subject();
  canvasUndoSubject$: Observable<any> = this._canvasUndoSubject.asObservable();

  private _canvasRedoSubject: Subject<any> = new Subject();
  canvasRedoSubject$: Observable<any> = this._canvasRedoSubject.asObservable();

  private _canvasPointerSubject: Subject<any> = new Subject<any>();
  canvasPointerSubject$: Observable<any> = this._canvasPointerSubject.asObservable();

  public drawCanvas(update: CanvasBatchUpdate): void {
    this._canvasDrawSubject.next(update);
  }

  public clearCanvas(): void {
    this._canvasClearSubject.next();
  }

  public undoCanvas(updateUUD: string): void {
    this._canvasUndoSubject.next(updateUUD);
  }

  public redoCanvas(updateUUD: string): void {
    this._canvasRedoSubject.next(updateUUD);
  }

  public updatePosition(update: CanvasWhiteboardUpdate, sender: { name: string; id: string }) {
    update.sender = sender;
    this._canvasPointerSubject.next(update);
  }
}
