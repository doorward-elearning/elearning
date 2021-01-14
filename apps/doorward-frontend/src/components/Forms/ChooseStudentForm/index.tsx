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
import SimpleUserView from '@doorward/ui/components/UserChooser/SimpleUserView';
import WebComponent from '@doorward/ui/components/WebComponent';
import DoorwardApi from '../../../services/apis/doorward.api';
import { SimpleGroupResponse } from '@doorward/common/dtos/response';
import UserEntity from '@doorward/common/entities/user.entity';
import translate from '@doorward/common/lang/translate';
import useApiAction from '@doorward/ui/hooks/useApiAction';

const ChooseStudentForm: React.FunctionComponent<ChooseStudentFormProps> = (props) => {
  const studentList = useApiAction(DoorwardApi, (api) => api.students.getStudentsNotRegisteredToCourse);
  const groupList = useApiAction(DoorwardApi, (api) => api.groups.getGroups);
  const fetchStudents = useApiAction(DoorwardApi, (api) => api.students.getStudentsNotRegisteredToCourse);
  const fetchStudentsInCourse = useApiAction(DoorwardApi, (api) => api.students.getStudentsInCourse);
  const fetchGroups = useApiAction(DoorwardApi, (api) => api.groups.getGroups);
  const { courseId } = props;

  useEffect(() => {
    fetchStudents.action(courseId, { search: props.search });
    fetchGroups.action({ type: Groups.STUDENT, search: props.search });
  }, [props.search]);

  const onSuccess = () => {
    fetchStudents.action(courseId, {});
    fetchStudentsInCourse.action(courseId);
    if (props.groupForm.formikProps) {
      props.groupForm.formikProps.resetForm();
    }
    if (props.form.formikProps) {
      props.form.formikProps.resetForm();
    }
    props.onSuccess();
  };

  const addStudentToCourse = useApiAction(DoorwardApi, (api) => api.students.addStudentToCourse);
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
              getItems={(state1) => state1.data.students}
              items={studentList.state}
              state={addStudentToCourse.state}
              onRemoveFilter={props.onClearSearch}
              hasSearch={!!props.search}
              form={props.form}
              onSuccess={onSuccess}
              submitAction={addStudentToCourse.action}
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
                username: translate('username'),
                firstName: translate('firstName'),
                lastName: translate('lastName'),
                email: translate('email'),
              }}
            />
          </Panel>
        </Tab>
        <Tab title={translate('groups')}>
          <Panel plain>
            <Row style={{ alignItems: 'start' }}>
              <ChooseItemsForm
                items={groupList.state}
                getItems={(state1) => state1.data.groups}
                state={addStudentToCourse.state}
                form={props.groupForm}
                onSuccess={onSuccess}
                submitAction={addStudentToCourse.action}
                onRemoveFilter={props.onClearSearch}
                hasSearch={!!props.search}
                createData={(values) => [courseId, { students: createStudentsFromGroups(values) }]}
                columns={{
                  name: translate('groupName'),
                  members: translate('members'),
                }}
                renderCell={(row) => {
                  return {
                    members: <span>{Tools.str(row.members.length)}</span>,
                  };
                }}
              >
                {(formikProps) => (
                  <div className="choose-student-form__group__selected">
                    <WebComponent
                      data={formikProps.values.items.filter((item) => item.selected)}
                      loading={false}
                      size="medium"
                    >
                      {(items) => {
                        return items
                          .reduce((acc, group) => {
                            const result = [...acc];
                            group.members.map((member) => {
                              if (!result.find((one) => one.id === member.id)) {
                                result.push(member);
                              }
                            });
                            return result;
                          }, [])
                          .map((member) => (
                            <Panel plain key={member.id}>
                              <SimpleUserView user={member} />
                            </Panel>
                          ));
                      }}
                    </WebComponent>
                  </div>
                )}
              </ChooseItemsForm>
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
