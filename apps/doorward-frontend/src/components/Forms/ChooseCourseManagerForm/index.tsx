import React, { useEffect } from 'react';
import ChooseItemsForm from '../ChooseItemsForm';
import { UseForm } from '@doorward/ui/hooks/useForm';
import { WebComponentState } from '@doorward/ui/reducers/reducers';
import useAction from '@doorward/ui/hooks/useActions';
import DoorwardApi from '../../../services/apis/doorward.api';
import { CourseManagersResponse } from '@doorward/common/dtos/response';
import useDoorwardApi from '../../../hooks/useDoorwardApi';
import CourseManagerEntity from '@doorward/common/entities/course.manager.entity';

const ChooseCourseManagerForm: React.FunctionComponent<ChooseCourseManagerFormProps> = (props): JSX.Element => {
  const state = useDoorwardApi((state) => state.courseManagers.createCourseManager);

  const fetchTeacherListAction = useAction(DoorwardApi.teachers.getAllTeachers);

  useEffect(() => {
    fetchTeacherListAction();
  }, []);

  return (
    <ChooseItemsForm
      items={props.managers}
      getItems={(state1) => state1.data.courseManagers}
      state={state}
      form={props.form}
      singleChoice
      onSuccess={props.onSuccess}
      submitAction={DoorwardApi.courseManagers.createCourseManager}
      createData={(values) => [
        props.courseId,
        {
          managerId: values.items.find((x) => x.selected)?.id,
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
  managers: WebComponentState<CourseManagersResponse>;
  onSuccess: () => void;
  form: UseForm<{ items: Array<CourseManagerEntity> }>;
  courseId: string;
}

export default ChooseCourseManagerForm;
