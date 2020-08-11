import React from 'react';
import * as Yup from 'yup';
import { deleteConferenceAction } from '../../../reducers/conferences/actions';
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
import { Conference } from '@doorward/common/models/Conference';
import RoleContainer from '@doorward/ui/components/RolesManager/RoleContainer';
import { Roles } from '@doorward/ui/components/RolesManager';

const ConferenceViewMenuModals: React.FunctionComponent<ConferenceViewMenuModalsProps> = ({ conference, deleteConferenceModal }) => {
  const deleteForm = useForm();
  const routes = useRoutes();
  const deleteState = useSelector((state: State) => state.conferences.deleteConference);
  const onDeleteSuccess = () => {
    routes.navigate(routes.conferenceList);
  };
  return (
    <React.Fragment>
      <Form
        initialValues={{ conferenceName: '' }}
        form={deleteForm}
        onSubmit={() => {}}
        validationSchema={Yup.object({
          conferenceName: Yup.string()
            .nullable()
            .required('Please enter the name of the conference')
            .oneOf([conference.title], 'Please enter the exact name of the conference'),
        })}
      >
        {formikProps => (
          <WebConfirmModal
            state={deleteState}
            useModal={deleteConferenceModal}
            title="Delete Conference"
            showErrorToast
            showSuccessToast
            buttonDisabled={!formikProps.isValid}
            action={() => deleteConferenceAction(conference.id)}
            onSuccess={onDeleteSuccess}
          >
            <div>
              <p>Deleting a conference will have the following effects.</p>
              <ul>
                <li>Members will be un-enrolled from the conference</li>
                <li>Conference resources will be deleted</li>
                <li>Conference report will no longer be accessible.</li>
              </ul>
              <TextField placeholder="Enter the conference name to confirm" name="conferenceName" />
            </div>
          </WebConfirmModal>
        )}
      </Form>
    </React.Fragment>
  );
};

const ConferenceViewMenu: React.FunctionComponent<ConferenceViewMenuProps> = props => {
  const deleteConferenceModal = useModal(false);

  return (
    <React.Fragment>
      <RoleContainer roles={[Roles.MODERATOR]} showSuperAdmin>
        <Dropdown positionX="right">
          <Icon icon="more_vert" />
          <Dropdown.Menu>
            {/*<Dropdown.Item icon="account_circle">Participants</Dropdown.Item>*/}
            {/*<Dropdown.Item icon="event">Calendar</Dropdown.Item>*/}
            {/*<Dropdown.Item icon="settings">Settings</Dropdown.Item>*/}
            {/*<Dropdown.Item icon="archive" onClick={deleteConferenceModal.openModal}>*/}
            {/*  Backup conference*/}
            {/*</Dropdown.Item>*/}
            <Dropdown.Item icon="delete" onClick={deleteConferenceModal.openModal}>
              Delete Conference
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </RoleContainer>
      <ConferenceViewMenuModals conference={props.conference} deleteConferenceModal={deleteConferenceModal} />
    </React.Fragment>
  );
};

export interface ConferenceViewMenuProps {
  conference: Conference;
}

export interface ConferenceViewMenuModalsProps {
  conference: Conference;
  deleteConferenceModal: UseModal;
}

export default ConferenceViewMenu;
