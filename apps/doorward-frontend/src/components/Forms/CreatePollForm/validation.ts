import * as Yup from 'yup';
import { AddPollFormState } from './index';

export default Yup.object<AddPollFormState>().shape({
  title: Yup.string().required('The module name is required.'),
  choices: Yup.array(Yup.string().required('Please enter a poll option.')),
  startDate: Yup.date()
    .required('Please choose a start date.')
    .max(Yup.ref('endDate'), 'The start date should not exceed the end date.'),
  endDate: Yup.date()
    .required('Please choose an end date.')
    .min(Yup.ref('startDate'), 'The end date should not exceed the start date.'),
});
