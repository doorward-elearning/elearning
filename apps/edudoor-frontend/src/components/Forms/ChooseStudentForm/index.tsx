import React, { useEffect } from 'react';
import { UseForm } from '@edudoor/ui/hooks/useForm';
import { useSelector } from 'react-redux';
import { State } from '../../../store';
import useAction from '@edudoor/ui/hooks/useActions';
import './ChooseStudentForm.scss';
import { fetchStudentsNotRegisteredAction, registerStudents } from '../../../reducers/courses/actions';
import Tools from '@edudoor/common/utils/Tools';
import { Student } from '@edudoor/common/models/Student';
import ChooseItemsForm from '../ChooseItemsForm';
import Header from '@edudoor/ui/components/Header';
import { fetchGroupsAction } from '../../../reducers/groups/actions';
import Groups from '@edudoor/common/utils/GroupTypes';
import Panel from '@edudoor/ui/components/Panel';
import TabLayout from '@edudoor/ui/components/TabLayout';
import Tab from '@edudoor/ui/components/TabLayout/Tab';
import { Group } from '@edudoor/common/models/Group';
import Button from '@edudoor/ui/components/Buttons/Button';
import Row from '@edudoor/ui/components/Row';
import IfElse from '@edudoor/ui/components/IfElse';
import ItemArray from '@edudoor/ui/components/ItemArray';
import SimpleUserView from '@edudoor/ui/components/UserChooser/SimpleUserView';
import WebComponent from '@edudoor/ui/components/WebComponent';

const ChooseStudentForm: React.FunctionComponent<ChooseStudentFormProps> = props => {
  const studentList = useSelector((state: State) => state.courses.notRegistered);
  const groupList = useSelector((state: State) => state.groups.groupList);
  const fetchStudents = useAction(fetchStudentsNotRegisteredAction);
  const fetchGroups = useAction(fetchGroupsAction);
  const { courseId } = props;

  useEffect(() => {
    fetchStudents(courseId);
    fetchGroups(Groups.STUDENT);
  }, []);

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
              items={studentList.data.students}
              state={state}
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
                items={groupList.data.groups}
                state={state}
                form={props.groupForm}
                onSuccess={onSuccess}
                submitAction={registerStudents}
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
  items: Array<{ selected: boolean } & Student>;
}

export interface ChooseStudentGroupFormState {
  items: Array<{ selected: boolean } & Group>;
}

export interface ChooseStudentFormProps {
  form: UseForm<ChooseStudentFormState>;
  groupForm: UseForm<ChooseStudentGroupFormState>;
  courseId: string;
  onSuccess: () => void;
  onTabChange: (current: number) => void;
}

export default ChooseStudentForm;
