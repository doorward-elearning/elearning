import { Body, Controller, Get, HttpStatus, Module, Param, Post, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import JwtAuthGuard from '@doorward/backend/guards/jwt.auth.guard';
import PrivilegesGuard from '../../../../guards/privileges.guard';
import Privileges from '../../../../decorators/privileges.decorator';
import {
  AssessmentSubmissionResponse,
  AssessmentSubmissionsResponse,
} from '@doorward/common/dtos/response/assessment.responses';
import { CreateUserBody, SaveAssessmentBody } from '@doorward/common/dtos/body';
import { CurrentUser } from '@doorward/backend/decorators/user.decorator';
import UserEntity from '@doorward/common/entities/user.entity';
import { AssessmentsService } from './assessments.service';
import ModelExists from '@doorward/backend/decorators/model.exists.decorator';
import { AssessmentEntity } from '@doorward/common/entities/assessment.entity';
import TransformerGroups from '@doorward/backend/decorators/transformer.groups.decorator';
import translate from '@doorward/common/lang/translate';
import AssessmentSubmissionEntity from '@doorward/common/entities/assessment.submission.entity';
import PayloadSize from '@doorward/backend/decorators/payload.size.decorator';
import dataSize from '@doorward/common/utils/dataSize';
import { UsersService } from '../../../users/users.service';
import Tools from '@doorward/common/utils/Tools';
import Public from '@doorward/backend/decorators/public.decorator';

const AssessmentExists = () =>
  ModelExists({
    model: AssessmentEntity,
    key: 'assessmentId',
    message: translate('assessmentDoesNotExist'),
  });

const SubmissionExists = () =>
  ModelExists({
    model: AssessmentSubmissionEntity,
    key: 'submissionId',
    message: translate('submissionDoesNotExist'),
  });

@Controller('assessments')
@UseGuards(JwtAuthGuard, PrivilegesGuard)
@ApiTags('assessments')
export class AssessmentsController {
  constructor(private assessmentsService: AssessmentsService, private usersService: UsersService) {}

  @Post('submissions/save/:assessmentId')
  @Public()
  @Privileges('assessments.submit')
  @PayloadSize(dataSize.MB(1))
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
    if(!currentUser){
      let currentUser = new UserEntity();
    let userBody = new CreateUserBody();
    currentUser.firstName = 'Anonymous';
    currentUser.lastName = 'User';
    currentUser.username = Tools.randomString(10);
    const user = await this.usersService.createUser(userBody, currentUser);
    const submission = await this.assessmentsService.saveAssessment(assessmentId, body, user.user);
    return { submission };

    }else {
    const submission = await this.assessmentsService.saveAssessment(assessmentId, body, currentUser);

    return { submission };}
  }

  @Get('submissions/:assessmentId')
  @Public()
  @Privileges('assessments.submit')
  @PayloadSize(dataSize.MB(2))
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
  @PayloadSize(dataSize.MB(1))
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

    return { submission, message: translate('assessmentSubmittedForReview') };
  }

  @Post('submissions/public/submit/:assessmentId')
  @Public()
  @Privileges('assessments.submit')
  @PayloadSize(dataSize.MB(1))
  @AssessmentExists()
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: AssessmentSubmissionResponse,
    description: 'The assessment submission model',
  })
  @TransformerGroups('timestamps')
  async submitPublicAssessment(@Param('assessmentId') assessmentId: string, @Body() body: SaveAssessmentBody) {
    let currentUser = new UserEntity();
    let userBody = new CreateUserBody();
    currentUser.firstName = 'Anonymous';
    currentUser.lastName = 'User';
    currentUser.username = Tools.randomString(10);
    const user = await this.usersService.createUser(userBody, currentUser);
    const submission = await this.assessmentsService.submitAssessment(assessmentId, body, user.user);

    return { submission, message: translate('assessmentSubmittedForReview') };
  }

  @Get(':assessmentId/studentSubmissions')
  @Privileges('assessments.grade')
  @AssessmentExists()
  @PayloadSize(dataSize.MB(1))
  @ApiResponse({
    status: HttpStatus.OK,
    type: AssessmentSubmissionsResponse,
    description: 'The student submissions for the assessment',
  })
  @TransformerGroups('timestamps')
  async getStudentSubmissions(@Param('assessmentId') assessmentId: string): Promise<AssessmentSubmissionsResponse> {
    const submissions = await this.assessmentsService.getStudentSubmissions(assessmentId);

    return { submissions };
  }

  @Get('studentSubmission/:submissionId')
  @Privileges('assessments.grade')
  @SubmissionExists()
  @PayloadSize(dataSize.MB(1))
  @ApiResponse({
    status: HttpStatus.OK,
    type: AssessmentSubmissionResponse,
    description: 'The student submission',
  })
  @TransformerGroups('timestamps')
  async getStudentSubmission(@Param('submissionId') submissionId: string): Promise<AssessmentSubmissionResponse> {
    const submission = await this.assessmentsService.getStudentSubmission(submissionId);

    return { submission };
  }
}
