import React, { useEffect, useState } from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import MemberTable from '../../components/Tables/MemberTable';
import { useSelector } from 'react-redux';
import { State } from '../../store';
import { fetchConferenceMemberListAction, unEnrollMemberAction } from '../../reducers/conferences/actions';
import useViewConference from '../../hooks/useViewConference';
import useRoutes from '../../hooks/useRoutes';
import useAction from '@doorward/ui/hooks/useActions';
import WebComponent from '@doorward/ui/components/WebComponent';
import { PageComponent } from '@doorward/ui/types';
import Dropdown from '@doorward/ui/components/Dropdown';
import { Member } from '@doorward/common/models/Member';
import WebConfirmModal from '@doorward/ui/components/ConfirmModal/WebConfirmModal';
import useModal from '@doorward/ui/hooks/useModal';

const MemberDropdownMenu: React.FunctionComponent<{ member: Member; onUnEnroll: (member: Member) => void }> = ({
  member,
  onUnEnroll,
}) => {
  return (
    <Dropdown.Menu>
      <Dropdown.Item onClick={() => onUnEnroll(member)} icon="delete">
        Un-enroll
      </Dropdown.Item>
    </Dropdown.Menu>
  );
};

const ConferenceMemberList: React.FunctionComponent<MemberListProps> = props => {
  const memberList = useSelector((state: State) => state.conferences.memberList);
  const routes = useRoutes();
  const unEnrollMemberModal = useModal(false);
  const unEnrollState = useSelector((state: State) => state.conferences.unEnrollMember);
  const [unEnrollMember, setUnEnrollMember] = useState(null);
  useViewConference();

  const fetch = useAction(fetchConferenceMemberListAction);

  const [conferenceId, conference] = useViewConference();

  useEffect(() => {
    fetch(conferenceId);
  }, []);

  useEffect(() => {
    if (unEnrollMember) {
      unEnrollMemberModal.openModal();
    } else {
      unEnrollMemberModal.closeModal();
    }
  }, [unEnrollMember]);

  return (
    <Layout
      {...props}
      header={`${conference.data?.conference?.title ? conference.data.conference.title + ' - ' : ''} Member List`}
      actionBtnProps={{
        text: 'Enroll Member',
        onClick: (): void => props.history.push(routes.routes.addConferenceMember.link),
      }}
      features={[LayoutFeatures.BREAD_CRUMBS, LayoutFeatures.HEADER, LayoutFeatures.ACTION_BUTTON]}
    >
      <WebComponent data={memberList.data.members} loading={memberList.fetching}>
        {(members): JSX.Element => {
          return (
            <MemberTable
              tableProps={{
                actionMenu: member => <MemberDropdownMenu member={member} onUnEnroll={setUnEnrollMember} />,
              }}
              onClickMember={member => {
                routes.navigate(routes.viewMember, { memberId: member.id });
              }}
              members={members}
            />
          );
        }}
      </WebComponent>
      <WebConfirmModal
        useModal={unEnrollMemberModal}
        action={() => unEnrollMemberAction(unEnrollMember.id, conferenceId)}
        state={unEnrollState}
        showErrorToast
        title="Un-enroll member"
        showSuccessToast
        onSuccess={() => {
          fetch(conferenceId);
          setUnEnrollMember(null);
        }}
      >
        <p>Are you sure you want to un-enroll this member from the conference?</p>
      </WebConfirmModal>
    </Layout>
  );
};

export interface MemberListProps extends PageComponent {}

export default ConferenceMemberList;
