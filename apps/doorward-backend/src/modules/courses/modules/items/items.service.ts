import { Injectable } from '@nestjs/common';
import ModuleItemsRepository from '@doorward/backend/repositories/module.items.repository';
import { lowerCase } from 'lodash';
import { AssessmentTypes, ModuleItemType } from '@doorward/common/types/moduleItems';
import ModulesRepository from '@doorward/backend/repositories/modules.repository';
import ValidationException from '@doorward/backend/exceptions/validation.exception';
import UserEntity from '@doorward/common/entities/user.entity';
import QuestionRepository from '@doorward/backend/repositories/question.repository';
import AnswerRepository from '@doorward/backend/repositories/answer.repository';
import QuestionEntity from '@doorward/common/entities/question.entity';
import compareLists from '@doorward/common/utils/compareLists';
import { In } from 'typeorm';
import AnswerEntity from '@doorward/common/entities/answer.entity';
import {
  CreateAnswerBody,
  CreateAssessmentBody,
  CreateAssignmentBody,
  CreateModuleItemBody,
  CreatePageBody,
  CreateQuestionBody,
  CreateVideoBody,
  UpdateModuleItemOrderBody,
} from '@doorward/common/dtos/body';
import PageRepository from '@doorward/backend/repositories/page.repository';
import AssignmentRepository from '@doorward/backend/repositories/assignment.repository';
import QuizRepository from '@doorward/backend/repositories/quiz.repository';
import { AssessmentEntity } from '@doorward/common/entities/assessment.entity';
import ExamRepository from '@doorward/backend/repositories/exam.repository';
import { AnswerTypes } from '@doorward/common/types/exam';
import translate from '@doorward/common/lang/translate';
import ModuleVideoRepository from '@doorward/backend/repositories/module-video.repository';

@Injectable()
export class ItemsService {
  constructor(
    private itemsRepository: ModuleItemsRepository,
    private modulesRepository: ModulesRepository,
    private questionRepository: QuestionRepository,
    private answerRepository: AnswerRepository,
    private pageRepository: PageRepository,
    private assignmentRepository: AssignmentRepository,
    private quizRepository: QuizRepository,
    private examRepository: ExamRepository,
    private videoRepository: ModuleVideoRepository
  ) {}

  /**
   *
   * @param itemId
   * @param moduleId
   * @param body
   * @param author
   */
  private static getCommonProperties(itemId: string, moduleId: string, body: CreateModuleItemBody, author: UserEntity) {
    const properties = {
      id: itemId,
      module: { id: moduleId },
      author: { id: author.id },
      title: body.title,
      file: null,
    };
    if (body.fileId) {
      properties.file = {
        id: body.fileId,
      };
    }
    return properties;
  }

  /**
   *
   * @param item
   */
  static getModuleItemText(item: ModuleItemType) {
    return `${item === ModuleItemType.ASSIGNMENT ? 'An' : 'A'} ${lowerCase(item)}`;
  }

  /**
   *
   * @param itemId
   */
  async getModuleItem(itemId: string) {
    return this.itemsRepository.getModuleItem(itemId);
  }

  /**
   *
   * @param course
   * @param type
   */
  async getModuleItemsForCourse(course: { id: string }, type: ModuleItemType) {
    const modules = await this.modulesRepository.find({ course });
    return this.itemsRepository.getModuleItems(type, modules);
  }

  /**
   *
   * @param moduleId
   * @param title
   * @param type
   * @param excludeItem
   */
  async checkModuleItemExists(moduleId: string, title: string, type: ModuleItemType, excludeItem?: string) {
    return this.itemsRepository.checkModuleItemExists(moduleId, title, type, excludeItem);
  }

  /**
   *
   * @param moduleId
   * @param item
   */
  async updateModuleItemOrder(moduleId: string, item: UpdateModuleItemOrderBody) {
    return this.itemsRepository.update(item.id, {
      ...item,
      module: { id: moduleId },
    });
  }

  /**
   *
   * @param moduleId
   * @param body
   * @param author
   * @param itemId
   */
  async createOrUpdateModuleItem(moduleId: string, body: CreateModuleItemBody, author: UserEntity, itemId?: string) {
    if (await this.checkModuleItemExists(moduleId, body.title, body.type, itemId)) {
      throw new ValidationException({
        title: translate('moduleItemWithThisTitleAlreadyExists', {
          moduleItem: ItemsService.getModuleItemText(body.type),
        }),
      });
    } else {
      const defaultProperties = ItemsService.getCommonProperties(itemId, moduleId, body, author);
      switch (body.type) {
        case ModuleItemType.PAGE:
          return this.createPageModuleItem(body, defaultProperties);
        case ModuleItemType.ASSIGNMENT:
          return this.createAssignmentModuleItem(body, defaultProperties);
        case ModuleItemType.VIDEO:
          return this.createVideoModuleItem(body, defaultProperties);
        case ModuleItemType.ASSESSMENT:
          return this.createAssessmentModuleItem(body, defaultProperties);
      }
    }
  }

  /**
   *
   * @param body
   * @param defaultProperties
   */
  private async createVideoModuleItem(body: CreateModuleItemBody, defaultProperties: Partial<CreateModuleItemBody>) {
    const { videoURL, description } = body as CreateVideoBody;
    return this.videoRepository.createAndSave({ videoURL, description, ...defaultProperties });
  }

  /**
   *
   * @param body
   * @param defaultProperties
   */
  private async createPageModuleItem(body: CreateModuleItemBody, defaultProperties: Partial<CreateModuleItemBody>) {
    const { order, page } = body as CreatePageBody;
    return this.pageRepository.createAndSave({
      order,
      page,
      ...defaultProperties,
    });
  }

  private async createAssignmentModuleItem(
    body: CreateModuleItemBody,
    defaultProperties: Partial<CreateModuleItemBody>
  ) {
    const { options, order, assignment } = body as CreateAssignmentBody;
    return this.assignmentRepository.createAndSave({
      options,
      order,
      assignment,
      ...defaultProperties,
    });
  }

  /**
   *
   * @param body
   * @param defaultProperties
   */
  private async createAssessmentModuleItem(
    body: CreateModuleItemBody,
    defaultProperties: Partial<CreateModuleItemBody>
  ) {
    const { options, instructions, assessmentType } = body as CreateAssessmentBody;
    const properties = {
      options,
      instructions,
      ...defaultProperties,
    };
    let assessment;
    if (assessmentType === AssessmentTypes.QUIZ) {
      assessment = await this.quizRepository.createAndSave(properties);
    } else if (assessmentType === AssessmentTypes.EXAM) {
      assessment = await this.examRepository.createAndSave(properties);
    }
    assessment.questions = await this._createOrUpdateAssessmentQuestions(
      assessment,
      (body as CreateAssessmentBody).questions
    );
    return assessment;
  }

  /**
   *
   * @param assessment
   * @param questions
   * @private
   */
  private async _createOrUpdateAssessmentQuestions(
    assessment: AssessmentEntity,
    questions: Array<CreateQuestionBody>
  ): Promise<QuestionEntity[]> {
    const allQuestions = await this.questionRepository.find({ where: { assessment } });

    const { newItems, unchanged, removed } = compareLists(
      allQuestions,
      questions,
      (a, b) => a.id === b.id,
      (existingQuestion, newQuestion) => {
        return {
          ...existingQuestion,
          ...newQuestion,
        };
      }
    );

    if (removed.length) {
      await this.questionRepository.delete({
        id: In(removed.map((r) => r.id)),
      });
    }

    return Promise.all(
      [...newItems, ...unchanged].map(async ({ id, question: questionBody, points, answers, type }) => {
        const question = await this.questionRepository.save(
          this.questionRepository.create({
            question: typeof questionBody === 'string' ? questionBody : JSON.stringify(questionBody),
            points,
            id,
            type,
            assessment,
          }),
          {
            transaction: false,
          }
        );

        question.answers = await this._createOrUpdateQuestionAnswers(
          question,
          type === AnswerTypes.TEXT_INPUT ? [] : answers
        );

        return question;
      })
    );
  }

  /**
   *
   * @param question
   * @param answers
   * @private
   */
  private async _createOrUpdateQuestionAnswers(
    question: QuestionEntity,
    answers: Array<CreateAnswerBody>
  ): Promise<AnswerEntity[]> {
    const allAnswers = await this.answerRepository.find({ question });
    const { newItems, unchanged, removed } = compareLists(
      allAnswers,
      answers,
      (a, b) => a.id === b.id,
      (a, b) => ({ ...a, ...b })
    );

    if (removed.length) {
      await this.answerRepository.delete({
        id: In(removed.map((r) => r.id)),
      });
    }
    return Promise.all(
      [...newItems, ...unchanged].map(async ({ id, answer: answerBody, correct, description = '' }) => {
        return this.answerRepository.save(
          this.answerRepository.create({
            id,
            answer: answerBody,
            question,
            correct,
            description: description || '',
          }),
          {
            transaction: false,
          }
        );
      })
    );
  }
}
