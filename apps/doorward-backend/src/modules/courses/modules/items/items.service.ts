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
  UpdateModuleItemOrderBody,
} from '@doorward/common/dtos/body';
import PageRepository from '@doorward/backend/repositories/page.repository';
import AssignmentRepository from '@doorward/backend/repositories/assignment.repository';
import QuizRepository from '@doorward/backend/repositories/quiz.repository';
import { AssessmentEntity } from '@doorward/common/entities/assessment.entity';
import ExamRepository from '@doorward/backend/repositories/exam.repository';
import { AnswerTypes } from '@doorward/common/types/exam';
import translate from '@doorward/common/lang/translate';

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
    private examRepository: ExamRepository
  ) {}

  static getModuleItemText(item: ModuleItemType) {
    return `${item === ModuleItemType.ASSIGNMENT ? 'An' : 'A'} ${lowerCase(item)}`;
  }

  async getModuleItem(itemId: string) {
    return this.itemsRepository.getModuleItem(itemId);
  }

  async getModuleItemsForCourse(course: { id: string }, type: ModuleItemType) {
    const modules = await this.modulesRepository.find({ course });
    return this.itemsRepository.getModuleItems(type, modules);
  }

  async checkModuleItemExists(moduleId: string, title: string, type: ModuleItemType, excludeItem?: string) {
    return this.itemsRepository.checkModuleItemExists(moduleId, title, type, excludeItem);
  }

  async updateModuleItemOrder(moduleId: string, item: UpdateModuleItemOrderBody) {
    return this.itemsRepository.update(item.id, {
      ...item,
      module: { id: moduleId },
    });
  }

  async createOrUpdateModuleItem(moduleId: string, body: CreateModuleItemBody, author: UserEntity, itemId?: string) {
    if (await this.checkModuleItemExists(moduleId, body.title, body.type, itemId)) {
      throw new ValidationException({
        title: translate.moduleItemWithThisTitleAlreadyExists({
          moduleItem: ItemsService.getModuleItemText(body.type),
        }),
      });
    } else {
      const defaultProperties = { id: itemId, module: { id: moduleId }, author: { id: author.id }, title: body.title };
      if (body.type === ModuleItemType.PAGE) {
        const { order, page } = body as CreatePageBody;
        return this.pageRepository.createAndSave({
          order,
          page,
          ...defaultProperties,
        });
      } else if (body.type === ModuleItemType.ASSIGNMENT) {
        const { options, order, assignment } = body as CreateAssignmentBody;
        return this.assignmentRepository.createAndSave({
          options,
          order,
          assignment,
          ...defaultProperties,
        });
      } else if (body.type === ModuleItemType.ASSESSMENT) {
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
    }
  }

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
