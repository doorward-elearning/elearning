import {MigrationInterface, QueryRunner} from "typeorm";

export class InitializeDatabase1596895180884 implements MigrationInterface {
    name = 'InitializeDatabase1596895180884'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "capabilities" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "capability" character varying NOT NULL, "name" character varying NOT NULL, "description" text NOT NULL, CONSTRAINT "PK_c94fe6cafdb7646522a915893fd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "users_role_enum" AS ENUM('PUBLISHER', 'SUBSCRIBER', 'MODERATOR')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "fullName" character varying NOT NULL, "avatar" character varying NOT NULL, "role" "users_role_enum" NOT NULL DEFAULT 'PUBLISHER', "data" character varying NOT NULL, "screen_token" character varying NOT NULL, "webcam_token" character varying NOT NULL, "raising_hand" boolean NOT NULL, "meetingId" uuid, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "whiteboards" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "state" text NOT NULL, "active" boolean NOT NULL, "createdById" uuid, "meetingId" uuid, CONSTRAINT "REL_6a928e497bc596e031cc3284d4" UNIQUE ("createdById"), CONSTRAINT "PK_c9b7a16e551b6190f23ad5741a2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "meetings" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "sessionId" character varying NOT NULL, "darkThemeLogo" character varying NOT NULL, "logo" character varying NOT NULL, CONSTRAINT "PK_aa73be861afa77eb4ed31f3ed57" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_capabilities" ("usersId" uuid NOT NULL, "capabilitiesId" uuid NOT NULL, CONSTRAINT "PK_0c929055a3a4c0412c23d80c333" PRIMARY KEY ("usersId", "capabilitiesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_5e2cab9b614d05f3d572a730c2" ON "user_capabilities" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_2d4e090debf422980f1f1d27ce" ON "user_capabilities" ("capabilitiesId") `);
        await queryRunner.query(`CREATE TABLE "meeting_capabilities" ("meetingsId" uuid NOT NULL, "capabilitiesId" uuid NOT NULL, CONSTRAINT "PK_d90b7b05bf79767914bcb5d5147" PRIMARY KEY ("meetingsId", "capabilitiesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_83e71f334670ff15fb11cdc966" ON "meeting_capabilities" ("meetingsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_917b86ce6b9fe9c32947b61e23" ON "meeting_capabilities" ("capabilitiesId") `);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_97cf4b5e1027545e209a527d6d3" FOREIGN KEY ("meetingId") REFERENCES "meetings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "whiteboards" ADD CONSTRAINT "FK_6a928e497bc596e031cc3284d4a" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "whiteboards" ADD CONSTRAINT "FK_1ee94bb02a50917d4cca107f4f7" FOREIGN KEY ("meetingId") REFERENCES "meetings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_capabilities" ADD CONSTRAINT "FK_5e2cab9b614d05f3d572a730c2a" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_capabilities" ADD CONSTRAINT "FK_2d4e090debf422980f1f1d27ce6" FOREIGN KEY ("capabilitiesId") REFERENCES "capabilities"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "meeting_capabilities" ADD CONSTRAINT "FK_83e71f334670ff15fb11cdc9667" FOREIGN KEY ("meetingsId") REFERENCES "meetings"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "meeting_capabilities" ADD CONSTRAINT "FK_917b86ce6b9fe9c32947b61e230" FOREIGN KEY ("capabilitiesId") REFERENCES "capabilities"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "meeting_capabilities" DROP CONSTRAINT "FK_917b86ce6b9fe9c32947b61e230"`);
        await queryRunner.query(`ALTER TABLE "meeting_capabilities" DROP CONSTRAINT "FK_83e71f334670ff15fb11cdc9667"`);
        await queryRunner.query(`ALTER TABLE "user_capabilities" DROP CONSTRAINT "FK_2d4e090debf422980f1f1d27ce6"`);
        await queryRunner.query(`ALTER TABLE "user_capabilities" DROP CONSTRAINT "FK_5e2cab9b614d05f3d572a730c2a"`);
        await queryRunner.query(`ALTER TABLE "whiteboards" DROP CONSTRAINT "FK_1ee94bb02a50917d4cca107f4f7"`);
        await queryRunner.query(`ALTER TABLE "whiteboards" DROP CONSTRAINT "FK_6a928e497bc596e031cc3284d4a"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_97cf4b5e1027545e209a527d6d3"`);
        await queryRunner.query(`DROP INDEX "IDX_917b86ce6b9fe9c32947b61e23"`);
        await queryRunner.query(`DROP INDEX "IDX_83e71f334670ff15fb11cdc966"`);
        await queryRunner.query(`DROP TABLE "meeting_capabilities"`);
        await queryRunner.query(`DROP INDEX "IDX_2d4e090debf422980f1f1d27ce"`);
        await queryRunner.query(`DROP INDEX "IDX_5e2cab9b614d05f3d572a730c2"`);
        await queryRunner.query(`DROP TABLE "user_capabilities"`);
        await queryRunner.query(`DROP TABLE "meetings"`);
        await queryRunner.query(`DROP TABLE "whiteboards"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "users_role_enum"`);
        await queryRunner.query(`DROP TABLE "capabilities"`);
    }

}
