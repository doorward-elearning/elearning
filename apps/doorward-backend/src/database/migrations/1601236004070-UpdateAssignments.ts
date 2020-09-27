import { MigrationInterface, QueryRunner } from 'typeorm';
import { AssignmentEntity } from '@doorward/common/entities/assignment.entity';

export class UpdateAssignments1601236004070 implements MigrationInterface {
  name = 'UpdateAssignments1601236004070';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "ModuleItems" ADD "assignment" character varying`);
    const repository = queryRunner.manager.getRepository(AssignmentEntity);

    const assignments = await repository.find();

    await Promise.all(
      assignments.map(async (assignment) => {
        const { assignment: assignmentContent, ...options }: any = JSON.parse(assignment.content);

        await repository.update(assignment.id, {
          options,
          assignment: JSON.stringify(assignmentContent),
        });
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const repository = queryRunner.manager.getRepository(AssignmentEntity);
    const assignments = await repository.find();

    await Promise.all(
      assignments.map(async (assignment) => {
        await repository.update(assignment.id, {
          content: JSON.stringify({
            ...assignment.options,
            assignment: assignment.assignment,
          }),
        });
      })
    );
    await queryRunner.query(`ALTER TABLE "ModuleItems" DROP COLUMN "assignment"`);
  }
}
