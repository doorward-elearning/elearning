import {MigrationInterface, QueryRunner} from "typeorm";

export class AddConfiguratiionToQuestion1627453754939 implements MigrationInterface {
    name = 'AddConfiguratiionToQuestion1627453754939'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ChatMessageActivityEntity" ("id" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "deliveredAt" TIMESTAMP, "readAt" TIMESTAMP, "messageId" character varying, "userId" character varying, CONSTRAINT "PK_f0bb1b22b0b6a8d6d8ecc062fa9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "ChatMessages_status_enum" AS ENUM('0', '1', '2', '3', '4')`);
        await queryRunner.query(`CREATE TABLE "ChatMessages" ("id" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "text" character varying NOT NULL, "status" "ChatMessages_status_enum" NOT NULL DEFAULT '0', "numRecipients" integer NOT NULL DEFAULT 0, "numDelivered" integer NOT NULL DEFAULT 0, "numRead" integer NOT NULL DEFAULT 0, "conversationId" character varying, "senderId" character varying, CONSTRAINT "PK_55cbfe04f86a557414495c8b273" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Conversations" ("id" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "title" character varying NOT NULL, "avatar" character varying NOT NULL, "directMessage" boolean NOT NULL DEFAULT true, "groupId" character varying, CONSTRAINT "REL_049a6f210c3bdaab956caa89ae" UNIQUE ("groupId"), CONSTRAINT "PK_44f6c6ade92598cd70087acf2a1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Questions" ADD "config" json NOT NULL`);
        await queryRunner.query(`ALTER TABLE "QuestionSections" ALTER COLUMN "config" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "ChatMessageActivityEntity" ADD CONSTRAINT "FK_f6614f8c503a20b14ce861bbdeb" FOREIGN KEY ("messageId") REFERENCES "ChatMessages"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ChatMessageActivityEntity" ADD CONSTRAINT "FK_6c16ab7caf112276e800c2469db" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ChatMessages" ADD CONSTRAINT "FK_7a27218c621e959b6ba6d64ed2e" FOREIGN KEY ("conversationId") REFERENCES "Conversations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ChatMessages" ADD CONSTRAINT "FK_4a68f02e80dd448a69ee7458b09" FOREIGN KEY ("senderId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Conversations" ADD CONSTRAINT "FK_049a6f210c3bdaab956caa89ae5" FOREIGN KEY ("groupId") REFERENCES "Groups"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Conversations" DROP CONSTRAINT "FK_049a6f210c3bdaab956caa89ae5"`);
        await queryRunner.query(`ALTER TABLE "ChatMessages" DROP CONSTRAINT "FK_4a68f02e80dd448a69ee7458b09"`);
        await queryRunner.query(`ALTER TABLE "ChatMessages" DROP CONSTRAINT "FK_7a27218c621e959b6ba6d64ed2e"`);
        await queryRunner.query(`ALTER TABLE "ChatMessageActivityEntity" DROP CONSTRAINT "FK_6c16ab7caf112276e800c2469db"`);
        await queryRunner.query(`ALTER TABLE "ChatMessageActivityEntity" DROP CONSTRAINT "FK_f6614f8c503a20b14ce861bbdeb"`);
        await queryRunner.query(`ALTER TABLE "QuestionSections" ALTER COLUMN "config" SET DEFAULT '{}'`);
        await queryRunner.query(`ALTER TABLE "Questions" DROP COLUMN "config"`);
        await queryRunner.query(`DROP TABLE "Conversations"`);
        await queryRunner.query(`DROP TABLE "ChatMessages"`);
        await queryRunner.query(`DROP TYPE "ChatMessages_status_enum"`);
        await queryRunner.query(`DROP TABLE "ChatMessageActivityEntity"`);
    }

}
