import { MigrationInterface, QueryRunner } from 'typeorm';
import { MeetingStatus } from '@doorward/common/types/meeting';

export class EndAllMeetings1597731431326 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`UPDATE "Meetings" SET "status" = '${MeetingStatus.ENDED}'`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
