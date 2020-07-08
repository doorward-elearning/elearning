import UserController from '../users/UserController';
import roles from '../../utils/roles';
import { SearchSuggestion } from '@doorward/common/types/api';
import models from '../../database/models';

export default class SearchSuggestionsController {
  static async getSuggestions(req) {
    const {
      params: { type: suggestionType },
      query: { type },
    } = req;
    let suggestions: Array<SearchSuggestion> = [];

    switch (suggestionType) {
      case 'students':
        suggestions = await SearchSuggestionsController.getUserSuggestions(roles.STUDENT);
        break;
      case 'teachers':
        suggestions = await SearchSuggestionsController.getUserSuggestions(roles.TEACHER);
        break;
      case 'groups':
        suggestions = await SearchSuggestionsController.getGroupSuggestions(type);
        break;
    }

    return [200, { suggestions }];
  }

  static async getGroupSuggestions(type) {
    return (await models.Group.findAll({ where: { type } })).map(group => ({
      text: group.name,
    }));
  }

  static async getUserSuggestions(role) {
    const students = await UserController.findByRole(role, {
      attributes: ['email'],
    });

    const suggestions: Array<SearchSuggestion> = students.map(student => {
      return {
        text: student.email,
      };
    });

    return suggestions;
  }
}
