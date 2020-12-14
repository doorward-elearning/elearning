import React from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import CourseList from './CourseList';
import { PageComponent } from '@doorward/ui/types';
import Message from '@doorward/ui/components/Message';
import Header from '@doorward/ui/components/Header';
import IfElse from '@doorward/ui/components/IfElse';
import useQueryParams from '@doorward/ui/hooks/useQueryParams';
import useRoutes from '../../hooks/useRoutes';
import translate from '@doorward/common/lang/translate';

const Dashboard: React.FunctionComponent<DashboardProps> = (props) => {
  const { query } = useQueryParams();
  const routes = useRoutes();
  return (
    <Layout
      {...props}
      features={[LayoutFeatures.HEADER]}
      header={translate('dashboard').toUpperCase()}
      renderTopContent={() => (
        <IfElse condition={query.newAccount}>
          <Message onClose={() => routes.navigate(routes.dashboard)}>
            <Header size={5}>{translate('thankYouForJoiningDoorward')}</Header>
          </Message>
        </IfElse>
      )}
    >
      <CourseList />
    </Layout>
  );
};

export interface DashboardProps extends PageComponent {}

export default Dashboard;
