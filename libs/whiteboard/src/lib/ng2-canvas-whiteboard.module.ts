import { NgModule } from '@angular/core';
import { CanvasWhiteboardComponent } from './canvas-whiteboard.component';
import { CommonModule } from '@angular/common';
import { CanvasWhiteboardColorPickerComponent } from './canvas-whiteboard-colorpicker.component';
import { CanvasWhiteboardService } from './canvas-whiteboard.service';
import { CanvasWhiteboardShapeService } from './shapes/canvas-whiteboard-shape.service';
import { CanvasWhiteboardShapeSelectorComponent } from './shapes/canvas-whiteboard-shape-selector.component';
import { CanvasWhiteboardShapePreviewComponent } from './shapes/canvas-whiteboard-shape-preview.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  imports: [CommonModule, MatProgressSpinnerModule, MatProgressBarModule],
  declarations: [
    CanvasWhiteboardComponent,
    CanvasWhiteboardColorPickerComponent,
    CanvasWhiteboardShapeSelectorComponent,
    CanvasWhiteboardShapePreviewComponent,
  ],
  providers: [CanvasWhiteboardService, CanvasWhiteboardShapeService],
  exports: [CanvasWhiteboardComponent],
})
export class CanvasWhiteboardModule {}
