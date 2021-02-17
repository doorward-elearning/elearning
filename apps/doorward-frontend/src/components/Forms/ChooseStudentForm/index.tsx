import React, { useEffect } from 'react';
import { UseForm } from '@doorward/ui/hooks/useForm';
import './ChooseStudentForm.scss';
import Tools from '@doorward/common/utils/Tools';
import ChooseItemsForm from '../ChooseItemsForm';
import Groups from '@doorward/common/utils/GroupTypes';
import Panel from '@doorward/ui/components/Panel';
import TabLayout from '@doorward/ui/components/TabLayout';
import Tab from '@doorward/ui/components/TabLayout/Tab';
import Row from '@doorward/ui/components/Row';
import DoorwardApi from '../../../services/apis/doorward.api';
import { SimpleGroupResponse } from '@doorward/common/dtos/response';
import UserEntity from '@doorward/common/entities/user.entity';
import translate from '@doorward/common/lang/translate';
import { useApiAction } from 'use-api-action';

const ChooseStudentForm: React.FunctionComponent<ChooseStudentFormProps> = (props) => {
  const [getStudentsNotRegistered, studentsNotRegistered] = useApiAction(
    DoorwardApi,
    (api) => api.students.getStudentsNotRegisteredToCourse
  );
  const [getGroups, groups] = useApiAction(DoorwardApi, (api) => api.groups.getGroups);
  const [fetchStudentsInCourse] = useApiAction(DoorwardApi, (api) => api.students.getStudentsInCourse);
  const [addStudentToCourse, addStudentToCourseState] = useApiAction(
    DoorwardApi,
    (api) => api.students.addStudentToCourse
  );

  const { courseId } = props;

  useEffect(() => {
    getStudentsNotRegistered(courseId, { search: props.search });
    getGroups({ type: Groups.STUDENT, search: props.search });
  }, [props.search]);

  const onSuccess = () => {
    getStudentsNotRegistered(courseId, {});
    fetchStudentsInCourse(courseId);
    if (props.groupForm.formikProps) {
      props.groupForm.formikProps.resetForm();
    }
    if (props.form.formikProps) {
      props.form.formikProps.resetForm();
    }
    props.onSuccess();
  };

  const createStudentsFromGroups = ({ items }) => {
    return items
      .filter((item) => item.selected)
      .reduce((acc, group) => [...acc, ...group.members], [])
      .map((student) => student.id);
  };

  return (
    <div>
      <TabLayout onTabChange={props.onTabChange}>
        <Tab title={translate('students')}>
          <Panel plain>
            <ChooseItemsForm
              getItems={(state1) => state1.data?.students}
              items={studentsNotRegistered}
              state={addStudentToCourseState}
              onRemoveFilter={props.onClearSearch}
              hasSearch={!!props.search}
              form={props.form}
              onSuccess={onSuccess}
              submitAction={addStudentToCourse}
              createData={(values) => [
                courseId,
                {
                  students: values.items
                    .filter((student) => {
                      return student.selected;
                    })
                    .map((student) => student.id),
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
          </Panel>
        </Tab>
        <Tab title={translate('groups')}>
          <Panel plain>
            <Row style={{ alignItems: 'start', gridGap: 'var(--padding)' }}>
              <ChooseItemsForm
                items={groups}
                getItems={(state1) => state1.data?.groups}
                state={addStudentToCourseState}
                form={props.groupForm}
                onSuccess={onSuccess}
                submitAction={addStudentToCourse}
                onRemoveFilter={props.onClearSearch}
                hasSearch={!!props.search}
                createData={(values) => [courseId, { students: createStudentsFromGroups(values) }]}
                columns={{
                  name: {
                    title: translate('groupName'),
                  },
                  members: {
                    title: translate('members'),
                    cellRenderer: ({ rowData: row }) => <span>{Tools.str(row.members.length)}</span>,
                  },
                  createdAt: {
                    title: translate('dateCreated'),
                    cellRenderer: ({ rowData }) => Tools.normalDate(rowData),
                  },
                }}
              />
            </Row>
          </Panel>
        </Tab>
      </TabLayout>
    </div>
  );
};

export interface ChooseStudentFormState {
  items: Array<UserEntity>;
}

export interface ChooseStudentGroupFormState {
  items: Array<SimpleGroupResponse>;
}

export interface ChooseStudentFormProps {
  form: UseForm<ChooseStudentFormState>;
  groupForm: UseForm<ChooseStudentGroupFormState>;
  courseId: string;
  onSuccess: () => void;
  onTabChange: (current: number) => void;
  search?: string;
  onClearSearch?: () => void;
}

export default ChooseStudentForm;
