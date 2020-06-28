import UserController from '../users/UserController';
import roles from '../../utils/roles';
import { SearchSuggestion } from '@edudoor/common/types/api';

export default class SearchSuggestionsController {
  static async getSuggestions(req) {
    const {
      params: { type },
    } = req;
    let suggestions: Array<SearchSuggestion> = [];

    if (type === 'students') {
      suggestions = await SearchSuggestionsController.getUserSuggestions(roles.STUDENT);
    } else if (type === 'teachers') {
      suggestions = await SearchSuggestionsController.getUserSuggestions(roles.TEACHER);
    }

    return [200, { suggestions }];
  }

  static async getCourseSuggestions() {}

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
