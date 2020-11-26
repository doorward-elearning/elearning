import React, { useEffect } from 'react';
import ChooseItemsForm from '../ChooseItemsForm';
import { UseForm } from '@doorward/ui/hooks/useForm';
import { WebComponentState } from '@doorward/ui/reducers/reducers';
import useAction from '@doorward/ui/hooks/useActions';
import DoorwardApi from '../../../services/apis/doorward.api';
import { TeachersResponse } from '@doorward/common/dtos/response';
import useDoorwardApi from '../../../hooks/useDoorwardApi';
import UserModel from '@doorward/common/models/user.model';
import translate from '@doorward/common/lang/translate';

const ChooseCourseManagerForm: React.FunctionComponent<ChooseCourseManagerFormProps> = (props): JSX.Element => {
  const state = useDoorwardApi((state) => state.courseManagers.createCourseManager);

  const fetchTeacherListAction = useAction(DoorwardApi.teachers.getAllTeachers);

  useEffect(() => {
    fetchTeacherListAction();
  }, []);

  return (
    <ChooseItemsForm
      items={props.managers}
      getItems={(state1) => state1.data.teachers}
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
        username: translate.username(),
        firstName: translate.firstName(),
        lastName: translate.lastName(),
        email: translate.email(),
      }}
    />
  );
};

export interface ChooseCourseManagerFormProps {
  managers: WebComponentState<TeachersResponse>;
  onSuccess: () => void;
  form: UseForm<{ items: Array<UserModel> }>;
  courseId: string;
}

export default ChooseCourseManagerForm;
