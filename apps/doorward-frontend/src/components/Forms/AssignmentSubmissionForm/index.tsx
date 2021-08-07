import React, { useState } from 'react';
import BasicForm from '../BasicForm';
import TabLayout from '@doorward/ui/components/TabLayout';
import Tab from '@doorward/ui/components/TabLayout/Tab';
import TextArea from '@doorward/ui/components/Input/TextArea';
import TextField from '@doorward/ui/components/Input/TextField';
import useForm from '@doorward/ui/hooks/useForm';
import { AssignmentSubmissionType } from '@doorward/common/types/courses';
import DoorwardApi from '../../../services/apis/doorward.api';
import ModuleItemEntity from '@doorward/common/entities/module.item.entity';
import translate from '@doorward/common/lang/translate';
import useApiAction from '@doorward/api-actions/hooks/useApiAction';

const AssignmentSubmissionForm: React.FunctionComponent<AssignmentSubmissionFormProps> = ({
  assignment,
  initialValues,
  onSuccess,
}): JSX.Element => {
  const [, getCourseModuleItemsState] = useApiAction(DoorwardApi, (api) => api.courses.getCourseModuleItems);
  const [submitAssignment] = useApiAction(DoorwardApi, (api) => api.assignments.submitAssignment);
  const form = useForm();
  const [currentTab, setCurrentTab] = useState();

  return (
    <BasicForm
      state={getCourseModuleItemsState}
      submitAction={submitAssignment}
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
            <Tab title={translate('textEntry')}>
              <TextArea name="submission" />
            </Tab>
            <Tab title={translate('websiteURL')}>
              <TextField name="submission" />
            </Tab>
            <Tab title={translate('fileUpload')}>
              {/*<FileUploadField*/}
              {/*  name="submission"*/}
              {/*  uploadHandler={(file, onUploadProgress, cancelHandler) => {*/}
              {/*    // return Api.storage.upload(file, false, onUploadProgress, cancelHandler);*/}
              {/*  }}*/}
              {/*/>*/}
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
