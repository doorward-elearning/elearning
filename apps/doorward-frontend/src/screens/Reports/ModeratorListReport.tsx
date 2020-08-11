import React, { FunctionComponent } from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import ModeratorReportTable from '../../components/Tables/ModeratorReportTable';
import useRoutes from '../../hooks/useRoutes';
import { PageComponent } from '@doorward/ui/types';

const ModeratorListReport: FunctionComponent<ModeratorListReportProps> = (props): JSX.Element => {
  const routes = useRoutes();
  return (
    <Layout
      {...props}
      features={[LayoutFeatures.HEADER, LayoutFeatures.SEARCH_BAR, LayoutFeatures.BREAD_CRUMBS]}
      header="Moderator Report"
    >
      <ModeratorReportTable onRowClick={row => routes.navigate(routes.moderatorReport, { moderatorId: row.id })} />
    </Layout>
  );
};

export interface ModeratorListReportProps extends PageComponent {}

export default ModeratorListReport;
