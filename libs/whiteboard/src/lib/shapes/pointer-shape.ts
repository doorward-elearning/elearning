import { CanvasWhiteboardShape } from '@doorward/whiteboard/shapes/canvas-whiteboard-shape';
import { CanvasWhiteboardPoint } from '@doorward/whiteboard/canvas-whiteboard-point';
import { CanvasWhiteboardShapeOptions } from '@doorward/whiteboard/shapes/canvas-whiteboard-shape-options';
import { CanvasWhiteboardUpdate } from '@doorward/whiteboard/canvas-whiteboard-update.model';
import pencil from '../../assets/cursors/pencil';

const pointer = 'data:image/svg+xml;base64,' + btoa(pencil);

export class PointerShape extends CanvasWhiteboardShape {
  currentPosition: CanvasWhiteboardPoint;
  image = new Image();
  size = 20;
  imageReady = false;

  constructor(positionPoint?: CanvasWhiteboardPoint, options?: CanvasWhiteboardShapeOptions) {
    super(positionPoint, options);
    this.currentPosition = positionPoint;
    this.image.src = pointer;
    this.image.onload = () => {
      this.imageReady = true;
    };
  }

  draw(context: CanvasRenderingContext2D) {
    if (this.imageReady) {
      context.drawImage(this.image, this.currentPosition.x, this.currentPosition.y - this.size, this.size, this.size);
    }
  }

  drawPreview(context: CanvasRenderingContext2D) {
    this.currentPosition = new CanvasWhiteboardPoint(context.canvas.width / 2, context.canvas.height / 2);
    this.draw(context);
  }

  getShapeName(): string {
    return 'Pointer';
  }

  onUpdateReceived(update: CanvasWhiteboardUpdate) {
    this.currentPosition = update;
  }
}
