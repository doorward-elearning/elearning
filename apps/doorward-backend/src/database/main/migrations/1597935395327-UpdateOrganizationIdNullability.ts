import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateOrganizationIdNullability1597935395327 implements MigrationInterface {
  name = 'UpdateOrganizationIdNullability1597935395327';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "Roles" DROP CONSTRAINT "FK_6f4bf6e1d7b9fbb3a8824e2d9ac"`);
    await queryRunner.query(`ALTER TABLE "Roles" ALTER COLUMN "organizationId" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "UserRoles" DROP CONSTRAINT "FK_5d9c2a56541c061c276ada73d23"`);
    await queryRunner.query(`ALTER TABLE "UserRoles" ALTER COLUMN "organizationId" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "StudentCourses" DROP CONSTRAINT "FK_e2f1b1433c40de94a71153c333d"`);
    await queryRunner.query(`ALTER TABLE "StudentCourses" ALTER COLUMN "organizationId" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "Meetings" DROP CONSTRAINT "FK_6936e05362d215e35f6bd0a3525"`);
    await queryRunner.query(`ALTER TABLE "Meetings" ALTER COLUMN "organizationId" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "MeetingRooms" DROP CONSTRAINT "FK_6276060dcbb950fa2192887b24d"`);
    await queryRunner.query(`ALTER TABLE "MeetingRooms" ALTER COLUMN "organizationId" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "MeetingRoomMembers" DROP CONSTRAINT "FK_5237b8d8d684872f971703b2be1"`);
    await queryRunner.query(`ALTER TABLE "MeetingRoomMembers" ALTER COLUMN "organizationId" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "GroupMembers" DROP CONSTRAINT "FK_824999b5a7a3cd3b573c7d4dd7f"`);
    await queryRunner.query(`ALTER TABLE "GroupMembers" ALTER COLUMN "organizationId" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "Groups" DROP CONSTRAINT "FK_a90075be409849b37aee9c9610f"`);
    await queryRunner.query(`ALTER TABLE "Groups" ALTER COLUMN "organizationId" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "Users" DROP CONSTRAINT "FK_1612823a86e1cc991e52bd8b664"`);
    await queryRunner.query(`ALTER TABLE "Users" ALTER COLUMN "organizationId" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "Courses" DROP CONSTRAINT "FK_c47efca7e56913a7495071596c7"`);
    await queryRunner.query(`ALTER TABLE "Courses" ALTER COLUMN "organizationId" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "Modules" DROP CONSTRAINT "FK_b4f3f0fee39ddc2b64b6109ee74"`);
    await queryRunner.query(`ALTER TABLE "Modules" ALTER COLUMN "organizationId" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "ModuleItems" DROP CONSTRAINT "FK_31e6c5890c29399bf792c85b94f"`);
    await queryRunner.query(`ALTER TABLE "ModuleItems" ALTER COLUMN "organizationId" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "Questions" DROP CONSTRAINT "FK_3594b03bb41a3dfa3b5601ce0ad"`);
    await queryRunner.query(`ALTER TABLE "Questions" ALTER COLUMN "organizationId" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "Answers" DROP CONSTRAINT "FK_bd66877bf345afa88c7ac760f25"`);
    await queryRunner.query(`ALTER TABLE "Answers" ALTER COLUMN "organizationId" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "AssignmentSubmissions" DROP CONSTRAINT "FK_65674b3b65b4ac62cd73e4a8ee1"`);
    await queryRunner.query(
      `ALTER TYPE "public"."AssignmentSubmissions_resubmission_enum" RENAME TO "AssignmentSubmissions_status_enum_old"`
    );
    await queryRunner.query(
      `CREATE TYPE "AssignmentSubmissions_status_enum" AS ENUM('Draft', 'Submitted', 'Graded', 'Resubmit')`
    );
    await queryRunner.query(`ALTER TABLE "AssignmentSubmissions" ALTER COLUMN "status" DROP DEFAULT`);
    await queryRunner.query(
      `ALTER TABLE "AssignmentSubmissions" ALTER COLUMN "status" TYPE "AssignmentSubmissions_status_enum" USING "status"::"text"::"AssignmentSubmissions_status_enum"`
    );
    await queryRunner.query(`ALTER TABLE "AssignmentSubmissions" ALTER COLUMN "status" SET DEFAULT 'Draft'`);
    await queryRunner.query(`DROP TYPE "AssignmentSubmissions_status_enum_old"`);
    await queryRunner.query(`ALTER TABLE "AssignmentSubmissions" ALTER COLUMN "organizationId" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "CourseManagers" DROP CONSTRAINT "FK_589aca480c62c360a11ce713d97"`);
    await queryRunner.query(`ALTER TABLE "CourseManagers" ALTER COLUMN "organizationId" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "Files" DROP CONSTRAINT "FK_1221481278810083fabc00998a2"`);
    await queryRunner.query(`ALTER TABLE "Files" ALTER COLUMN "organizationId" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "PasswordResets" DROP CONSTRAINT "FK_8066dfbf52a62fb59ba0fddf38a"`);
    await queryRunner.query(`ALTER TABLE "PasswordResets" ALTER COLUMN "organizationId" SET NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "Roles" ADD CONSTRAINT "FK_6f4bf6e1d7b9fbb3a8824e2d9ac" FOREIGN KEY ("organizationId") REFERENCES "Organizations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "UserRoles" ADD CONSTRAINT "FK_5d9c2a56541c061c276ada73d23" FOREIGN KEY ("organizationId") REFERENCES "Organizations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "StudentCourses" ADD CONSTRAINT "FK_e2f1b1433c40de94a71153c333d" FOREIGN KEY ("organizationId") REFERENCES "Organizations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
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
      `ALTER TABLE "GroupMembers" ADD CONSTRAINT "FK_824999b5a7a3cd3b573c7d4dd7f" FOREIGN KEY ("organizationId") REFERENCES "Organizations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "Groups" ADD CONSTRAINT "FK_a90075be409849b37aee9c9610f" FOREIGN KEY ("organizationId") REFERENCES "Organizations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "Users" ADD CONSTRAINT "FK_1612823a86e1cc991e52bd8b664" FOREIGN KEY ("organizationId") REFERENCES "Organizations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "Courses" ADD CONSTRAINT "FK_c47efca7e56913a7495071596c7" FOREIGN KEY ("organizationId") REFERENCES "Organizations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "Modules" ADD CONSTRAINT "FK_b4f3f0fee39ddc2b64b6109ee74" FOREIGN KEY ("organizationId") REFERENCES "Organizations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "ModuleItems" ADD CONSTRAINT "FK_31e6c5890c29399bf792c85b94f" FOREIGN KEY ("organizationId") REFERENCES "Organizations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
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
      `ALTER TABLE "Files" ADD CONSTRAINT "FK_1221481278810083fabc00998a2" FOREIGN KEY ("organizationId") REFERENCES "Organizations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "PasswordResets" ADD CONSTRAINT "FK_8066dfbf52a62fb59ba0fddf38a" FOREIGN KEY ("organizationId") REFERENCES "Organizations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "PasswordResets" DROP CONSTRAINT "FK_8066dfbf52a62fb59ba0fddf38a"`);
    await queryRunner.query(`ALTER TABLE "Files" DROP CONSTRAINT "FK_1221481278810083fabc00998a2"`);
    await queryRunner.query(`ALTER TABLE "CourseManagers" DROP CONSTRAINT "FK_589aca480c62c360a11ce713d97"`);
    await queryRunner.query(`ALTER TABLE "AssignmentSubmissions" DROP CONSTRAINT "FK_65674b3b65b4ac62cd73e4a8ee1"`);
    await queryRunner.query(`ALTER TABLE "Answers" DROP CONSTRAINT "FK_bd66877bf345afa88c7ac760f25"`);
    await queryRunner.query(`ALTER TABLE "Questions" DROP CONSTRAINT "FK_3594b03bb41a3dfa3b5601ce0ad"`);
    await queryRunner.query(`ALTER TABLE "ModuleItems" DROP CONSTRAINT "FK_31e6c5890c29399bf792c85b94f"`);
    await queryRunner.query(`ALTER TABLE "Modules" DROP CONSTRAINT "FK_b4f3f0fee39ddc2b64b6109ee74"`);
    await queryRunner.query(`ALTER TABLE "Courses" DROP CONSTRAINT "FK_c47efca7e56913a7495071596c7"`);
    await queryRunner.query(`ALTER TABLE "Users" DROP CONSTRAINT "FK_1612823a86e1cc991e52bd8b664"`);
    await queryRunner.query(`ALTER TABLE "Groups" DROP CONSTRAINT "FK_a90075be409849b37aee9c9610f"`);
    await queryRunner.query(`ALTER TABLE "GroupMembers" DROP CONSTRAINT "FK_824999b5a7a3cd3b573c7d4dd7f"`);
    await queryRunner.query(`ALTER TABLE "MeetingRoomMembers" DROP CONSTRAINT "FK_5237b8d8d684872f971703b2be1"`);
    await queryRunner.query(`ALTER TABLE "MeetingRooms" DROP CONSTRAINT "FK_6276060dcbb950fa2192887b24d"`);
    await queryRunner.query(`ALTER TABLE "Meetings" DROP CONSTRAINT "FK_6936e05362d215e35f6bd0a3525"`);
    await queryRunner.query(`ALTER TABLE "StudentCourses" DROP CONSTRAINT "FK_e2f1b1433c40de94a71153c333d"`);
    await queryRunner.query(`ALTER TABLE "UserRoles" DROP CONSTRAINT "FK_5d9c2a56541c061c276ada73d23"`);
    await queryRunner.query(`ALTER TABLE "Roles" DROP CONSTRAINT "FK_6f4bf6e1d7b9fbb3a8824e2d9ac"`);
    await queryRunner.query(`ALTER TABLE "PasswordResets" ALTER COLUMN "organizationId" DROP NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "PasswordResets" ADD CONSTRAINT "FK_8066dfbf52a62fb59ba0fddf38a" FOREIGN KEY ("organizationId") REFERENCES "Organizations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(`ALTER TABLE "Files" ALTER COLUMN "organizationId" DROP NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "Files" ADD CONSTRAINT "FK_1221481278810083fabc00998a2" FOREIGN KEY ("organizationId") REFERENCES "Organizations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(`ALTER TABLE "CourseManagers" ALTER COLUMN "organizationId" DROP NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "CourseManagers" ADD CONSTRAINT "FK_589aca480c62c360a11ce713d97" FOREIGN KEY ("organizationId") REFERENCES "Organizations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(`ALTER TABLE "AssignmentSubmissions" ALTER COLUMN "organizationId" DROP NOT NULL`);
    await queryRunner.query(`CREATE TYPE "AssignmentSubmissions_status_enum_old" AS ENUM()`);
    await queryRunner.query(`ALTER TABLE "AssignmentSubmissions" ALTER COLUMN "status" DROP DEFAULT`);
    await queryRunner.query(
      `ALTER TABLE "AssignmentSubmissions" ALTER COLUMN "status" TYPE "AssignmentSubmissions_status_enum_old" USING "status"::"text"::"AssignmentSubmissions_status_enum_old"`
    );
    await queryRunner.query(`ALTER TABLE "AssignmentSubmissions" ALTER COLUMN "status" SET DEFAULT 'Draft'`);
    await queryRunner.query(`DROP TYPE "AssignmentSubmissions_status_enum"`);
    await queryRunner.query(
      `ALTER TYPE "AssignmentSubmissions_status_enum_old" RENAME TO  "AssignmentSubmissions_resubmission_enum"`
    );
    await queryRunner.query(
      `ALTER TABLE "AssignmentSubmissions" ADD CONSTRAINT "FK_65674b3b65b4ac62cd73e4a8ee1" FOREIGN KEY ("organizationId") REFERENCES "Organizations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(`ALTER TABLE "Answers" ALTER COLUMN "organizationId" DROP NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "Answers" ADD CONSTRAINT "FK_bd66877bf345afa88c7ac760f25" FOREIGN KEY ("organizationId") REFERENCES "Organizations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(`ALTER TABLE "Questions" ALTER COLUMN "organizationId" DROP NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "Questions" ADD CONSTRAINT "FK_3594b03bb41a3dfa3b5601ce0ad" FOREIGN KEY ("organizationId") REFERENCES "Organizations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(`ALTER TABLE "ModuleItems" ALTER COLUMN "organizationId" DROP NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "ModuleItems" ADD CONSTRAINT "FK_31e6c5890c29399bf792c85b94f" FOREIGN KEY ("organizationId") REFERENCES "Organizations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(`ALTER TABLE "Modules" ALTER COLUMN "organizationId" DROP NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "Modules" ADD CONSTRAINT "FK_b4f3f0fee39ddc2b64b6109ee74" FOREIGN KEY ("organizationId") REFERENCES "Organizations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(`ALTER TABLE "Courses" ALTER COLUMN "organizationId" DROP NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "Courses" ADD CONSTRAINT "FK_c47efca7e56913a7495071596c7" FOREIGN KEY ("organizationId") REFERENCES "Organizations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(`ALTER TABLE "Users" ALTER COLUMN "organizationId" DROP NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "Users" ADD CONSTRAINT "FK_1612823a86e1cc991e52bd8b664" FOREIGN KEY ("organizationId") REFERENCES "Organizations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(`ALTER TABLE "Groups" ALTER COLUMN "organizationId" DROP NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "Groups" ADD CONSTRAINT "FK_a90075be409849b37aee9c9610f" FOREIGN KEY ("organizationId") REFERENCES "Organizations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(`ALTER TABLE "GroupMembers" ALTER COLUMN "organizationId" DROP NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "GroupMembers" ADD CONSTRAINT "FK_824999b5a7a3cd3b573c7d4dd7f" FOREIGN KEY ("organizationId") REFERENCES "Organizations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(`ALTER TABLE "MeetingRoomMembers" ALTER COLUMN "organizationId" DROP NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "MeetingRoomMembers" ADD CONSTRAINT "FK_5237b8d8d684872f971703b2be1" FOREIGN KEY ("organizationId") REFERENCES "Organizations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(`ALTER TABLE "MeetingRooms" ALTER COLUMN "organizationId" DROP NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "MeetingRooms" ADD CONSTRAINT "FK_6276060dcbb950fa2192887b24d" FOREIGN KEY ("organizationId") REFERENCES "Organizations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(`ALTER TABLE "Meetings" ALTER COLUMN "organizationId" DROP NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "Meetings" ADD CONSTRAINT "FK_6936e05362d215e35f6bd0a3525" FOREIGN KEY ("organizationId") REFERENCES "Organizations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(`ALTER TABLE "StudentCourses" ALTER COLUMN "organizationId" DROP NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "StudentCourses" ADD CONSTRAINT "FK_e2f1b1433c40de94a71153c333d" FOREIGN KEY ("organizationId") REFERENCES "Organizations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(`ALTER TABLE "UserRoles" ALTER COLUMN "organizationId" DROP NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "UserRoles" ADD CONSTRAINT "FK_5d9c2a56541c061c276ada73d23" FOREIGN KEY ("organizationId") REFERENCES "Organizations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(`ALTER TABLE "Roles" ALTER COLUMN "organizationId" DROP NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "Roles" ADD CONSTRAINT "FK_6f4bf6e1d7b9fbb3a8824e2d9ac" FOREIGN KEY ("organizationId") REFERENCES "Organizations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }
}
