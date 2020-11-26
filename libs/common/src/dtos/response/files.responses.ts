import DApiResponse from '@doorward/common/dtos/response/base.response';
import FileEntity from '@doorward/common/entities/file.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class SimpleFileResponse {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  public: boolean;

  @Expose()
  publicUrl: string;

  @Expose()
  authorId: string;

  @Expose()
  authorName: string;

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
  @Expose()
  file: SimpleFileResponse;
}

export class FilesResponse extends DApiResponse {
  @Expose()
  files: SimpleFileResponse[];
}
