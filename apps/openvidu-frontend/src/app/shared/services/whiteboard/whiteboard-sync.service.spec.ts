import { TestBed } from '@angular/core/testing';

import { WhiteboardSyncService } from './whiteboard-sync.service';

describe('WhiteboardSyncService', () => {
  let service: WhiteboardSyncService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WhiteboardSyncService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
