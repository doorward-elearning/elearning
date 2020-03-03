import React, { useState } from 'react';
import DraftHTMLContent from '@edudoor/ui/components/DraftHTMLContent';
import { Assignment } from '@edudoor/common/models/Assignment';
import TabLayout from '@edudoor/ui/components/TabLayout';
import Tab from '@edudoor/ui/components/TabLayout/Tab';
import Panel from '@edudoor/ui/components/Panel';
import Header from '@edudoor/ui/components/Header';
import BasicForm from '../../Forms/BasicForm';
import { fetchModuleItems, submitAssignmentAction } from '../../../reducers/courses/actions';
import useForm from '@edudoor/ui/hooks/useForm';
import { useSelector } from 'react-redux';
import { State } from '../../../store';
import TextArea from '@edudoor/ui/components/Input/TextArea';
import TextField from '@edudoor/ui/components/Input/TextField';
import FileUploadField from '@edudoor/ui/components/Input/FileUploadField';
import Api from '../../../services/api';
import RoleContainer from '@edudoor/ui/components/RolesManager/RoleContainer';
import { Roles } from '@edudoor/ui/components/RolesManager';
import useRoutes from '../../../hooks/useRoutes';
import { useHistory } from 'react-router';

const AssignmentView: React.FunctionComponent<AssignmentViewProps> = props => {
  const form = useForm();
  const [currentTab, setCurrentTab] = useState();
  const initialValues = {
    submission: '',
    submissionType: '',
  };
  const state = useSelector((state: State) => state.courses.moduleItemList);
  const history = useHistory();
  return (
    <div className="assignment-view">
      <DraftHTMLContent content={props.assignment.content.assignment} />
      <RoleContainer roles={[Roles.STUDENT]} showSuperAdmin={false}>
        <Panel style={{ marginTop: 'var(--padding-lg)' }} noBackground>
          <Header size={3}>Submission</Header>
          <BasicForm
            state={state}
            submitAction={submitAssignmentAction}
            form={form}
            showSuccessToast
            showErrorToast
            onSuccess={() => {
              history.goBack();
            }}
            createData={values => [
              props.assignment.id,
              {
                submission: values.submissionType === 'File Upload' ? values.submission[0].id : values.submission,
                submissionType: values.submissionType,
                resubmission: false,
              },
            ]}
            initialValues={initialValues}
          >
            {formikProps => {
              return (
                <TabLayout
                  onTabChange={tab => {
                    if (currentTab !== tab) {
                      setCurrentTab(tab);
                      formikProps.setValues({
                        submission: '',
                        submissionType: ['Text Entry', 'Website URL', 'File Upload'][tab],
                      });
                    }
                  }}
                >
                  <Tab title="Text Entry">
                    <TextArea name="submission" />
                  </Tab>
                  <Tab title="Website URL">
                    <TextField name="submission" />
                  </Tab>
                  <Tab title="File Upload">
                    <FileUploadField
                      name="submission"
                      uploadHandler={(file, onUploadProgress, cancelHandler) => {
                        return Api.storage.upload(file, false, onUploadProgress, cancelHandler);
                      }}
                    />
                  </Tab>
                </TabLayout>
              );
            }}
          </BasicForm>
        </Panel>
      </RoleContainer>
    </div>
  );
};

export interface AssignmentViewProps {
  assignment: Assignment;
}

export default AssignmentView;
