import * as Yup from 'yup';
import { AddCourseFormState } from '../AddCourseForm';

export default Yup.object<AddCourseFormState>().shape({
  title: Yup.string().required('The course name is required'),
  modules: Yup.array()
    .of(
      Yup.object().shape({
        title: Yup.string().required('The module name is required'),
      })
    )
    .required('Please provide at least one module in the course'),
});
