import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateMeetingRoomType1597731358829 implements MigrationInterface {
  name = 'UpdateMeetingRoomType1597731358829';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE "MeetingRooms_type_enum" AS ENUM('Private', 'Public')`);
    await queryRunner.query(`ALTER TABLE "MeetingRooms" ADD "type" "MeetingRooms_type_enum" NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "MeetingRooms" DROP COLUMN "type"`);
    await queryRunner.query(`DROP TYPE "MeetingRooms_type_enum"`);
  }
}
