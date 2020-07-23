import { TestBed } from '@angular/core/testing';

import { WhiteboardCanvasService } from './whiteboard-canvas.service';

describe('NgWhiteboardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WhiteboardCanvasService = TestBed.inject(WhiteboardCanvasService);
    expect(service).toBeTruthy();
  });
});
