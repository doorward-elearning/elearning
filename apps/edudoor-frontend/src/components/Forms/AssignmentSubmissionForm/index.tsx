import React, { useState } from 'react';
import BasicForm from '../BasicForm';
import { submitAssignmentAction } from '../../../reducers/courses/actions';
import TabLayout from '@edudoor/ui/components/TabLayout';
import Tab from '@edudoor/ui/components/TabLayout/Tab';
import TextArea from '@edudoor/ui/components/Input/TextArea';
import TextField from '@edudoor/ui/components/Input/TextField';
import FileUploadField from '@edudoor/ui/components/Input/FileUploadField';
import Api from '../../../services/api';
import { Assignment } from '@edudoor/common/models/Assignment';
import useForm from '@edudoor/ui/hooks/useForm';
import { useSelector } from 'react-redux';
import { State } from '../../../store';
import { AssignmentSubmissionType } from '@edudoor/common/models';

const AssignmentSubmissionForm: React.FunctionComponent<AssignmentSubmissionFormProps> = ({
  assignment,
  initialValues,
  onSuccess,
}): JSX.Element => {
  const state = useSelector((state: State) => state.courses.moduleItemList);
  const form = useForm();
  const [currentTab, setCurrentTab] = useState();
  return (
    <BasicForm
      state={state}
      submitAction={submitAssignmentAction}
      form={form}
      showSuccessToast
      showErrorToast
      onSuccess={onSuccess}
      createData={values => [
        assignment.id,
        {
          submission:
            values.submissionType === AssignmentSubmissionType.FILE_UPLOAD
              ? values.submission[0].id
              : values.submission,
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
                  submissionType: [
                    AssignmentSubmissionType.TEXT_ENTRY,
                    AssignmentSubmissionType.WEBSITE_URL,
                    AssignmentSubmissionType.FILE_UPLOAD,
                  ][tab],
                });
              }
            }}
          >
            <Tab title={AssignmentSubmissionType.TEXT_ENTRY}>
              <TextArea name="submission" />
            </Tab>
            <Tab title={AssignmentSubmissionType.WEBSITE_URL}>
              <TextField name="submission" />
            </Tab>
            <Tab title={AssignmentSubmissionType.FILE_UPLOAD}>
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
  );
};

export interface AssignmentSubmissionFormProps {
  assignment: Assignment;
  initialValues: {
    submission: any;
    submissionType: string;
  };
  onSuccess: () => void;
}

export default AssignmentSubmissionForm;