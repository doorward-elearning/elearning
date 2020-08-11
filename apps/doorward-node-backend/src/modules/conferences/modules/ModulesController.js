import models from '../../../database/models';
import { ModuleInclude } from '../../../utils/includes';
import Tools from '../../../utils/Tools';

class ModulesController {
  static async getConferenceModules(req) {
    const { conferenceId } = req.params;
    const modules = await models.Module.findAll({
      where: {
        conferenceId,
      },
      include: ModuleInclude,
    });

    return [200, { modules }];
  }

  static async addConferenceModule({ body, params }) {
    let module = await ModulesController.createModule(params.conferenceId, body);
    module = await models.Module.findByPk(module.id, {
      include: ModuleInclude,
    });
    return [201, { module }, 'Module has been added to the conference'];
  }

  static async updateConferenceModule({ body, params }) {
    const module = await models.Module.findByPk(params.moduleId);
    await module.update({
      ...body,
    });
    await module.reload();

    return [200, { module }, `${module.title} has been updated`];
  }

  static async deleteConferenceModule({ params }) {
    const { moduleId } = params;

    await models.Module.destroy({ where: { id: moduleId } });

    return [200, { id: moduleId }, 'Module has been deleted.'];
  }

  static async getConferenceModule({ params }) {
    const module = await models.Module.findOne({
      where: {
        id: params.moduleId,
      },
      include: [
        {
          model: models.ModuleItem,
          as: 'items',
        },
      ],
    });

    return [200, { module }];
  }

  static async createModule(conferenceId, moduleData) {
    return models.Module.create({
      ...moduleData,
      conferenceId,
    });
  }

  static async createAnswers(questionId, answers = [], previousAnswers = []) {
    answers.map(async answer => {
      if (answer.id) {
        await models.Answer.update(
          {
            ...answer,
          },
          {
            where: {
              id: answer.id,
            },
          }
        );
      } else {
        models.Answer.create({ ...answer, questionId });
      }
    });
    previousAnswers.forEach(previous => {
      if (!answers.find(answer => answer.id === previous.id)) {
        models.Answer.destroy({ where: { id: previous.id }, force: true });
      }
    });
  }

  static async createQuiz(req, moduleItem, questions = []) {
    console.log(questions);
    questions.map(async question => {
      if (question.id) {
        await models.Question.update(
          {
            ...question,
          },
          {
            where: {
              id: question.id,
            },
          }
        );
        const updatedQuestion = await models.Question.findByPk(question.id, {
          include: [
            {
              model: models.Answer,
              as: 'answers',
            },
          ],
        });
        await ModulesController.createAnswers(null, question.answers, updatedQuestion.answers);
      }
      const { id } = await models.Question.create({ ...question, quizId: moduleItem.id });
      await ModulesController.createAnswers(id, question.answers);
    });
  }

  static async createModuleItem(req) {
    const { body, params, user } = req;
    const questions = body.content.questions || [];
    if (body.type === 'Quiz') {
      delete body.content.questions;
    }
    let moduleItem;
    if (body.id) {
      moduleItem = await models.ModuleItem.update(
        {
          ...body,
        },
        {
          where: {
            id: body.id,
          },
          returning: true,
        }
      );
      await ModulesController.createQuiz(req, moduleItem[1][0], questions);
      return [200, { item: moduleItem[1][0] }, 'Item has been updated.'];
    }
    moduleItem = await models.ModuleItem.create({
      ...body,
      moduleId: params.moduleId,
      createdBy: user.id,
    });

    await ModulesController.createQuiz(req, moduleItem, questions);
    return [201, { item: moduleItem }, 'Item has been added to the module'];
  }

  static async getAllModuleItems(req) {
    const { params } = req;
    const items = await models.ModuleItem.findAll({
      where: {
        moduleId: params.moduleId,
        ...req.searchFields,
      },
      include: [
        {
          model: models.User,
          as: 'author',
        },
        {
          model: models.AssignmentSubmission,
          as: 'assignmentSubmission',
        },
      ],
    });
    return [200, { items }];
  }

  static async getModuleItem(req) {
    const { params, user } = req;
    const include = [
      {
        model: models.Module,
        as: 'module',
      },
    ];

    if (Tools.isMember(user)) {
      include.push({
        model: models.AssignmentSubmission,
        where: {
          memberId: user.id,
        },
        required: false,
        as: 'assignmentSubmission',
        include: [
          {
            model: models.File,
            as: 'file',
            required: false,
          },
        ],
      });
    } else {
      include.push({
        model: models.AssignmentSubmission,
        required: false,
        as: 'assignmentSubmissions',
        include: [
          {
            model: models.File,
            as: 'file',
            required: false,
          },
          {
            model: models.User,
            as: 'member',
          },
        ],
      });
    }

    const item = await models.ModuleItem.findByPk(params.id, {
      include,
    });
    if (item.type === 'Quiz') {
      const questions = await models.Question.findAll({
        where: {
          quizId: item.id,
        },
        include: [{ model: models.Answer, as: 'answers' }],
      });

      return [200, { item: { ...item.dataValues, content: { ...item.dataValues.content, questions } } }];
    }
    return [200, { item }];
  }

  static async getConferenceModuleItems(req) {
    const { params } = req;
    const items = await models.ModuleItem.findAll({
      where: {
        ...req.searchFields,
      },
      include: [
        {
          model: models.Module,
          as: 'module',
          required: true,
          where: {
            conferenceId: params.conferenceId,
          },
        },
        {
          model: models.AssignmentSubmission,
          as: 'assignmentSubmission',
        },
      ],
    });

    return [200, { items }];
  }

  static async submitAssignment(req) {
    const { body, user, params } = req;
    const submission = await models.AssignmentSubmission.create(
      {
        memberId: user.id,
        assignmentId: params.id,
        submissionType: body.submissionType,
        submission: body.submission,
        resubmission: body.resubmission,
      },
      {
        include: [
          {
            model: models.File,
            as: 'file',
          },
        ],
      }
    );

    return [201, { submission }, 'Assignment has been submitted.'];
  }
}

export default ModulesController;
