import { Injectable } from '@nestjs/common';
import { UsersRepository } from '@doorward/backend/repositories/users.repository';
import GroupsRepository from '@doorward/backend/repositories/groups.repository';
import { Roles } from '@doorward/common/types/roles';
import { SearchSuggestion } from '@doorward/common/types/api';
import { SearchSuggestionTypes } from '@doorward/common/types/suggestions';
import CoursesRepository from '@doorward/backend/repositories/courses.repository';

@Injectable()
export class SearchSuggestionsService {
  constructor(private usersRepository: UsersRepository, private groupsRepository: GroupsRepository, private coursesRepository: CoursesRepository) {}

  public async getSearchSuggestions(type: SearchSuggestionTypes) {
  }

  public async getUserSuggestions(role: Roles): Promise<Array<SearchSuggestion>> {
    return (await this.usersRepository.getUsersByRole(role)).map((user) => ({
      text: user.email,
      image: user.profilePicture,
    }));
  }

  public async getGroupSuggestions(type?: string): Promise<SearchSuggestion[]> {
    return (await this.groupsRepository.getGroupsByType(type)).map((group) => ({ text: group.name }));
  }
  public async getCourseSuggestions() : Promise<Array<SearchSuggestion>> {
    return (await this.coursesRepository.getAllCourseNames()).map(function(courseName){
          return {
                  text : courseName,
                 } 
          });
    }
}
