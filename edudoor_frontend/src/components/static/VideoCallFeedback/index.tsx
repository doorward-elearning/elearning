import React, { FunctionComponent } from 'react';
import Header from '../../ui/Header';
import BasicForm, { BasicFormFeatures } from '../Forms/BasicForm';
import { useSelector } from 'react-redux';
import { State } from '../../../store';
import DropdownSelect from '../../ui/Input/DropdownSelect';
import useForm from '../../../hooks/useForm';
import TextArea from '../../ui/Input/TextArea';
import meeting from '../../../assets/illustrations/meeting.svg';
import Row from '../../ui/Row';
import EImage from '../../ui/Image';

const VideoCallFeedback: FunctionComponent<VideoCallFeedbackProps> = (props): JSX.Element => {
  const state = useSelector((state: State) => state.courses.createStudent);
  const form = useForm();
  const initialValues = {
    rating: null,
    feedback: '',
  };
  return (
    <Row style={{ gridTemplateColumns: '2fr 1fr' }}>
      <div>
        <p>Your meeting has ended.</p>
        <Header size={3}>Please rate the quality of the meeting.</Header>
        <BasicForm
          submitAction={() => ({ type: '' })}
          state={state}
          form={form}
          initialValues={initialValues}
          features={[BasicFormFeatures.SAVE_BUTTON]}
          positiveText="Submit"
        >
          <DropdownSelect options={['1', '2', '3', '4', '5']} name="rating" label="Rating" />
          <TextArea label="Feedback" name="feedback" />
        </BasicForm>
        <span className="meta">Close this window to exit.</span>
      </div>
      <EImage size="responsive" src={meeting} />
    </Row>
  );
};

export interface VideoCallFeedbackProps {}

export default VideoCallFeedback;
