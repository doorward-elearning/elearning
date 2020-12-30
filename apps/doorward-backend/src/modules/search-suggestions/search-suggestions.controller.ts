import { Controller, Get, HttpStatus, Param, Query, UseGuards } from '@nestjs/common';
import { ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import JwtAuthGuard from '@doorward/backend/guards/jwt.auth.guard';
import { SearchSuggestionTypes } from '@doorward/common/types/suggestions';
import { Roles } from '@doorward/common/types/roles';
import { SearchSuggestionsService } from './search-suggestions.service';
import { SuggestionsResponse } from '@doorward/common/dtos/response';

@Controller('search-suggestions')
@ApiTags('searchSuggestions')
@UseGuards(JwtAuthGuard)
export class SearchSuggestionsController {
  constructor(private searchSuggestionService: SearchSuggestionsService) {}

  @Get(':type')
  @ApiResponse({
    type: SuggestionsResponse,
    status: HttpStatus.OK,
    description: 'The list of search suggestions',
  })
  @ApiParam({ name: 'type', enum: SearchSuggestionTypes })
  @ApiQuery({ name: 'groupType', required: false })
  async getSuggestions(@Param('type') type: SearchSuggestionTypes, @Query('groupType') groupType?: string) {
    let suggestions;
    switch (type) {
      case SearchSuggestionTypes.STUDENTS:
        suggestions = await this.searchSuggestionService.getUserSuggestions(Roles.STUDENT);
        break;
      case SearchSuggestionTypes.TEACHERS:
        suggestions = await this.searchSuggestionService.getUserSuggestions(Roles.TEACHER);
        break;
      case SearchSuggestionTypes.GROUPS:
        suggestions = await this.searchSuggestionService.getGroupSuggestions(groupType);
        break;
      default:
        suggestions = [];
        break;
    }
    return { suggestions };
  }
}
