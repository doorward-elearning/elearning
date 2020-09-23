import DApiResponse from '@doorward/common/dtos/response/base.response';
import FileEntity from '@doorward/common/entities/file.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class SimpleFileResponse {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  public: boolean;

  @ApiProperty()
  @Expose()
  publicUrl: string;

  @ApiProperty()
  @Expose()
  authorId: string;

  @ApiProperty()
  @Expose()
  authorName: string;

  @ApiProperty()
  @Expose()
  createdAt: Date;

  constructor(file: FileEntity) {
    this.id = file.id;
    this.name = file.name;
    this.public = file.public;
    this.publicUrl = file.publicUrl;
    this.authorId = file?.owner?.id;
    this.authorName = file?.owner?.fullName;
    this.createdAt = file.createdAt;
  }
}

export class FileResponse extends DApiResponse {
  @ApiProperty()
  @Expose()
  file: SimpleFileResponse;
}

export class FilesResponse extends DApiResponse {
  @ApiProperty()
  @Expose()
  files: SimpleFileResponse[];
}
