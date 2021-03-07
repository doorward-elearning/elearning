import { Injectable } from '@nestjs/common';
import TeacherRepository from '@doorward/backend/repositories/teacher.repository';
import { CreateUserBody } from '@doorward/common/dtos/body';
import UserEntity from '@doorward/common/entities/user.entity';
import { UsersService } from '../users/users.service';
import EmailsService from '@doorward/backend/modules/emails/emails.service';
import TeacherAccountWithPasswordEmail from '../../emails/teacher-account.with.password.email';
import TeacherNewAccountEmail from '../../emails/teacher-new.account.email';
import translate from '@doorward/common/lang/translate';
import { Roles } from '@doorward/common/types/roles';
import ROUTES from '@doorward/common/frontend/routes/main';
import Tools from '@doorward/common/utils/Tools';

@Injectable()
export class TeachersService {
  constructor(
    private teachersRepository: TeacherRepository,
    private usersService: UsersService,
    private emailsService: EmailsService
  ) {}

  /**
   *
   */
  public async getAllTeachers() {
    return this.teachersRepository.getAll();
  }

  /**
   *
   * @param body
   * @param currentUser
   * @param origin
   */
  public async createTeacher(body: CreateUserBody, currentUser: UserEntity, origin: string) {
    const { resetToken, user } = await this.usersService.createUser({ ...body, role: Roles.TEACHER }, currentUser);

    if (body.password) {
      this.emailsService
        .send(
          new TeacherAccountWithPasswordEmail({
            subject: translate('newTeacherAccountCreated'),
            recipient: user,
            data: { password: body.password, link: origin + ROUTES.auth.login },
          })
        )
        .then();
    } else {
      this.emailsService
        .send(
          new TeacherNewAccountEmail({
            subject: translate('newTeacherAccountCreated'),
            recipient: user,
            data: { link: origin + Tools.createRoute(ROUTES.auth.password.reset, { resetToken }) },
          })
        )
        .then();
    }

    return user;
  }
}
