import React from 'react';
import Table from '@doorward/ui/components/Table';
import AssessmentSubmissionEntity from '@doorward/common/entities/assessment.submission.entity';
import translate from '@doorward/common/lang/translate';
import Tools from '@doorward/common/utils/Tools';
import { AssessmentSubmissionStatus } from '@doorward/common/types/courses';
import { AssessmentSubmissionResult } from '@doorward/common/types/assessments';
import DisplayLabel from '@doorward/ui/components/DisplayLabel';

const calculateGrade = (submission: AssessmentSubmissionEntity): number => {
  const results = JSON.parse(submission.submissionResults) as AssessmentSubmissionResult;

  return (results.totalPoints * 100) / submission.grade;
};

const StudentsAssessmentSubmissionTable: React.FunctionComponent<StudentsAssessmentSubmissionTableProps> = (
  props
): JSX.Element => {
  return (
    <div className="ed-students-assessment-submission-table">
      <Table
        height={500}
        data={props.submissions}
        rowHeight={50}
        onRowClick={(rowData) => props.onClickSubmission(rowData.rowData)}
        columns={{
          student: {
            title: translate('student'),
            cellRenderer: (cell) => Tools.str(cell.cellData?.fullName),
          },
          email: {
            title: translate('email'),
            cellRenderer: (cell) => Tools.str(cell.rowData.student?.email),
          },
          gradedOn: {
            title: translate('gradedOn'),
          },
          grade: {
            title: translate('grade'),
            cellRenderer: (cell) =>
              Tools.str(cell.rowData.status === AssessmentSubmissionStatus.GRADED ? calculateGrade(cell.rowData) : ''),
          },
          gradedBy: {
            title: translate('gradedBy'),
            cellRenderer: (cell) => {
              const graded = cell.rowData.status === AssessmentSubmissionStatus.GRADED;

              return Tools.str(graded ? cell.cellData?.fullName || translate('systemGraded') : '');
            },
          },
          submittedOn: {
            title: translate('submittedOn'),
            cellRenderer: (cell) => Tools.normalDateTime(cell.cellData),
          },
          graded: {
            title: translate('status'),
            cellRenderer: (cell) => {
              const graded = cell.rowData.status === AssessmentSubmissionStatus.GRADED;
              return <DisplayLabel>{translate(graded ? 'graded' : 'notYetGraded')}</DisplayLabel>;
            },
          },
        }}
      />
    </div>
  );
};

export interface StudentsAssessmentSubmissionTableProps {
  submissions: Array<AssessmentSubmissionEntity>;
  onClickSubmission: (submission: AssessmentSubmissionEntity) => void;
}

export default StudentsAssessmentSubmissionTable;
