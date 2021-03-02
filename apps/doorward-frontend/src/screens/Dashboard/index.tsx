import React from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import CourseList from './CourseList';
import { PageComponent } from '@doorward/ui/types';
import Message from '@doorward/ui/components/Message';
import Header from '@doorward/ui/components/Header';
import IfElse from '@doorward/ui/components/IfElse';
import useQueryParams from '@doorward/ui/hooks/useQueryParams';
import translate from '@doorward/common/lang/translate';
import { useHistory } from 'react-router';

const Dashboard: React.FunctionComponent<DashboardProps> = (props) => {
  const { query } = useQueryParams();
  const history = useHistory();
  return (
    <Layout
      {...props}
      features={[LayoutFeatures.HEADER]}
      header={translate('dashboard').toUpperCase()}
      renderTopContent={() => (
        <IfElse condition={query.newAccount}>
          <Message onClose={() => history.push('/dashboard')}>
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
