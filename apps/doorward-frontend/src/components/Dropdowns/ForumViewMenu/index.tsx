import React from 'react';
import * as Yup from 'yup';
import { deleteForumAction } from '../../../reducers/forums/actions';
import { useSelector } from 'react-redux';
import { State } from '../../../store';
import useRoutes from '../../../hooks/useRoutes';
import WebConfirmModal from '@doorward/ui/components/ConfirmModal/WebConfirmModal';
import useModal, { UseModal } from '@doorward/ui/hooks/useModal';
import Dropdown from '@doorward/ui/components/Dropdown';
import TextField from '@doorward/ui/components/Input/TextField';
import Icon from '@doorward/ui/components/Icon';
import useForm from '@doorward/ui/hooks/useForm';
import Form from '@doorward/ui/components/Form';
import { Forum } from '@doorward/common/models/Forum';
import RoleContainer from '@doorward/ui/components/RolesManager/RoleContainer';
import { Roles } from '@doorward/ui/components/RolesManager';

const ForumViewMenuModals: React.FunctionComponent<ForumViewMenuModalsProps> = ({ forum, deleteForumModal }) => {
  const deleteForm = useForm();
  const routes = useRoutes();
  const deleteState = useSelector((state: State) => state.forums.deleteForum);
  const onDeleteSuccess = () => {
    routes.navigate(routes.forumList);
  };
  return (
    <React.Fragment>
      <Form
        initialValues={{ forumName: '' }}
        form={deleteForm}
        onSubmit={() => {}}
        validationSchema={Yup.object({
          forumName: Yup.string()
            .nullable()
            .required('Please enter the name of the forum')
            .oneOf([forum.title], 'Please enter the exact name of the forum'),
        })}
      >
        {formikProps => (
          <WebConfirmModal
            state={deleteState}
            useModal={deleteForumModal}
            title="Delete Forum"
            showErrorToast
            showSuccessToast
            buttonDisabled={!formikProps.isValid}
            action={() => deleteForumAction(forum.id)}
            onSuccess={onDeleteSuccess}
          >
            <div>
              <p>Deleting a forum will have the following effects.</p>
              <ul>
                <li>Members will be un-enrolled from the forum</li>
                <li>Forum resources will be deleted</li>
                <li>Forum report will no longer be accessible.</li>
              </ul>
              <TextField placeholder="Enter the forum name to confirm" name="forumName" />
            </div>
          </WebConfirmModal>
        )}
      </Form>
    </React.Fragment>
  );
};

const ForumViewMenu: React.FunctionComponent<ForumViewMenuProps> = props => {
  const deleteForumModal = useModal(false);

  return (
    <React.Fragment>
      <RoleContainer roles={[Roles.MODERATOR]} showSuperAdmin>
        <Dropdown positionX="right">
          <Icon icon="more_vert" />
          <Dropdown.Menu>
            {/*<Dropdown.Item icon="account_circle">Participants</Dropdown.Item>*/}
            {/*<Dropdown.Item icon="event">Calendar</Dropdown.Item>*/}
            {/*<Dropdown.Item icon="settings">Settings</Dropdown.Item>*/}
            {/*<Dropdown.Item icon="archive" onClick={deleteForumModal.openModal}>*/}
            {/*  Backup forum*/}
            {/*</Dropdown.Item>*/}
            <Dropdown.Item icon="delete" onClick={deleteForumModal.openModal}>
              Delete Forum
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </RoleContainer>
      <ForumViewMenuModals forum={props.forum} deleteForumModal={deleteForumModal} />
    </React.Fragment>
  );
};

export interface ForumViewMenuProps {
  forum: Forum;
}

export interface ForumViewMenuModalsProps {
  forum: Forum;
  deleteForumModal: UseModal;
}

export default ForumViewMenu;
