import React, { useState } from 'react';
import BasicForm from '../BasicForm';
import TabLayout from '@doorward/ui/components/TabLayout';
import Tab from '@doorward/ui/components/TabLayout/Tab';
import TextArea from '@doorward/ui/components/Input/TextArea';
import TextField from '@doorward/ui/components/Input/TextField';
import FileUploadField from '@doorward/ui/components/Input/FileUploadField';
import Api from '../../../services/api';
import useForm from '@doorward/ui/hooks/useForm';
import { AssignmentSubmissionType } from '@doorward/common/types/courses';
import DoorwardApi from '../../../services/apis/doorward.api';
import ModuleItemEntity from '@doorward/common/entities/module.item.entity';
import useDoorwardApi from '../../../hooks/useDoorwardApi';

const AssignmentSubmissionForm: React.FunctionComponent<AssignmentSubmissionFormProps> = ({
  assignment,
  initialValues,
  onSuccess,
}): JSX.Element => {
  const state = useDoorwardApi((state) => state.courses.getCourseModuleItems);
  const form = useForm();
  const [currentTab, setCurrentTab] = useState();
  return (
    <BasicForm
      state={state}
      submitAction={DoorwardApi.assignments.submitAssignment}
      form={form}
      showSuccessToast
      showErrorToast
      onSuccess={onSuccess}
      createData={(values) => [
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
      {(formikProps) => {
        return (
          <TabLayout
            onTabChange={(tab) => {
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
  assignment: ModuleItemEntity;
  initialValues: {
    submission: any;
    submissionType: string;
  };
  onSuccess: () => void;
}

export default AssignmentSubmissionForm;
