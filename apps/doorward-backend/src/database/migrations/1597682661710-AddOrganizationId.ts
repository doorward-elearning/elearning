import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddOrganizationId1597682661710 implements MigrationInterface {
  name = 'AddOrganizationId1597682661710';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "Groups" DROP CONSTRAINT IF EXISTS "FK_6e79fe439029d8b47071c5ba638"`);
    await queryRunner.query(`ALTER TABLE "UserRoles" ADD "organizationId" character varying`);
    await queryRunner.query(`ALTER TABLE "StudentCourses" ADD "organizationId" character varying`);
    await queryRunner.query(`ALTER TABLE "Meetings" ADD "organizationId" character varying`);
    await queryRunner.query(`ALTER TABLE "MeetingRooms" ADD "organizationId" character varying`);
    await queryRunner.query(`ALTER TABLE "MeetingRoomMembers" ADD "organizationId" character varying`);
    await queryRunner.query(`ALTER TABLE "GroupMembers" ADD "organizationId" character varying`);
    await queryRunner.query(`ALTER TABLE "Courses" ADD "organizationId" character varying`);
    await queryRunner.query(`ALTER TABLE "Modules" ADD "organizationId" character varying`);
    await queryRunner.query(`ALTER TABLE "ModuleItems" ADD "organizationId" character varying`);
    await queryRunner.query(`ALTER TABLE "Questions" ADD "organizationId" character varying`);
    await queryRunner.query(`ALTER TABLE "Answers" ADD "organizationId" character varying`);
    await queryRunner.query(`ALTER TABLE "PasswordResets" ADD "organizationId" character varying`);
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
      `ALTER TABLE "Groups" ADD CONSTRAINT "FK_99a38bd7adba412daa8be562f32" FOREIGN KEY ("createdBy") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
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
      `ALTER TABLE "PasswordResets" ADD CONSTRAINT "FK_8066dfbf52a62fb59ba0fddf38a" FOREIGN KEY ("organizationId") REFERENCES "Organizations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "PasswordResets" DROP CONSTRAINT IF EXISTS "FK_8066dfbf52a62fb59ba0fddf38a"`);
    await queryRunner.query(`ALTER TABLE "Answers" DROP CONSTRAINT IF EXISTS "FK_bd66877bf345afa88c7ac760f25"`);
    await queryRunner.query(`ALTER TABLE "Questions" DROP CONSTRAINT IF EXISTS "FK_3594b03bb41a3dfa3b5601ce0ad"`);
    await queryRunner.query(`ALTER TABLE "ModuleItems" DROP CONSTRAINT IF EXISTS "FK_31e6c5890c29399bf792c85b94f"`);
    await queryRunner.query(`ALTER TABLE "Modules" DROP CONSTRAINT IF EXISTS "FK_b4f3f0fee39ddc2b64b6109ee74"`);
    await queryRunner.query(`ALTER TABLE "Courses" DROP CONSTRAINT IF EXISTS "FK_c47efca7e56913a7495071596c7"`);
    await queryRunner.query(`ALTER TABLE "Groups" DROP CONSTRAINT IF EXISTS "FK_99a38bd7adba412daa8be562f32"`);
    await queryRunner.query(`ALTER TABLE "GroupMembers" DROP CONSTRAINT IF EXISTS "FK_824999b5a7a3cd3b573c7d4dd7f"`);
    await queryRunner.query(
      `ALTER TABLE "MeetingRoomMembers" DROP CONSTRAINT IF EXISTS "FK_5237b8d8d684872f971703b2be1"`
    );
    await queryRunner.query(`ALTER TABLE "MeetingRooms" DROP CONSTRAINT IF EXISTS "FK_6276060dcbb950fa2192887b24d"`);
    await queryRunner.query(`ALTER TABLE "Meetings" DROP CONSTRAINT IF EXISTS "FK_6936e05362d215e35f6bd0a3525"`);
    await queryRunner.query(`ALTER TABLE "StudentCourses" DROP CONSTRAINT IF EXISTS "FK_e2f1b1433c40de94a71153c333d"`);
    await queryRunner.query(`ALTER TABLE "UserRoles" DROP CONSTRAINT IF EXISTS "FK_5d9c2a56541c061c276ada73d23"`);
    await queryRunner.query(`ALTER TABLE "PasswordResets" DROP COLUMN "organizationId"`);
    await queryRunner.query(`ALTER TABLE "Answers" DROP COLUMN "organizationId"`);
    await queryRunner.query(`ALTER TABLE "Questions" DROP COLUMN "organizationId"`);
    await queryRunner.query(`ALTER TABLE "ModuleItems" DROP COLUMN "organizationId"`);
    await queryRunner.query(`ALTER TABLE "Modules" DROP COLUMN "organizationId"`);
    await queryRunner.query(`ALTER TABLE "Courses" DROP COLUMN "organizationId"`);
    await queryRunner.query(`ALTER TABLE "GroupMembers" DROP COLUMN "organizationId"`);
    await queryRunner.query(`ALTER TABLE "MeetingRoomMembers" DROP COLUMN "organizationId"`);
    await queryRunner.query(`ALTER TABLE "MeetingRooms" DROP COLUMN "organizationId"`);
    await queryRunner.query(`ALTER TABLE "Meetings" DROP COLUMN "organizationId"`);
    await queryRunner.query(`ALTER TABLE "StudentCourses" DROP COLUMN "organizationId"`);
    await queryRunner.query(`ALTER TABLE "UserRoles" DROP COLUMN "organizationId"`);
    await queryRunner.query(
      `ALTER TABLE "Groups" ADD CONSTRAINT "FK_6e79fe439029d8b47071c5ba638" FOREIGN KEY ("createdBy") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }
}
