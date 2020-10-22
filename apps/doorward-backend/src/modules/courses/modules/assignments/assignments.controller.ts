import { Body, Controller, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import ModelExists from '@doorward/backend/decorators/model.exists.decorator';
import ModuleItemEntity from '@doorward/common/entities/module.item.entity';
import JwtAuthGuard from '../../../auth/guards/jwt.auth.guard';
import PrivilegesGuard from '../../../../guards/privileges.guard';
import Privileges from '../../../../decorators/privileges.decorator';
import { CurrentUser } from '@doorward/backend/decorators/user.decorator';
import UserEntity from '@doorward/common/entities/user.entity';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AssignmentsService } from './assignments.service';
import { AssignmentSubmissionResponse } from '@doorward/common/dtos/response/module.items.responses';
import { SubmitAssignmentBody } from '@doorward/common/dtos/body';
import translate from '@doorward/common/lang/translate';

const AssignmentExists = () =>
  ModelExists({ key: 'assignmentId', model: ModuleItemEntity, message: translate.assignmentDoesNotExist() });

@Controller('assignments')
@ApiTags('assignments')
@UseGuards(JwtAuthGuard, PrivilegesGuard)
export class AssignmentsController {
  constructor(private assignmentService: AssignmentsService) {}

  @Post(':assignmentId/submit')
  @Privileges('assignments.submit')
  @AssignmentExists()
  @ApiResponse({ status: HttpStatus.CREATED, type: AssignmentSubmissionResponse })
  async submitAssignment(
    @Param('assignmentId') assignmentId: string,
    @Body() body: SubmitAssignmentBody,
    @CurrentUser() user: UserEntity
  ): Promise<AssignmentSubmissionResponse> {
    const submission = await this.assignmentService.submitAssignment(assignmentId, body, user);

    return {
      assignmentSubmission: submission,
    };
  }
}
