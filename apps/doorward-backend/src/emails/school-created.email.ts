import EmailModel from '@doorward/backend/modules/emails/email.model';
import SchoolEntity from '@doorward/common/entities/school.entity';

export default class SchoolCreatedEmail extends EmailModel<SchoolEntity> {
  getTemplate(): string {
    return 'new_school.pug';
  }
}
