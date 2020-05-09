import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';

import { AppService } from './app.service';
import { ResponseBuilder } from '@edudoor/backend/api/ResponseBuilder';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
