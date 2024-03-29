import DApiResponse from '@doorward/common/dtos/response/base.response';
import SchoolEntity from '@doorward/common/entities/school.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class SchoolResponse extends DApiResponse {
  @Expose()
  school: SchoolEntity;
}

export class SchoolsResponse extends DApiResponse {
  @Expose()
  schools: SchoolEntity[];
}
