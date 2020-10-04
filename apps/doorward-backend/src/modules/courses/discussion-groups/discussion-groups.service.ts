import { Injectable } from '@nestjs/common';
import DiscussionGroupRepository from '@doorward/backend/repositories/discussion.group.repository';
import DiscussionCommentRepository from '@doorward/backend/repositories/discussion.comment.repository';

@Injectable()
export class DiscussionGroupsService {
  constructor(
    private discussionGroupRepository: DiscussionGroupRepository,
    private commentRepository: DiscussionCommentRepository
  ) {}

  public async getAll(courseId: string) {
    return this.discussionGroupRepository.find({
      where: {
        course: { id: courseId },
      },
    });
  }
}
