import React, { useEffect } from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import MemberTable from '../../components/Tables/MemberTable';
import { useSelector } from 'react-redux';
import { State } from '../../store';
import useRoutes from '../../hooks/useRoutes';
import { PageComponent } from '@doorward/ui/types';
import PaginationContainer from '@doorward/ui/components/PaginationContainer';
import useAction from '@doorward/ui/hooks/useActions';
import { fetchMemberListAction } from '../../reducers/members/actions';
import useQueryParams from '@doorward/ui/hooks/useQueryParams';
import { ParsedUrlQuery } from 'querystring';

export interface MemberListQueryParams extends ParsedUrlQuery {
  search: string;
  page: string;
}

const MemberList: React.FunctionComponent<MemberListProps> = props => {
  const memberList = useSelector((state: State) => state.members.memberList);
  const routes = useRoutes();
  const fetch = useAction(fetchMemberListAction);
  const { query, updateLocation } = useQueryParams<MemberListQueryParams>();
  const total = memberList.data.meta?.pagination?.total;

  useEffect(() => {
    fetch({ page: query.page }, { search: query.search });
  }, [query.search]);

  return (
    <Layout
      {...props}
      header="All Members"
      suggestionsType="members"
      searchPlaceholder="Search members..."
      headerBadge={total === undefined ? null : `${total}`}
      actionBtnProps={{
        text: 'Add Member',
        onClick: (): void => props.history.push(routes.routes.newMember.link),
      }}
      features={[LayoutFeatures.BREAD_CRUMBS, LayoutFeatures.HEADER, LayoutFeatures.ACTION_BUTTON]}
      onSearch={text => {
        updateLocation({
          search: text,
        });
      }}
    >
      <PaginationContainer
        data={memberList.data.members}
        state={memberList}
        onChangePage={currentPage => {
          fetch({ page: currentPage });
        }}
      >
        {(members): JSX.Element => {
          return (
            <MemberTable
              members={members}
              onClickMember={row => {
                routes.navigate(routes.viewMember, {
                  memberId: row.id,
                });
              }}
            />
          );
        }}
      </PaginationContainer>
    </Layout>
  );
};

export interface MemberListProps extends PageComponent {}

export default MemberList;
