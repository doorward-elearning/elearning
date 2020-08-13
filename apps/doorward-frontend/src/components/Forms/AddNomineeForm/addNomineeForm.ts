import * as Yup from 'yup';

export default Yup.object({
  profilePicture: Yup.string()
    .required('Please choose a profile picture.')
    .nullable(),
  name: Yup.string()
    .required("Please enter the nominee's full name")
    .nullable(),
  profile: Yup.string()
    .required('Please enter the profile details for the nominee.')
    .nullable(),
});
