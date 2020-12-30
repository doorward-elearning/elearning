import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateConversationAndMessage1609308368637 implements MigrationInterface {
  name = 'CreateConversationAndMessage1609308368637';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "Conversation" ("id" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "title" character varying NOT NULL, "avatar" character varying NOT NULL, "directMessage" boolean NOT NULL DEFAULT true, "organizationId" character varying NOT NULL, "createdBy" character varying, "groupId" character varying NOT NULL, "groupCreatedat" TIMESTAMP NOT NULL DEFAULT now(), "groupUpdatedat" TIMESTAMP NOT NULL DEFAULT now(), "groupDeletedat" TIMESTAMP, "groupName" character varying NOT NULL, "groupType" character varying, CONSTRAINT "PK_dbddba114b95fadaaa5a1633efe" PRIMARY KEY ("id", "groupId"))`
    );
    await queryRunner.query(`CREATE TYPE "ChatMessage_status_enum" AS ENUM('0', '1', '2', '3', '4')`);
    await queryRunner.query(
      `CREATE TABLE "ChatMessage" ("id" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "text" character varying NOT NULL, "status" "ChatMessage_status_enum" NOT NULL DEFAULT '0', "conversationId" character varying, CONSTRAINT "PK_2d2bc310daa393ef9cedf6887c3" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "Conversation" ADD CONSTRAINT "FK_e1c44508cb037ead1f76a3eacba" FOREIGN KEY ("organizationId") REFERENCES "Organizations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "Conversation" ADD CONSTRAINT "FK_e133bf3611204776ba700c7b64c" FOREIGN KEY ("createdBy") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "ChatMessage" ADD CONSTRAINT "FK_6b08b6a7f245318eb7341e6dcac" FOREIGN KEY ("conversationId", "conversationId") REFERENCES "Conversation"("id","groupId") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "ChatMessage" DROP CONSTRAINT "FK_6b08b6a7f245318eb7341e6dcac"`);
    await queryRunner.query(`ALTER TABLE "Conversation" DROP CONSTRAINT "FK_e133bf3611204776ba700c7b64c"`);
    await queryRunner.query(`ALTER TABLE "Conversation" DROP CONSTRAINT "FK_e1c44508cb037ead1f76a3eacba"`);
    await queryRunner.query(`DROP TABLE "ChatMessage"`);
    await queryRunner.query(`DROP TYPE "ChatMessage_status_enum"`);
    await queryRunner.query(`DROP TABLE "Conversation"`);
  }
}
