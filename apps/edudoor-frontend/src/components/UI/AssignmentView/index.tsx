import React, { useState } from 'react';
import DraftHTMLContent from '@edudoor/ui/components/DraftHTMLContent';
import { Assignment } from '@edudoor/common/models/Assignment';
import TabLayout from '@edudoor/ui/components/TabLayout';
import Tab from '@edudoor/ui/components/TabLayout/Tab';
import Panel from '@edudoor/ui/components/Panel';
import Header from '@edudoor/ui/components/Header';
import BasicForm from '../../Forms/BasicForm';
import { fetchModuleItems } from '../../../reducers/courses/actions';
import useForm from '@edudoor/ui/hooks/useForm';
import { useSelector } from 'react-redux';
import { State } from '../../../store';
import TextArea from '@edudoor/ui/components/Input/TextArea';
import TextField from '@edudoor/ui/components/Input/TextField';
import FileUploadField from '@edudoor/ui/components/Input/FileUploadField';

const AssignmentView: React.FunctionComponent<AssignmentViewProps> = props => {
  const form = useForm();
  const [currentTab, setCurrentTab] = useState();
  const initialValues = {
    textEntry: '',
    websiteURL: '',
    fileUpload: '',
  };
  const state = useSelector((state: State) => state.courses.moduleItemList);
  return (
    <div className="assignment-view">
      <DraftHTMLContent content={props.assignment.content.assignment} />
      <Panel style={{ marginTop: 'var(--padding-lg)' }} noBackground>
        <Header size={3}>Submission</Header>
        <BasicForm state={state} submitAction={fetchModuleItems} form={form} initialValues={initialValues}>
          {formikProps => {
            return (
              <TabLayout
                selected={2}
                onTabChange={tab => {
                  if (currentTab !== tab) {
                    setCurrentTab(tab);
                    formikProps.setValues({ textEntry: '', websiteURL: '', fileUpload: '' });
                  }
                }}
              >
                <Tab title="Text Entry">
                  <TextArea name="textEntry" />
                </Tab>
                <Tab title="Website URL">
                  <TextField name="websiteURL" />
                </Tab>
                <Tab title="File Upload">
                  <FileUploadField multiple/>
                </Tab>
              </TabLayout>
            );
          }}
        </BasicForm>
      </Panel>
    </div>
  );
};

export interface AssignmentViewProps {
  assignment: Assignment;
}

export default AssignmentView;
