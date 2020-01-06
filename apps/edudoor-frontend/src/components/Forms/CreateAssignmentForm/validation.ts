import * as Yup from 'yup';

export default Yup.object({
  title: Yup.string().required('The title of the assignment is required'),
  content: Yup.object({
    assignment: Yup.object().nullable().required('The assignment content is required.'),
    dueDate: Yup.string().required('The due date is required'),
    submissionTypes: Yup.array().min(1, 'Please choose at least one submission type'),
  }),
});
