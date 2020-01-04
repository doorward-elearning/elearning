import React, { FunctionComponent } from 'react';
import Header from '../../../../../../libs/ui/components/Header';
import BasicForm, { BasicFormFeatures } from '../BasicForm';
import { useSelector } from 'react-redux';
import { State } from '../../../store';
import useForm from '../../../../../../libs/ui/hooks/useForm';
import TextArea from '../../../../../../libs/ui/components/Input/TextArea';
import meeting from '../../../assets/illustrations/meeting.svg';
import Row from '../../../../../../libs/ui/components/Row';
import EImage from '../../../../../../libs/ui/components/Image';
import RatingInput from '../../../../../../libs/ui/components/Input/RatingInput';
import validation from './validation';

const VideoCallFeedback: FunctionComponent<VideoCallFeedbackProps> = (props): JSX.Element => {
  const state = useSelector((state: State) => state.courses.createStudent);
  const form = useForm();
  const initialValues = {
    rating: null,
    feedback: '',
  };
  return (
    <Row style={{ gridTemplateColumns: '2fr 1fr', alignItems: 'start' }}>
      <div>
        <Header size={3}>Please rate the quality of the meeting.</Header>
        <BasicForm
          submitAction={() => ({ type: '' })}
          state={state}
          validationSchema={validation}
          form={form}
          initialValues={initialValues}
          features={[BasicFormFeatures.SAVE_BUTTON]}
          positiveText="Submit"
        >
          <RatingInput name="rating" label="Rating" size="large" />
          <TextArea label="Feedback" name="feedback" />
        </BasicForm>
      </div>
      <div>
        <EImage size="responsive" src={meeting} />
      </div>
    </Row>
  );
};

export interface VideoCallFeedbackProps {}

export default VideoCallFeedback;
