import { MigrationInterface, QueryRunner } from 'typeorm';
import { AssignmentEntity } from '@doorward/common/entities/assignment.entity';

export class UpdateAssignmentTypesToBeArray1601624124733 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const repository = queryRunner.manager.getRepository(AssignmentEntity);

    const assignments = await repository.find();

    await Promise.all(
      assignments.map(async (assignment) => {
        const options = assignment.options;
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        const submissionTypes: any = options.submissionTypes || options.submissionType;
        if (submissionTypes && !(submissionTypes instanceof Array)) {
          options.submissionTypes = [submissionTypes];
        } else {
          options.submissionTypes = submissionTypes || [];
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        delete options.submissionType;
        await repository.update(assignment.id, {
          options,
        });
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
