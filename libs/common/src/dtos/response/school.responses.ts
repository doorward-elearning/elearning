import DApiResponse from '@doorward/common/dtos/response/base.response';
import SchoolModel from '@doorward/common/models/school.model';
import { Expose } from 'class-transformer';

export class SchoolResponse extends DApiResponse {
  @Expose()
  school: SchoolModel;
}
export class SchoolsResponse extends DApiResponse {
  @Expose()
  schools: SchoolModel[];
}
