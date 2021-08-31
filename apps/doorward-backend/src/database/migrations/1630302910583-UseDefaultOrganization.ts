import { MigrationInterface, QueryRunner } from 'typeorm';
import OrganizationEntity from '@doorward/common/entities/organization.entity';

export class UseDefaultOrganization1630302910583 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const tables =
      `Files,DiscussionGroups,GroupMembers,Answers,AssessmentSubmission,Courses,DiscussionGroupComments,AssignmentSubmissions,CourseManagers,Groups,ModuleItems,MeetingRoomMembers,MeetingRooms,Meetings,PasswordResets,QuestionSections,Modules,Questions,Users,StudentCourses`.split(
        ','
      );
    const defaultOrganizationId = '0000000000000000000000';

    let mainOrganization: any = await queryRunner.query(
      `SELECT * FROM "Organizations" WHERE id != $1 ORDER BY "createdAt" limit 1;`,
      [defaultOrganizationId]
    );

    if (!mainOrganization.length) {
      throw new Error('There are no organizations.');
    }
    mainOrganization = mainOrganization[0] as OrganizationEntity;

    // delete all other organizations.

    await queryRunner.query(`DELETE FROM "Organizations" WHERE id not in ($1, $2)`, [
      defaultOrganizationId,
      mainOrganization.id,
    ]);

    const foreignKeys: Record<string, string> = {};

    // make the `organizationId` column not a primary key
    await Promise.all(
      tables.map(async (tableName) => {
        const results = await queryRunner.query(
          `SELECT constraint_name FROM information_schema.key_column_usage WHERE table_name=$1 AND column_name=$2`,
          [tableName, 'organizationId']
        );
        foreignKeys[tableName] = results[0].constraint_name;

        await queryRunner.query(`ALTER TABLE "${tableName}" DROP CONSTRAINT "${results[0].constraint_name}"`);
        await queryRunner.query(`UPDATE "${tableName}" SET "organizationId"=$1`, [defaultOrganizationId]);
      })
    );

    await queryRunner.query(`DELETE FROM "Organizations" WHERE id = $1`, [defaultOrganizationId]);
    await queryRunner.query(`UPDATE "Organizations" SET id = $1`, [defaultOrganizationId]);

    // make the `organizationId` column a primary key now
    await Promise.all(
      tables.map(async (tableName) => {
        await queryRunner.query(
          `ALTER TABLE "${tableName}" ADD CONSTRAINT "${foreignKeys[tableName]}" FOREIGN KEY ("organizationId")
                        REFERENCES "Organizations"("id") ON DELETE CASCADE `
        );
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
