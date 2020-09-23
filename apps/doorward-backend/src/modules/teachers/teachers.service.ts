import { Injectable } from '@nestjs/common';
import TeacherRepository from '@doorward/backend/repositories/teacher.repository';

@Injectable()
export class TeachersService {
  constructor(private teachersRepository: TeacherRepository) {}
}
