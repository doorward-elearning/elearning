import React, { useEffect } from 'react';
import ChooseItemsForm from '../ChooseItemsForm';
import { createCourseManagerAction, registerStudents } from '../../../reducers/courses/actions';
import { useSelector } from 'react-redux';
import { State } from '../../../store';
import { fetchTeacherListAction } from '../../../reducers/teachers/actions';
import { User } from '@edudoor/common/models/User';
import { UseForm } from '@edudoor/ui/hooks/useForm';

const ChooseCourseManagerForm: React.FunctionComponent<ChooseCourseManagerFormProps> = (props): JSX.Element => {
  const state = useSelector((state: State) => state.courses.createCourseManager);

  useEffect(() => {
    fetchTeacherListAction();
  }, []);

  return (
    <ChooseItemsForm
      items={props.managers}
      state={state}
      form={props.form}
      singleChoice
      onSuccess={props.onSuccess}
      submitAction={createCourseManagerAction}
      createData={values => [
        props.courseId,
        {
          managerId: values.items.find(x => x.selected)?.id,
        },
      ]}
      columns={{
        username: 'Username',
        firstName: 'First Name',
        lastName: 'Last Name',
        email: 'Email',
      }}
    />
  );
};

export interface ChooseCourseManagerFormProps {
  managers: Array<User>;
  onSuccess: () => void;
  form: UseForm<{ items: Array<User> }>;
  courseId: string;
}

export default ChooseCourseManagerForm;
