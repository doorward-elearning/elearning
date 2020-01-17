import React from 'react';
import TextField from '@edudoor/ui/components/Input/TextField';
import useForm from '@edudoor/ui/hooks/useForm';
import { User } from '@edudoor/common/models/User';
import { useSelector } from 'react-redux';
import { State } from '../../../store';
import UserChooser from '@edudoor/ui/components/UserChooser';
import Header from '@edudoor/ui/components/Header';
import './AddGroupForm.scss';
import WebComponent from '@edudoor/ui/components/WebComponent';
import ItemArray from '@edudoor/ui/components/ItemArray';
import SimpleUserView from '@edudoor/ui/components/UserChooser/SimpleUserView';
import Icon from '@edudoor/ui/components/Icon';
import useUserChooser from '@edudoor/ui/hooks/useUserChooser';
import TextLink from '@edudoor/ui/components/TextLink';
import IfElse from '@edudoor/ui/components/IfElse';
import BasicForm from '../BasicForm';
import { createGroupAction } from '../../../reducers/groups/actions';
import validation from './validation';

type InitialValues = {
  name: string;
  members: Array<User>;
};

const AddGroupForm: React.FunctionComponent<AddGroupFormProps> = (props): JSX.Element => {
  const form = useForm();
  const hook = useUserChooser(props.users);
  const state = useSelector((state: State) => state.groups.createGroup);
  const initialValues: InitialValues = {
    name: '',
    members: [],
  };

  return (
    <BasicForm
      form={form}
      initialValues={initialValues}
      validationSchema={validation}
      showSuccessToast
      submitAction={createGroupAction}
      state={state}
      createData={values => [
        {
          name: values.name,
          members: values.members.map(member => member.id),
          type: props.type,
        },
      ]}
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
}

export default AddGroupForm;
