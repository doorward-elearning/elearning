import { Test, TestingModule } from '@nestjs/testing';
import { DiscussionGroupsService } from './discussion-groups.service';

describe('DiscussionGroupsService', () => {
  let service: DiscussionGroupsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DiscussionGroupsService],
    }).compile();

    service = module.get<DiscussionGroupsService>(DiscussionGroupsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
