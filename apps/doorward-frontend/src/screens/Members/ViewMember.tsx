import React, { useEffect } from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import MemberProfileView from '../../components/UI/MemberProfileView';
import { PageComponent } from '@doorward/ui/types';
import usePageResource from '../../hooks/usePageResource';
import { getMemberAction } from '../../reducers/members/actions';
import { useSelector } from 'react-redux';
import { State } from '../../store';
import WebComponent from '@doorward/ui/components/WebComponent';
import useRoutes from '../../hooks/useRoutes';

const ViewMember: React.FunctionComponent<ViewMemberProps> = (props): JSX.Element => {
  usePageResource('memberId', getMemberAction);
  const routes = useRoutes();
  const member = useSelector((state: State) => state.members.member);

  useEffect(() => {
    if (member.data.member) {
      routes.setCurrentTitle(member.data.member.fullName);
    }
  }, [member]);

  return (
    <Layout
      {...props}
      header={member.data?.member?.fullName}
      features={[LayoutFeatures.HEADER, LayoutFeatures.BREAD_CRUMBS, LayoutFeatures.BACK_BUTTON]}
    >
      <WebComponent data={member.data.member} loading={member.fetching}>
        {data => {
          return <MemberProfileView member={data} />;
        }}
      </WebComponent>
    </Layout>
  );
};

export interface ViewMemberProps extends PageComponent {}

export default ViewMember;
