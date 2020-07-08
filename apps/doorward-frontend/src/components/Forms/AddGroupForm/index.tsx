import React, { useEffect } from 'react';
import TextField from '@doorward/ui/components/Input/TextField';
import useForm from '@doorward/ui/hooks/useForm';
import { User } from '@doorward/common/models/User';
import { useSelector } from 'react-redux';
import { State } from '../../../store';
import UserChooser from '@doorward/ui/components/UserChooser';
import Header from '@doorward/ui/components/Header';
import './AddGroupForm.scss';
import WebComponent from '@doorward/ui/components/WebComponent';
import ItemArray from '@doorward/ui/components/ItemArray';
import SimpleUserView from '@doorward/ui/components/UserChooser/SimpleUserView';
import Icon from '@doorward/ui/components/Icon';
import useUserChooser from '@doorward/ui/hooks/useUserChooser';
import TextLink from '@doorward/ui/components/TextLink';
import IfElse from '@doorward/ui/components/IfElse';
import BasicForm from '../BasicForm';
import { createGroupAction, updateGroupAction } from '../../../reducers/groups/actions';
import validation from './validation';
import { Group } from '@doorward/common/models/Group';
import VerticalScroll from '@doorward/ui/components/VerticalScroll';

interface InitialValues {
  name: string;
  members: Array<User>;
}

const AddGroupForm: React.FunctionComponent<AddGroupFormProps> = (props): JSX.Element => {
  const form = useForm();
  const hook = useUserChooser(props.users, props.group?.members);
  const state = useSelector((state: State) => (props.group ? state.groups.updateGroup : state.groups.createGroup));
  const initialValues: InitialValues = props.group || {
    name: '',
    members: [],
  };

  return (
    <BasicForm
      form={form}
      initialValues={initialValues}
      validationSchema={validation}
      showSuccessToast
      onSuccess={props.onSuccess}
      submitAction={props.group ? updateGroupAction : createGroupAction}
      state={state}
      createData={values => {
        const data = [];
        if (props.group) {
          data.push(props.group.id);
        }
        data.push({
          name: values.name,
          members: values.members.map(member => member.id),
          type: props.type,
        });
        return data;
      }}
    >
      {formikProps => (
        <div className="add-group-form">
          <div className="add-group-form__form">
            <TextField name="name" placeholder="Name" />
            <div className="member-list">
              <div className="member-list__header">
                <Header size={3}>{props.title}</Header>
                <IfElse condition={hook.count !== props.users.length}>
                  <TextLink onClick={hook.selectAll}>Select All</TextLink>
                </IfElse>
              </div>
              <UserChooser
                useUserChooser={hook}
                removeOnSelection
                onChange={users => {
                  formikProps.setFieldValue('members', users);
                  formikProps.handleBlur({ target: { name: 'members' } });
                }}
              />
            </div>
          </div>
          <div className="add-group-form__selected">
            <div className="member-list__header">
              <Header size={2}>Selected {props.title}</Header>
              <IfElse condition={formikProps.values.members.length}>
                <TextLink onClick={hook.deselectAll}>Deselect All</TextLink>
              </IfElse>
            </div>
            <VerticalScroll maxHeight={500}>
              <WebComponent
                data={formikProps.values.members as Array<User>}
                loading={false}
                size="medium"
                emptyMessage="None selected yet."
              >
                {items => (
                  <div className="add-group-form__selected--list">
                    <ItemArray data={items}>
                      {item => (
                        <SimpleUserView user={item}>
                          <Icon
                            icon="close"
                            className="remove-member"
                            onClick={() => {
                              hook.deselect(item.id);
                            }}
                          />
                        </SimpleUserView>
                      )}
                    </ItemArray>
                  </div>
                )}
              </WebComponent>
            </VerticalScroll>
          </div>
        </div>
      )}
    </BasicForm>
  );
};

export interface AddGroupFormProps {
  users: Array<User>;
  title: string;
  type?: string;
  onSuccess: () => void;
  group?: Group;
}

export default AddGroupForm;