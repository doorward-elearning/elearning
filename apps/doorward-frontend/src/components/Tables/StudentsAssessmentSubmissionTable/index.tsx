import React from 'react';
import Table from '@doorward/ui/components/Table';
import AssessmentSubmissionEntity from '@doorward/common/entities/assessment.submission.entity';
import translate from '@doorward/common/lang/translate';
import Tools from '@doorward/common/utils/Tools';
import { AssessmentSubmissionStatus } from '@doorward/common/types/courses';
import { AssessmentSubmissionResult } from '@doorward/common/types/assessments';
import DisplayLabel from '@doorward/ui/components/DisplayLabel';
import { DisplayDeviceType } from '@doorward/ui/hooks/useResponsiveness';

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
            minDisplay: DisplayDeviceType.DESKTOP,
          },
          marks: {
            title: translate('marksObtained'),
            cellRenderer: (cell) => {
              return Tools.str(cell.rowData.status === AssessmentSubmissionStatus.GRADED ? cell.rowData.grade : '');
            },
            minDisplay: DisplayDeviceType.DESKTOP,
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
