import React from 'react';
import TextField from '@doorward/ui/components/Input/TextField';
import useForm from '@doorward/ui/hooks/useForm';
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
import VerticalScroll from '@doorward/ui/components/VerticalScroll';
import UserEntity from '@doorward/common/entities/user.entity';
import DoorwardApi from '../../../services/apis/doorward.api';
import { CreateGroupBody } from '@doorward/common/dtos/body';
import useDoorwardApi from '../../../hooks/useDoorwardApi';
import { GroupMemberResponse, SimpleGroupResponse } from '@doorward/common/dtos/response';
import translate from '@doorward/common/lang/translate';

interface InitialValues {
  name: string;
  members: Array<GroupMemberResponse>;
}

const AddGroupForm: React.FunctionComponent<AddGroupFormProps> = (props): JSX.Element => {
  const form = useForm();
  const hook = useUserChooser(props.users, props.group?.members);
  const state = useDoorwardApi((state) => (props.group ? state.groups.updateGroup : state.groups.createGroup));
  const initialValues: InitialValues = props.group || {
    name: '',
    members: [],
  };

  return (
    <BasicForm
      form={form}
      initialValues={initialValues}
      validationSchema={CreateGroupBody}
      showSuccessToast
      onSuccess={props.onSuccess}
      submitAction={props.group ? DoorwardApi.groups.updateGroup : DoorwardApi.groups.createGroup}
      state={state}
      createData={(values) => {
        const data = [];
        if (props.group) {
          data.push(props.group.id);
        }
        data.push({
          name: values.name,
          members: values.members.map((member) => member.id),
          type: props.type,
        });
        return data;
      }}
    >
      {(formikProps) => (
        <div className="add-group-form">
          <div className="add-group-form__form">
            <TextField name="name" placeholder="Name" />
            <div className="member-list">
              <div className="member-list__header">
                <Header size={3}>{props.title}</Header>
                <IfElse condition={hook.count !== props.users.length}>
                  <TextLink onClick={hook.selectAll}>{translate('selectAll')}</TextLink>
                </IfElse>
              </div>
              <UserChooser
                useUserChooser={hook}
                removeOnSelection
                onChange={(users) => {
                  formikProps.setFieldValue('members', users);
                  formikProps.handleBlur({ target: { name: 'members' } });
                }}
              />
            </div>
          </div>
          <div className="add-group-form__selected">
            <div className="member-list__header">
              <Header size={2}>
                {translate('selected')} {props.title}
              </Header>
              <IfElse condition={formikProps.values.members.length}>
                <TextLink onClick={hook.deselectAll}>{translate('deselectAll')}</TextLink>
              </IfElse>
            </div>
            <VerticalScroll maxHeight={500}>
              <WebComponent
                data={formikProps.values.members as Array<UserEntity>}
                loading={false}
                size="medium"
                emptyMessage={translate('noneSelectedYet')}
              >
                {(items) => (
                  <div className="add-group-form__selected--list">
                    <ItemArray data={items}>
                      {(item) => (
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
  users: Array<UserEntity>;
  title: string;
  type?: string;
  onSuccess: () => void;
  group?: SimpleGroupResponse;
}

export default AddGroupForm;
