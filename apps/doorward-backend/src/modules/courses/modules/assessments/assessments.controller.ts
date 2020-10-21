import { Body, Controller, Get, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import JwtAuthGuard from '../../../auth/guards/jwt.auth.guard';
import PrivilegesGuard from '../../../../guards/privileges.guard';
import Privileges from '../../../../decorators/privileges.decorator';
import { AssessmentSubmissionResponse } from '@doorward/common/dtos/response/assessment.responses';
import { SaveAssessmentBody } from '@doorward/common/dtos/body';
import { CurrentUser } from '@doorward/backend/decorators/user.decorator';
import UserEntity from '@doorward/common/entities/user.entity';
import { AssessmentsService } from './assessments.service';
import ModelExists from '@doorward/backend/decorators/model.exists.decorator';
import { AssessmentEntity } from '@doorward/common/entities/assessment.entity';
import TransformerGroups from '@doorward/backend/decorators/transformer.groups.decorator';

const AssessmentExists = () =>
  ModelExists({
    model: AssessmentEntity,
    key: 'assessmentId',
    message: '{{assessment}} does not exist.',
  });

@Controller('assessments')
@UseGuards(JwtAuthGuard, PrivilegesGuard)
@ApiTags('assessments')
export class AssessmentsController {
  constructor(private assessmentsService: AssessmentsService) {}

  @Post('submissions/save/:assessmentId')
  @Privileges('assessments.submit')
  @AssessmentExists()
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: AssessmentSubmissionResponse,
    description: 'The assessment submission model',
  })
  @TransformerGroups('timestamps')
  async saveAssessment(
    @Param('assessmentId') assessmentId: string,
    @Body() body: SaveAssessmentBody,
    @CurrentUser() currentUser: UserEntity
  ) {
    const submission = await this.assessmentsService.saveAssessment(assessmentId, body, currentUser);

    return { submission };
  }

  @Get('submissions/:assessmentId')
  @Privileges('assessments.submit')
  @AssessmentExists()
  @ApiResponse({
    status: HttpStatus.OK,
    type: AssessmentSubmissionResponse,
    description: 'The assessment submission for this assessment',
  })
  @TransformerGroups('timestamps')
  async getSubmission(@Param('assessmentId') assessmentId: string, @CurrentUser() currentUser: UserEntity) {
    const submission = await this.assessmentsService.getSubmission(assessmentId, currentUser);

    return { submission };
  }

  @Post('submissions/submit/:assessmentId')
  @Privileges('assessments.submit')
  @AssessmentExists()
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: AssessmentSubmissionResponse,
    description: 'The assessment submission model',
  })
  @TransformerGroups('timestamps')
  async submitAssignment(
    @Param('assessmentId') assessmentId: string,
    @Body() body: SaveAssessmentBody,
    @CurrentUser() currentUser: UserEntity
  ) {
    const submission = await this.assessmentsService.submitAssessment(assessmentId, body, currentUser);

    return { submission, message: 'The {{assessment}} has been submitted for review/grading.' };
  }
}
