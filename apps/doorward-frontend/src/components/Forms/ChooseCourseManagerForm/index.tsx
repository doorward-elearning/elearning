import React from 'react';
import ChooseItemsForm from '../ChooseItemsForm';
import { UseForm } from '@doorward/ui/hooks/useForm';
import DoorwardApi from '../../../services/apis/doorward.api';
import { TeachersResponse } from '@doorward/common/dtos/response';
import UserEntity from '@doorward/common/entities/user.entity';
import translate from '@doorward/common/lang/translate';
import useApiAction from '@doorward/api-actions/hooks/useApiAction';
import { WebComponentState } from '@doorward/api-actions/types';

const ChooseCourseManagerForm: React.FunctionComponent<ChooseCourseManagerFormProps> = (props): JSX.Element => {
  const [addCourseManager, addCourseManagerState] = useApiAction(
    DoorwardApi,
    (api) => api.courseManagers.createCourseManager
  );

  return (
    <div style={{ width: 900 }}>
      <ChooseItemsForm
        items={props.managers}
        getItems={(state) => state.data?.teachers}
        submitAction={addCourseManager}
        state={addCourseManagerState}
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
          username: {
            title: translate('username'),
          },
          firstName: {
            title: translate('firstName'),
          },
          lastName: {
            title: translate('lastName'),
          },
          email: {
            title: translate('email'),
          },
        }}
      />
    </div>
  );
};

export interface ChooseCourseManagerFormProps {
  managers: WebComponentState<TeachersResponse, TeachersResponse>;
  onSuccess: () => void;
  form: UseForm<{ items: Array<UserEntity> }>;
  courseId: string;
}

export default ChooseCourseManagerForm;
