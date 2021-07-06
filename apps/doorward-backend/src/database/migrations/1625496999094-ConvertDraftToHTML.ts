import { MigrationInterface, QueryRunner } from 'typeorm';
import { convertFromRaw, convertToRaw } from 'draft-js';

const stateFromHTML = require('draft-js-import-html').stateFromHTML;

const draftToHTML = require('draftjs-to-html');
const JSDOM = require('jsdom').JSDOM;

const transformFunctions = {
  fromHTML: (html) => {
    if (html) {
      try {
        const dom = new JSDOM(html);
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        global.document = dom.window.document;

        const contentState = stateFromHTML(html);

        const rawContent = convertToRaw(contentState);

        return JSON.stringify(rawContent);
      } catch (error) {
        console.error(error);
      }
    }
    return html;
  },
  toHTML: (draftContent: string) => {
    if (draftContent) {
      try {
        const contentState = convertFromRaw(JSON.parse(draftContent));

        const rawContentState = convertToRaw(contentState);

        return draftToHTML(rawContentState);
      } catch (error) {
        console.error(error);
      }
    }
    return draftContent;
  },
};

const updateColumn = async (
  queryRunner: QueryRunner,
  tableName: string,
  columnName: string,
  updateFunction: (prevValue: string) => string
) => {
  const rows = await queryRunner.query(`SELECT id, "${columnName}" FROM "${tableName}"`);

  await Promise.all(
    rows.map(async (row) => {
      const prevValue = row[columnName];

      const newValue = updateFunction(prevValue);

      await queryRunner.query(`UPDATE "${tableName}" SET "${columnName}" = $1 WHERE id = $2`, [newValue, row.id]);
    })
  );
};

export class ConvertDraftToHTML1625496999094 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await updateColumn(queryRunner, 'Questions', 'question', transformFunctions.toHTML);
    await updateColumn(queryRunner, 'Answers', 'answer', transformFunctions.toHTML);
    await updateColumn(queryRunner, 'AssessmentSubmission', 'submission', (submission) => {
      try {
        const submissionJSON = JSON.parse(submission);

        Object.keys(submissionJSON).forEach((question) => {
          submissionJSON[question] = transformFunctions.toHTML(submissionJSON[question]);
        });

        return JSON.stringify(submissionJSON);
      } catch (error) {
        return submission;
      }
    });
    await updateColumn(queryRunner, 'DiscussionGroups', 'description', transformFunctions.toHTML);
    await updateColumn(queryRunner, 'ModuleItems', 'instructions', transformFunctions.toHTML);
    await updateColumn(queryRunner, 'ModuleItems', 'assignment', transformFunctions.toHTML);
    await updateColumn(queryRunner, 'ModuleItems', 'page', transformFunctions.toHTML);
    await updateColumn(queryRunner, 'QuestionSections', 'instructions', transformFunctions.toHTML);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await updateColumn(queryRunner, 'Questions', 'question', transformFunctions.fromHTML);
    await updateColumn(queryRunner, 'Answers', 'answer', transformFunctions.fromHTML);
    await updateColumn(queryRunner, 'AssessmentSubmission', 'submission', (submission) => {
      try {
        const submissionJSON = JSON.parse(submission);

        Object.keys(submissionJSON).forEach((question) => {
          if (submissionJSON[question].startsWith('<')) {
            submissionJSON[question] = transformFunctions.fromHTML(submissionJSON[question]);
          }
        });

        return JSON.stringify(submissionJSON);
      } catch (error) {
        return submission;
      }
    });
    await updateColumn(queryRunner, 'DiscussionGroups', 'description', transformFunctions.fromHTML);
    await updateColumn(queryRunner, 'ModuleItems', 'instructions', transformFunctions.fromHTML);
    await updateColumn(queryRunner, 'ModuleItems', 'assignment', transformFunctions.fromHTML);
    await updateColumn(queryRunner, 'ModuleItems', 'page', transformFunctions.fromHTML);
    await updateColumn(queryRunner, 'QuestionSections', 'instructions', transformFunctions.fromHTML);
  }
}
