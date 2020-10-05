import { Injectable } from '@nestjs/common';
import DiscussionGroupRepository from '@doorward/backend/repositories/discussion.group.repository';
import DiscussionCommentRepository from '@doorward/backend/repositories/discussion.comment.repository';
import { CreateDiscussionGroupBody, PostDiscussionCommentBody } from '@doorward/common/dtos/body';
import UserEntity from '@doorward/common/entities/user.entity';
import ValidationException from '@doorward/backend/exceptions/validation.exception';

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

  public async createDiscussionGroup(courseId: string, body: CreateDiscussionGroupBody, currentUser: UserEntity) {
    const exists = await this.discussionGroupRepository.findByTitle(body.title, courseId);
    if (exists) {
      throw new ValidationException({ title: 'A {{discussionGroup}} with this title already exists.' });
    }
    return this.discussionGroupRepository.createAndSave({
      ...body,
      course: { id: courseId },
      creator: { id: currentUser.id },
    });
  }

  public async postComment(discussionGroupId: string, body: PostDiscussionCommentBody, currentUser: UserEntity) {
    return this.commentRepository.createAndSave({
      ...body,
      author: currentUser,
      discussionGroup: { id: discussionGroupId },
    });
  }

  public async getDiscussionGroup(id: string) {
    return this.discussionGroupRepository.getById(id);
  }
}
