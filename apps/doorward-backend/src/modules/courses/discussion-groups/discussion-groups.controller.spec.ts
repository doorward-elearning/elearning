import { Test, TestingModule } from '@nestjs/testing';
import { DiscussionGroupsController } from './discussion-groups.controller';

describe('DiscussionGroups Controller', () => {
  let controller: DiscussionGroupsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DiscussionGroupsController],
    }).compile();

    controller = module.get<DiscussionGroupsController>(DiscussionGroupsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
