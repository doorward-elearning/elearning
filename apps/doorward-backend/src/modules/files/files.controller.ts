import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Req,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import JwtAuthGuard from '@doorward/backend/guards/jwt.auth.guard';
import PrivilegesGuard from '../../guards/privileges.guard';
import Public from '@doorward/backend/decorators/public.decorator';
import { CreateFileBody } from '@doorward/common/dtos/body';
import { FilesService } from './files.service';
import { CurrentUser } from '@doorward/backend/decorators/user.decorator';
import UserEntity from '@doorward/common/entities/user.entity';
import { FileResponse, FilesResponse, SimpleFileResponse } from '@doorward/common/dtos/response';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import ModelExists from '@doorward/backend/decorators/model.exists.decorator';
import FileEntity from '@doorward/common/entities/file.entity';
import translate from '@doorward/common/lang/translate';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import PayloadSize from '@doorward/backend/decorators/payload.size.decorator';
import dataSize from '@doorward/common/utils/dataSize';

const FileExists = () =>
  ModelExists({
    key: 'fileId',
    model: FileEntity,
    message: translate('fileDoesNotExist'),
  });

@Controller('files')
@ApiTags('files')
@UseGuards(JwtAuthGuard, PrivilegesGuard)
export class FilesController {
  constructor(private filesService: FilesService) {}

  @Post()
  @Public()
  @ApiResponse({ status: HttpStatus.CREATED, description: 'The file that was created', type: FileResponse })
  async createFile(@Body() body: CreateFileBody, @CurrentUser() user: UserEntity): Promise<FileResponse> {
    const file = await this.filesService.createFile(body, user);

    return {
      file: new SimpleFileResponse(file),
    };
  }

  @Get(':fileId')
  @Public()
  @FileExists()
  @ApiResponse({ status: HttpStatus.OK, description: 'The file with the specified id', type: FileResponse })
  async getFile(@Param('fileId') fileId: string, @CurrentUser() user: UserEntity) {
    const file = await this.filesService.getFile(fileId, user);

    return {
      file: new SimpleFileResponse(file),
    };
  }

  @Get()
  @Public()
  @ApiResponse({ status: HttpStatus.OK, description: 'The list of files in the system', type: FilesResponse })
  async getFiles(@CurrentUser() user: UserEntity) {
    const files = await this.filesService.getAllFiles(user);

    return {
      files: files.map((file) => new SimpleFileResponse(file)),
    };
  }

  /**
   *
   * Uploads a single file and creates a file entity that relates to this item
   *
   * The tag `upload-file` marks this endpoint for generation of a file upload handler
   *
   * @param file
   * @param currentUser
   */
  @Post('upload')
  @ApiTags('upload-file')
  @UseInterceptors(FileInterceptor('file'))
  @PayloadSize(dataSize.MB(+process.env.MAX_UPLOAD_SIZE))
  async uploadFile(@UploadedFile() file, @CurrentUser() currentUser: UserEntity, @Req() req): Promise<FileResponse> {
    if (process.env.NODE_ENV === 'development') {
      file.location = 'https://' + req.headers.host + '/' + file.path;
    }
    const createdFile = new SimpleFileResponse(
      await this.filesService.createFile(
        {
          name: file.originalname,
          public: false,
          publicUrl: file.location,
        },
        currentUser
      )
    );

    return {
      file: createdFile,
    };
  }

  /**
   * Uploads multiple file and creates file entities on the database with the file information.
   *
   * The tag `upload-multiple-files` marks this endpoint for generation of a file upload handler
   *
   * @param files - the list of files to upload
   * @param currentUser - the current logged in user.
   */
  @Post('upload/multiple')
  @UseInterceptors(FilesInterceptor('files'))
  @ApiTags('upload-multiple-files')
  @PayloadSize(dataSize.MB(+process.env.MAX_UPLOAD_SIZE))
  async uploadMultipleFiles(
    @UploadedFiles() files: Array<any>,
    @CurrentUser() currentUser: UserEntity
  ): Promise<FilesResponse> {
    const createdFiles = await Promise.all(
      files.map(async (file) => {
        return new SimpleFileResponse(
          await this.filesService.createFile(
            {
              name: file.originalname,
              public: false,
              publicUrl: file.location,
            },
            currentUser
          )
        );
      })
    );

    return {
      files: createdFiles,
    };
  }
}
