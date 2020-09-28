import { Injectable } from '@nestjs/common';
import ModuleItemsRepository from '@doorward/backend/repositories/module.items.repository';
import { lowerCase } from 'lodash';
import { ModuleItemType } from '@doorward/common/types/moduleItems';
import ModulesRepository from '@doorward/backend/repositories/modules.repository';
import ValidationException from '@doorward/backend/exceptions/validation.exception';
import UserEntity from '@doorward/common/entities/user.entity';
import ModuleItemEntity from '@doorward/common/entities/module.item.entity';
import QuestionRepository from '@doorward/backend/repositories/question.repository';
import AnswerRepository from '@doorward/backend/repositories/answer.repository';
import QuestionEntity from '@doorward/common/entities/question.entity';
import compareLists from '@doorward/common/utils/compareLists';
import { In } from 'typeorm';
import AnswerEntity from '@doorward/common/entities/answer.entity';
import {
  CreateAnswerBody,
  CreateAssignmentBody,
  CreateModuleItemBody,
  CreatePageBody,
  CreateQuestionBody,
  CreateQuizBody,
} from '@doorward/common/dtos/body';
import PageRepository from '@doorward/backend/repositories/page.repository';
import AssignmentRepository from '@doorward/backend/repositories/assignment.repository';
import QuizRepository from '@doorward/backend/repositories/quiz.repository';

@Injectable()
export class ItemsService {
  constructor(
    private itemsRepository: ModuleItemsRepository,
    private modulesRepository: ModulesRepository,
    private questionRepository: QuestionRepository,
    private answerRepository: AnswerRepository,
    private pageRepository: PageRepository,
    private assignmentRepository: AssignmentRepository,
    private quizRepository: QuizRepository
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

  async createOrUpdateModuleItem(moduleId: string, body: CreateModuleItemBody, author: UserEntity, itemId?: string) {
    if (await this.checkModuleItemExists(moduleId, body.title, body.type, itemId)) {
      throw new ValidationException({
        title: `${ItemsService.getModuleItemText(body.type)} with this title already exists.`,
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
      } else if (body.type === ModuleItemType.QUIZ) {
        const { options, instructions } = body as CreateQuizBody;
        const quiz = await this.quizRepository.createAndSave({
          options,
          instructions,
          ...defaultProperties,
        });
        quiz.questions = await this._createOrUpdateQuizQuestions(quiz, (body as CreateQuizBody).questions);
        return quiz;
      }
    }
  }

  private async _createOrUpdateQuizQuestions(
    quiz: ModuleItemEntity,
    questions: Array<CreateQuestionBody>
  ): Promise<QuestionEntity[]> {
    const allQuestions = await this.questionRepository.find({ where: { quiz } });

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
      [...newItems, ...unchanged].map(async ({ id, question: questionBody, points, answers }) => {
        const question = await this.questionRepository.save(
          this.questionRepository.create({
            question: typeof questionBody === 'string' ? questionBody : JSON.stringify(questionBody),
            points,
            id,
            quiz,
          })
        );

        question.answers = await this._createOrUpdateQuestionAnswers(question, answers);

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
          })
        );
      })
    );
  }
}
