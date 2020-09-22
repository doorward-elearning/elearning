import { Body, Controller, Get, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import JwtAuthGuard from '../auth/guards/jwt.auth.guard';
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

const FileExists = () =>
  ModelExists({
    key: 'fileId',
    model: FileEntity,
    message: 'File does not exist.',
  });

@Controller('files')
@ApiTags('files')
@UseGuards(JwtAuthGuard, PrivilegesGuard)
export class FilesController {
  constructor(private filesService: FilesService) {}

  @Post()
  @Public()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The file that was created',
    type: FileResponse,
  })
  async createFile(@Body() body: CreateFileBody, @CurrentUser() user: UserEntity): Promise<FileResponse> {
    const file = await this.filesService.createFile(body, user);

    return {
      file: new SimpleFileResponse(file),
    };
  }

  @Get(':fileId')
  @Public()
  @FileExists()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The file with the specified id',
    type: FileResponse,
  })
  async getFile(@Param('fileId') fileId: string, @CurrentUser() user: UserEntity) {
    const file = await this.filesService.getFile(fileId, user);

    return {
      file: new SimpleFileResponse(file),
    };
  }

  @Get()
  @Public()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The list of files in the system',
    type: FilesResponse,
  })
  async getFiles(@CurrentUser() user: UserEntity) {
    const files = await this.filesService.getAllFiles(user);

    return {
      files: files.map((file) => new SimpleFileResponse(file)),
    };
  }
}
