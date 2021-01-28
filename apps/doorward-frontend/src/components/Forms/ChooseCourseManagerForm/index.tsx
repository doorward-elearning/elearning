import React, { useEffect } from 'react';
import ChooseItemsForm from '../ChooseItemsForm';
import { UseForm } from '@doorward/ui/hooks/useForm';
import DoorwardApi from '../../../services/apis/doorward.api';
import { TeachersResponse } from '@doorward/common/dtos/response';
import UserEntity from '@doorward/common/entities/user.entity';
import translate from '@doorward/common/lang/translate';
import { useApiAction } from 'use-api-action';
import { WebComponentState } from 'use-api-action/types/types';

const ChooseCourseManagerForm: React.FunctionComponent<ChooseCourseManagerFormProps> = (props): JSX.Element => {
  const [fetchTeacherList, teacherList] = useApiAction(DoorwardApi, (api) => api.teachers.getAllTeachers);

  useEffect(() => {
    fetchTeacherList();
  }, []);

  return (
    <ChooseItemsForm
      items={props.managers}
      getItems={(state1) => state1.data.teachers}
      submitAction={fetchTeacherList}
      state={teacherList}
      form={props.form}
      singleChoice
      onSuccess={props.onSuccess}
      createData={(values) => [
        props.courseId,
        {
          managerId: values.items.find((x) => x.selected)?.id,
        },
      ]}
      columns={{
        username: translate('username'),
        firstName: translate('firstName'),
        lastName: translate('lastName'),
        email: translate('email'),
      }}
    />
  );
};

export interface ChooseCourseManagerFormProps {
  managers: WebComponentState<TeachersResponse, TeachersResponse>;
  onSuccess: () => void;
  form: UseForm<{ items: Array<UserEntity> }>;
  courseId: string;
}

export default ChooseCourseManagerForm;
