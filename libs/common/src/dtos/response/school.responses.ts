import DApiResponse from '@doorward/common/dtos/response/base.response';
import SchoolEntity from '@doorward/common/entities/school.entity';

export class SchoolResponse extends DApiResponse {
  school: SchoolEntity;
}
export class SchoolsResponse extends DApiResponse {
  schools: SchoolEntity[];
}
