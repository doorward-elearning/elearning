import React, { useEffect } from 'react';
import { UseForm } from '@doorward/ui/hooks/useForm';
import { useSelector } from 'react-redux';
import { State } from '../../../store';
import useAction from '@doorward/ui/hooks/useActions';
import './ChooseMemberForm.scss';
import { fetchMembersNotRegisteredAction, registerMembers } from '../../../reducers/conferences/actions';
import Tools from '@doorward/common/utils/Tools';
import { Member } from '@doorward/common/models/Member';
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

const ChooseMemberForm: React.FunctionComponent<ChooseMemberFormProps> = props => {
  const memberList = useSelector((state: State) => state.conferences.notRegistered);
  const groupList = useSelector((state: State) => state.groups.groupList);
  const fetchMembers = useAction(fetchMembersNotRegisteredAction);
  const fetchGroups = useAction(fetchGroupsAction);
  const { conferenceId } = props;

  useEffect(() => {
    fetchMembers(conferenceId, { search: props.search });
    fetchGroups({ type: Groups.MEMBER, search: props.search });
  }, [props.search]);

  const onSuccess = () => {
    fetchMembers(conferenceId);
    if (props.groupForm.formikProps) {
      props.groupForm.formikProps.resetForm();
    }
    if (props.form.formikProps) {
      props.form.formikProps.resetForm();
    }
    props.onSuccess();
  };

  const state = useSelector((state: State) => state.conferences.registerMembers);
  const createMembersFromGroups = ({ items }) => {
    return items
      .filter(item => item.selected)
      .reduce((acc, group) => [...acc, ...group.members], [])
      .map(member => member.id);
  };

  return (
    <div>
      <TabLayout onTabChange={props.onTabChange}>
        <Tab title="Members">
          <Panel plain>
            <ChooseItemsForm
              getItems={state1 => state1.data.members}
              items={memberList}
              state={state}
              onRemoveFilter={props.onClearSearch}
              hasSearch={!!props.search}
              form={props.form}
              onSuccess={onSuccess}
              submitAction={registerMembers}
              createData={values => [
                conferenceId,
                {
                  members: values.items
                    .filter(member => {
                      return member.selected;
                    })
                    .map(member => member.id),
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
                submitAction={registerMembers}
                onRemoveFilter={props.onClearSearch}
                hasSearch={!!props.search}
                createData={values => [conferenceId, { members: createMembersFromGroups(values) }]}
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
                  <div className="choose-member-form__group__selected">
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

export interface ChooseMemberFormState {
  items: Array<Member>;
}

export interface ChooseMemberGroupFormState {
  items: Array<Group>;
}

export interface ChooseMemberFormProps {
  form: UseForm<ChooseMemberFormState>;
  groupForm: UseForm<ChooseMemberGroupFormState>;
  conferenceId: string;
  onSuccess: () => void;
  onTabChange: (current: number) => void;
  search?: string;
  onClearSearch?: () => void;
}

export default ChooseMemberForm;