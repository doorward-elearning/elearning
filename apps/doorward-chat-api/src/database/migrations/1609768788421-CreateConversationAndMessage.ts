import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateConversationAndMessage1609768788421 implements MigrationInterface {
    name = 'CreateConversationAndMessage1609768788421'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "ChatMessages_status_enum" AS ENUM('0', '1', '2', '3', '4')`);
        await queryRunner.query(`CREATE TABLE "ChatMessages" ("id" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "text" character varying NOT NULL, "status" "ChatMessages_status_enum" NOT NULL DEFAULT '0', "deliveredAt" TIMESTAMP, "readAt" TIMESTAMP, "conversationId" character varying, "senderId" character varying, CONSTRAINT "PK_55cbfe04f86a557414495c8b273" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Conversations" ("id" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "title" character varying NOT NULL, "avatar" character varying NOT NULL, "directMessage" boolean NOT NULL DEFAULT true, "groupId" character varying, CONSTRAINT "REL_049a6f210c3bdaab956caa89ae" UNIQUE ("groupId"), CONSTRAINT "PK_44f6c6ade92598cd70087acf2a1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "ChatMessages" ADD CONSTRAINT "FK_7a27218c621e959b6ba6d64ed2e" FOREIGN KEY ("conversationId") REFERENCES "Conversations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ChatMessages" ADD CONSTRAINT "FK_4a68f02e80dd448a69ee7458b09" FOREIGN KEY ("senderId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Conversations" ADD CONSTRAINT "FK_049a6f210c3bdaab956caa89ae5" FOREIGN KEY ("groupId") REFERENCES "Groups"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Conversations" DROP CONSTRAINT "FK_049a6f210c3bdaab956caa89ae5"`);
        await queryRunner.query(`ALTER TABLE "ChatMessages" DROP CONSTRAINT "FK_4a68f02e80dd448a69ee7458b09"`);
        await queryRunner.query(`ALTER TABLE "ChatMessages" DROP CONSTRAINT "FK_7a27218c621e959b6ba6d64ed2e"`);
        await queryRunner.query(`DROP TABLE "Conversations"`);
        await queryRunner.query(`DROP TABLE "ChatMessages"`);
        await queryRunner.query(`DROP TYPE "ChatMessages_status_enum"`);
    }

}
