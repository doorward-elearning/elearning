import React, { useEffect } from 'react';
import { UseForm } from '@doorward/ui/hooks/useForm';
import { useSelector } from 'react-redux';
import { State } from '../../../store';
import useAction from '@doorward/ui/hooks/useActions';
import './ChooseStudentForm.scss';
import { fetchStudentsNotRegisteredAction, registerStudents } from '../../../reducers/courses/actions';
import Tools from '@doorward/common/utils/Tools';
import { Student } from '@doorward/common/models/Student';
import ChooseItemsForm from '../ChooseItemsForm';
import { fetchGroupsAction } from '../../../reducers/groups/actions';
import Groups from '@doorward/common/utils/GroupTypes';
import Panel from '@doorward/ui/components/Panel';
import TabLayout from '@doorward/ui/components/TabLayout';
import Tab from '@doorward/ui/components/TabLayout/Tab';
import { Group } from '@doorward/common/models/Group';
import Row from '@doorward/ui/components/Row';
import SimpleUserView from '@doorward/ui/components/UserChooser/SimpleUserView';
import WebComponent from '@doorward/ui/components/WebComponent';

const ChooseStudentForm: React.FunctionComponent<ChooseStudentFormProps> = props => {
  const studentList = useSelector((state: State) => state.courses.notRegistered);
  const groupList = useSelector((state: State) => state.groups.groupList);
  const fetchStudents = useAction(fetchStudentsNotRegisteredAction);
  const fetchGroups = useAction(fetchGroupsAction);
  const { courseId } = props;

  useEffect(() => {
    fetchStudents(courseId, { search: props.search });
    fetchGroups({ type: Groups.STUDENT, search: props.search });
  }, [props.search]);

  const onSuccess = () => {
    fetchStudents(courseId);
    if (props.groupForm.formikProps) {
      props.groupForm.formikProps.resetForm();
    }
    if (props.form.formikProps) {
      props.form.formikProps.resetForm();
    }
    props.onSuccess();
  };

  const state = useSelector((state: State) => state.courses.registerStudents);
  const createStudentsFromGroups = ({ items }) => {
    return items
      .filter(item => item.selected)
      .reduce((acc, group) => [...acc, ...group.members], [])
      .map(student => student.id);
  };

  return (
    <div>
      <TabLayout onTabChange={props.onTabChange}>
        <Tab title="Students">
          <Panel plain>
            <ChooseItemsForm
              getItems={state1 => state1.data.students}
              items={studentList}
              state={state}
              onRemoveFilter={props.onClearSearch}
              hasSearch={!!props.search}
              form={props.form}
              onSuccess={onSuccess}
              submitAction={registerStudents}
              createData={values => [
                courseId,
                {
                  students: values.items
                    .filter(student => {
                      return student.selected;
                    })
                    .map(student => student.id),
                },
              ]}
              columns={{
                username: 'Username',
                firstName: 'First Name',
                lastName: 'Last Name',
                email: 'Email',
              }}
            />
          </Panel>
        </Tab>
        <Tab title="Groups">
          <Panel plain>
            <Row style={{ alignItems: 'start' }}>
              <ChooseItemsForm
                items={groupList}
                getItems={state1 => state1.data.groups}
                state={state}
                form={props.groupForm}
                onSuccess={onSuccess}
                submitAction={registerStudents}
                onRemoveFilter={props.onClearSearch}
                hasSearch={!!props.search}
                createData={values => [courseId, { students: createStudentsFromGroups(values) }]}
                columns={{
                  name: 'Group name',
                  members: 'Members',
                }}
                renderCell={row => {
                  return {
                    members: <span>{Tools.str(row.members.length)}</span>,
                  };
                }}
              >
                {formikProps => (
                  <div className="choose-student-form__group__selected">
                    <WebComponent
                      data={formikProps.values.items.filter(item => item.selected)}
                      loading={false}
                      size="medium"
                    >
                      {items => {
                        return items
                          .reduce((acc, group) => {
                            const result = [...acc];
                            group.members.map(member => {
                              if (!result.find(one => one.id === member.id)) {
                                result.push(member);
                              }
                            });
                            return result;
                          }, [])
                          .map(member => (
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
  items: Array<Student>;
}

export interface ChooseStudentGroupFormState {
  items: Array<Group>;
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