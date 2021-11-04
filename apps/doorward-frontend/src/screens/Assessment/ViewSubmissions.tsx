import React, { useEffect, useState } from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import { PageComponent } from '@doorward/ui/types';
import { useRouteMatch } from 'react-router';
import useApiAction from '@doorward/api-actions/hooks/useApiAction';
import DoorwardApi from '../../services/apis/doorward.api';
import translate from '@doorward/common/lang/translate';
import WebComponent from '@doorward/ui/components/WebComponent';
import StudentsAssessmentSubmissionTable from '../../components/Tables/StudentsAssessmentSubmissionTable';
import useNavigation from '@doorward/ui/hooks/useNavigation';
import ROUTES from '@doorward/common/frontend/routes/main';
import Dropdown from '@doorward/ui/components/Dropdown';
import Row from '@doorward/ui/components/Row';
import Header from '@doorward/ui/components/Header';
import { CSVLink } from 'react-csv';
import Tools from '@doorward/common/utils/Tools';
import { AssessmentSubmissionResult } from '@doorward/common/types/assessments';
import FileSaver from 'file-saver';
import XLSX from 'xlsx';

const ViewSubmissions: React.FunctionComponent<ViewSubmissionsProps> = (props): JSX.Element => {
  const match = useRouteMatch<{ assessmentId: string }>();
  const navigation = useNavigation();
  const [getAssessment, assessmentState] = useApiAction(DoorwardApi, (api) => api.moduleItems.getModuleItem);
  const [getSubmissions, submissionsState] = useApiAction(DoorwardApi, (api) => api.assessments.getStudentSubmissions);
  const [data, setData] = useState([]);
  const [results, setResults] = useState<AssessmentSubmissionResult>();

  useEffect(() => {
    if (match.params.assessmentId) {
      getAssessment(match.params.assessmentId);
      getSubmissions(match.params.assessmentId);
    }
  }, [match.params]);

  useEffect(() => {
    if (submissionsState.data?.submissions) {
      data.pop();
      submissionsState.data.submissions.map((submission) => {
        setResults(JSON.parse(submission.submissionResults));
        data.push({
          Student: submission.student.fullName,
          Email: submission.student.email,
          MarksObtained: submission.grade,
          TotalMarks: results?.totalPoints,
          Percentage: ((+submission.grade / +results?.totalPoints) * 100).toFixed(1),
          GraddedOn: Tools.normalDateTime(submission.gradedOn),
          Status: submission.status,
          SubmittedOn: Tools.normalDateTime(submission.submittedOn),
        });
      });
    }
  }, [submissionsState]);

  const exportExcelFile = (data) => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
    const fileName = 'Results';
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blobData = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(blobData, fileName + fileExtension);
  };

  return (
    <Layout
      {...props}
      features={[LayoutFeatures.HEADER, LayoutFeatures.BACK_BUTTON]}
      renderHeaderEnd={() => (
        <Dropdown positionX="right" positionY="bottom">
          <div className="export_file">
            <Row style={{ justifyContent: 'space-between', padding: 'var(--padding-lg) 0' }}>
              <Header size={3}> {translate('export')} </Header>
              <Dropdown.Arrow />
            </Row>
          </div>
          <Dropdown.Menu>
            <CSVLink data={data} filename="Results.csv">
              <Dropdown.Item title={translate('csvFile')} />
            </CSVLink>
            <Dropdown.Divider />
            <Dropdown.Item title={translate('xlsxFile')} onClick={(e) => exportExcelFile(data)} />
          </Dropdown.Menu>
        </Dropdown>
      )}
      header={
        assessmentState.data?.item
          ? translate('assessmentSubmissionsTitle', { title: assessmentState.data.item.title })
          : ''
      }
    >
      <WebComponent
        data={submissionsState.data?.submissions}
        loading={submissionsState.fetching}
        emptyMessage={translate('noSubmissionsMessage')}
      >
        {(submissions) => (
          <StudentsAssessmentSubmissionTable
            submissions={submissions}
            onClickSubmission={(submission) => {
              navigation.navigate(ROUTES.assessments.submissions.grade, {
                submissionId: submission.id,
              });
            }}
          />
        )}
      </WebComponent>
    </Layout>
  );
};

export interface ViewSubmissionsProps extends PageComponent {}

export default ViewSubmissions;
