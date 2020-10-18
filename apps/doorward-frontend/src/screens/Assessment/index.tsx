import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router';
import useRoutes from '../../hooks/useRoutes';
import useAction from '@doorward/ui/hooks/useActions';
import DoorwardApi from '../../services/apis/doorward.api';
import useDoorwardApi from '../../hooks/useDoorwardApi';
import { AssessmentEntity } from '@doorward/common/entities/assessment.entity';
import Layout, { LayoutFeatures } from '../Layout';
import Tools from '@doorward/common/utils/Tools';
import { PageComponent } from '@doorward/ui/types';
import AssessmentPage from './AssessmentPage';
import WebComponent from '@doorward/ui/components/WebComponent';

const Assessment: React.FunctionComponent<AssessmentProps> = (props): JSX.Element => {
  const [assessment, setAssessment] = useState<AssessmentEntity>();
  const match: any = useRouteMatch();
  const routes = useRoutes();

  const fetchItem = useAction(DoorwardApi.moduleItems.getModuleItem);
  useEffect(() => {
    fetchItem(match.params.assessmentId);
  }, []);

  const state = useDoorwardApi((state) => state.moduleItems.getModuleItem);

  useEffect(() => {
    const moduleItem = state.data.item;
    if (moduleItem) {
      setAssessment(moduleItem as AssessmentEntity);
    }
  }, [state]);

  return (
    <Layout
      {...props}
      features={[LayoutFeatures.HEADER, LayoutFeatures.BACK_BUTTON]}
      header={Tools.str(state.fetching ? '' : assessment?.title)}
    >
      <WebComponent data={assessment} loading={state.fetching}>
        {(assessment) => <AssessmentPage assessment={assessment} />}
      </WebComponent>
    </Layout>
  );
};

export interface AssessmentProps extends PageComponent {}

export default Assessment;
