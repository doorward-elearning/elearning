import { TestBed } from '@angular/core/testing';

import { WhiteboardService } from './whiteboard.service';

describe('NgWhiteboardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WhiteboardService = TestBed.inject(WhiteboardService);
    expect(service).toBeTruthy();
  });
});
