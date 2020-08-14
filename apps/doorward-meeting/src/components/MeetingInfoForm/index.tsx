import React from 'react';
import Form from '@doorward/ui/components/Form';
import useForm from '@doorward/ui/hooks/useForm';
import TextField from '@doorward/ui/components/Input/TextField';
import ProfilePicture from '@doorward/ui/components/Input/ProfilePicture';
import './MeetingInfoForm.scss';
import meetingInfo from './meetingInfo';
import Tools from '@doorward/common/utils/Tools';
import Button from '@doorward/ui/components/Buttons/Button';
import { useHistory } from 'react-router';

export const DOORWARD_MEETING_USER = 'doorward-meeting-user';

export interface MeetingInfoState {
  avatar: string;
  name: string;
  sessionId: string;
  sessionName: string;
}

export const getMeetingInfo = (): MeetingInfoState => {
  try {
    const fromStorage = localStorage.getItem(DOORWARD_MEETING_USER);
    return fromStorage ? Tools.decrypt(fromStorage) as unknown as MeetingInfoState : null;
  } catch (e) {
    return null;
  }
};

const MeetingInfoForm: React.FunctionComponent<MeetingInfoFormProps> = (props): JSX.Element => {
  const form = useForm<MeetingInfoState>();
  const history = useHistory();

  const fromStorage = getMeetingInfo();

  const initialValues: MeetingInfoState = {
    avatar: null,
    name: '',
    sessionId: '',
    sessionName: '',
    ...(fromStorage || {}),
  };
  console.log(initialValues, fromStorage);

  return (
    <div>
      <Form
        form={form}
        initialValues={initialValues}
        isInitialValid={!!(fromStorage?.sessionId && fromStorage?.name)}
        onSubmit={values => {
          localStorage.setItem(DOORWARD_MEETING_USER, Tools.encrypt(JSON.stringify(values)));
          history.push('/meeting/' + values.sessionId);
        }}
        validationSchema={meetingInfo}
      >
        {formikProps => (
          <React.Fragment>
            <div className="meeting-profile">
              <ProfilePicture name="avatar" label="Meeting Avatar" />
              <TextField name="name" label="Your Name" />
            </div>
            <TextField name="sessionId" label="Meeting ID" />
            <TextField name="sessionName" label="Meeting Title" />
            <div className="buttons">
              <Button disabled={!formikProps.isValid}>Join Meeting</Button>
            </div>
          </React.Fragment>
        )}
      </Form>
    </div>
  );
};

export interface MeetingInfoFormProps {}

export default MeetingInfoForm;
