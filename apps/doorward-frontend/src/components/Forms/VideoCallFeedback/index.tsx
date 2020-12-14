import React, { FunctionComponent } from 'react';
import Header from '@doorward/ui/components/Header';
import BasicForm, { BasicFormFeatures } from '../BasicForm';
import useForm from '@doorward/ui/hooks/useForm';
import TextArea from '@doorward/ui/components/Input/TextArea';
import meeting from '../../../assets/illustrations/meeting.svg';
import Row from '@doorward/ui/components/Row';
import EImage from '@doorward/ui/components/Image';
import RatingInput from '@doorward/ui/components/Input/RatingInput';
import validation from './validation';
import useDoorwardApi from '../../../hooks/useDoorwardApi';
import translate from '@doorward/common/lang/translate';

const VideoCallFeedback: FunctionComponent<VideoCallFeedbackProps> = (props): JSX.Element => {
  const state = useDoorwardApi((state) => state.students.createStudentInCourse);
  const form = useForm();
  const initialValues = {
    rating: null,
    feedback: '',
  };
  return (
    <Row style={{ gridTemplateColumns: '2fr 1fr', alignItems: 'start' }}>
      <div>
        <Header size={3}>{translate('pleaseRateTheQualityOfTheMeeting')}</Header>
        <BasicForm
          submitAction={() => ({ type: '' })}
          state={state}
          validationSchema={validation}
          form={form}
          initialValues={initialValues}
          features={[BasicFormFeatures.SAVE_BUTTON]}
          positiveText={translate('submit')}
        >
          <RatingInput name="rating" label={translate('rating')} size="large" />
          <TextArea label={translate('feedback')} name="feedback" />
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
