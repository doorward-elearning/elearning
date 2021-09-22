import { MigrationInterface, QueryRunner } from 'typeorm';
import OrganizationEntity from '@doorward/common/entities/organization.entity';

const tables =
  `Files,DiscussionGroups,GroupMembers,Answers,AssessmentSubmission,Courses,DiscussionGroupComments,AssignmentSubmissions,CourseManagers,Groups,ModuleItems,MeetingRoomMembers,MeetingRooms,Meetings,PasswordResets,QuestionSections,Modules,Questions,Users,StudentCourses`.split(
    ','
  );
const defaultOrganizationId = '0000000000000000000000';

export class UseDefaultOrganization1630302910583 implements MigrationInterface {
  private async getMainOrganization(queryRunner: QueryRunner) {
    const defaultOrganization: any = await queryRunner.query(
      `SELECT * FROM "Organizations" WHERE id = $1 ORDER BY "createdAt" limit 1;`,
      [defaultOrganizationId]
    );
    let mainOrganization: any = await queryRunner.query(
      `SELECT * FROM "Organizations" WHERE id != $1 ORDER BY "createdAt" limit 1;`,
      [defaultOrganizationId]
    );

    if (!mainOrganization.length) {
      mainOrganization = defaultOrganization;
    } else {
      mainOrganization = mainOrganization[0] as OrganizationEntity;
    }
    return mainOrganization;
  }

  public async up(queryRunner: QueryRunner): Promise<void> {
    const mainOrganization = await this.getMainOrganization(queryRunner);
    // delete all other organizations.

    await queryRunner.query(`DELETE FROM "Organizations" WHERE id not in ($1, $2)`, [
      defaultOrganizationId,
      mainOrganization.id,
    ]);

    // make the `organizationId` column not a primary key
    await Promise.all(
      tables.map(async (tableName) => {
        const results = await queryRunner.query(
          `SELECT constraint_name FROM information_schema.key_column_usage WHERE table_name=$1 AND column_name=$2`,
          [tableName, 'organizationId']
        );
        await queryRunner.query(`ALTER TABLE "${tableName}" DROP CONSTRAINT "${results[0].constraint_name}"`);
        await queryRunner.query(`ALTER TABLE "${tableName}" DROP COLUMN "organizationId"`);
      })
    );

    await queryRunner.query(`ALTER TABLE "Organizations" RENAME TO "Organizations_old"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "Organizations_old" RENAME TO "Organizations"`);

    const mainOrganization = await this.getMainOrganization(queryRunner);

    await Promise.all(
      tables.map(async (tableName) => {
        await queryRunner.query(
          `ALTER TABLE "${tableName}" ADD "organizationId" CHARACTER VARYING NOT NULL DEFAULT '${mainOrganization.id}'`
        );
      })
    );
    await queryRunner.query(
      `ALTER TABLE "Meetings" ADD CONSTRAINT "FK_6936e05362d215e35f6bd0a3525" FOREIGN KEY ("organizationId") REFERENCES "Organizations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "MeetingRooms" ADD CONSTRAINT "FK_6276060dcbb950fa2192887b24d" FOREIGN KEY ("organizationId") REFERENCES "Organizations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "MeetingRoomMembers" ADD CONSTRAINT "FK_5237b8d8d684872f971703b2be1" FOREIGN KEY ("organizationId") REFERENCES "Organizations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "Groups" ADD CONSTRAINT "FK_a90075be409849b37aee9c9610f" FOREIGN KEY ("organizationId") REFERENCES "Organizations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "GroupMembers" ADD CONSTRAINT "FK_824999b5a7a3cd3b573c7d4dd7f" FOREIGN KEY ("organizationId") REFERENCES "Organizations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "PasswordResets" ADD CONSTRAINT "FK_8066dfbf52a62fb59ba0fddf38a" FOREIGN KEY ("organizationId") REFERENCES "Organizations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "Users" ADD CONSTRAINT "FK_1612823a86e1cc991e52bd8b664" FOREIGN KEY ("organizationId") REFERENCES "Organizations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "StudentCourses" ADD CONSTRAINT "FK_e2f1b1433c40de94a71153c333d" FOREIGN KEY ("organizationId") REFERENCES "Organizations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "DiscussionGroupComments" ADD CONSTRAINT "FK_284fe25783622bcc480d86eca4e" FOREIGN KEY ("organizationId") REFERENCES "Organizations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "DiscussionGroups" ADD CONSTRAINT "FK_60202a59ece6c1a43758e018c7e" FOREIGN KEY ("organizationId") REFERENCES "Organizations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "Courses" ADD CONSTRAINT "FK_c47efca7e56913a7495071596c7" FOREIGN KEY ("organizationId") REFERENCES "Organizations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "Modules" ADD CONSTRAINT "FK_b4f3f0fee39ddc2b64b6109ee74" FOREIGN KEY ("organizationId") REFERENCES "Organizations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "Files" ADD CONSTRAINT "FK_1221481278810083fabc00998a2" FOREIGN KEY ("organizationId") REFERENCES "Organizations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "ModuleItems" ADD CONSTRAINT "FK_31e6c5890c29399bf792c85b94f" FOREIGN KEY ("organizationId") REFERENCES "Organizations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "QuestionSections" ADD CONSTRAINT "FK_13ae843d4be7f19d73bd879ee39" FOREIGN KEY ("organizationId") REFERENCES "Organizations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "Questions" ADD CONSTRAINT "FK_3594b03bb41a3dfa3b5601ce0ad" FOREIGN KEY ("organizationId") REFERENCES "Organizations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "Answers" ADD CONSTRAINT "FK_bd66877bf345afa88c7ac760f25" FOREIGN KEY ("organizationId") REFERENCES "Organizations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "AssignmentSubmissions" ADD CONSTRAINT "FK_65674b3b65b4ac62cd73e4a8ee1" FOREIGN KEY ("organizationId") REFERENCES "Organizations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "CourseManagers" ADD CONSTRAINT "FK_589aca480c62c360a11ce713d97" FOREIGN KEY ("organizationId") REFERENCES "Organizations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "AssessmentSubmission" ADD CONSTRAINT "FK_10c34cc42407f48a424f969ba3e" FOREIGN KEY ("organizationId") REFERENCES "Organizations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }
}
