import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateAssignmentTypesToBeArray1601624124733 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const assignments = await queryRunner.manager.query('SELECT * FROM "ModuleItems" WHERE type = $1', ['Assignment']);

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

        await queryRunner.manager.query('UPDATE "ModuleItems" SET options = $1 WHERE id = $2', [
          options,
          assignment.id,
        ]);
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
