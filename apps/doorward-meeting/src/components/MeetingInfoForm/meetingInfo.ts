import * as Yup from 'yup';

export default Yup.object({
  name: Yup.string()
    .nullable()
    .required('Please provide your name'),
  avatar: Yup.string().nullable(),
  sessionId: Yup.string()
    .required('Please enter an existing or new meeting id')
    .nullable(),
  sessionTitle: Yup.string().nullable(),
});
