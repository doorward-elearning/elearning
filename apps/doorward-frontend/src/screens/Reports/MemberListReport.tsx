import React, { useState } from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import MemberReportsTable from '../../components/Tables/MemberReportsTable';
import useRoutes from '../../hooks/useRoutes';
import { PageComponent } from '@doorward/ui/types';
import { Member } from '@doorward/common/models/Member';

const MemberListReport: React.FunctionComponent<MemberReportsProps> = props => {
  const routes = useRoutes();
  const [search, setSearch] = useState('');
  const onSearch = (text: string) => {
    setSearch(text);
  };
  return (
    <Layout
      {...props}
      features={[LayoutFeatures.HEADER, LayoutFeatures.BREAD_CRUMBS, LayoutFeatures.SEARCH_BAR]}
      header="Member Reports"
      onSearch={onSearch}
    >
      <MemberReportsTable
        filter={search}
        onRowClick={(member: Member): void => routes.navigate(routes.memberReport, { memberId: member.id })}
      />
    </Layout>
  );
};

export interface MemberReportsProps extends PageComponent {}

export default MemberListReport;
