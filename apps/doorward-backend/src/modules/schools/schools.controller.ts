import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { SchoolResponse, SchoolsResponse } from '@doorward/common/dtos/response/school.responses';
import { CreateClassroomBody, CreateSchoolBody } from '@doorward/common/dtos/body';
import { SchoolsService } from './schools.service';
import ModelExists from '@doorward/backend/decorators/model.exists.decorator';
import SchoolEntity from '@doorward/common/entities/school.entity';

const SchoolExists = () => ModelExists({ key: 'schoolId', model: SchoolEntity, message: '{{school}} does not exist.' });

@Controller('schools')
@ApiTags('schools')
export class SchoolsController {
  constructor(private schoolService: SchoolsService) {}

  /**
   *
   * @param body
   */
  @Post()
  @ApiResponse({ status: HttpStatus.CREATED, description: 'The school that was created', type: SchoolResponse })
  async createSchool(@Body() body: CreateSchoolBody): Promise<SchoolResponse> {
    const school = await this.schoolService.createSchool(body);

    return { school, message: '{{school}} has been created. You can now create {{classroom}}s for the {{school}}' };
  }

  /**
   *
   */
  @Get()
  @ApiResponse({ status: HttpStatus.OK, description: 'The list of all the schools created', type: SchoolsResponse })
  async getAllSchools(): Promise<SchoolsResponse> {
    const schools = await this.schoolService.getAllSchools();

    return { schools };
  }

  /**
   *
   * @param schoolId
   */
  @Get(':schoolId')
  @SchoolExists()
  @ApiResponse({ status: HttpStatus.OK, description: 'Get the school by the school id', type: SchoolResponse })
  async getSchool(@Param('schoolId') schoolId: string): Promise<SchoolResponse> {
    const school = await this.schoolService.getSchoolById(schoolId);

    return { school };
  }

  /**
   *
   * @param schoolId
   * @param body
   */
  @Post(':schoolId/classrooms')
  @SchoolExists()
  @ApiResponse({ status: HttpStatus.OK, description: 'The school that was updated', type: SchoolResponse })
  async addClassroomToSchool(@Param('schoolId') schoolId: string, @Body() body: CreateClassroomBody): Promise<SchoolResponse> {
    const school = await this.schoolService.addClassroomToSchool(schoolId, body);

    return { school };
  }
}
