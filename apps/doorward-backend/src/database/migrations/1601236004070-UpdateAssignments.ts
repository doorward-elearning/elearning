import { MigrationInterface, QueryRunner } from 'typeorm';
import { AssignmentEntity } from '@doorward/common/entities/assignment.entity';

export class UpdateAssignments1601236004070 implements MigrationInterface {
  name = 'UpdateAssignments1601236004070';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "ModuleItems" ADD "assignment" character varying`);
    const repository = queryRunner.manager.getRepository(AssignmentEntity);

    const assignments = await queryRunner.query(`SELECT * FROM "ModuleItems" WHERE type = $1`, ['Assignment']);

    await Promise.all(
      assignments.map(async (assignment) => {
        const { assignment: assignmentContent, ...options }: any = JSON.parse(assignment.content);

        await queryRunner.query(`UPDATE "ModuleItems" SET options = $1, assignment = $2 WHERE id = $3`, [
          options,
          JSON.stringify(assignmentContent),
          assignment.id,
        ]);
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const assignments = await queryRunner.query(`SELECT * FROM "ModuleItems" WHERE type = $1`, ['Assignment']);

    await Promise.all(
      assignments.map(async (assignment) => {
        await queryRunner.query(`UPDATE "ModuleItems" SET content = $1 WHERE id = $2`, [
          JSON.stringify({
            ...assignment.options,
            assignment: assignment.assignment,
          }),
          assignment.id,
        ]);
      })
    );
    await queryRunner.query(`ALTER TABLE "ModuleItems" DROP COLUMN "assignment"`);
  }
}
