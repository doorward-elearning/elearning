import React from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import translate from '@doorward/common/lang/translate';
import { PageComponent } from '@doorward/ui/types';
import { useRouteMatch } from 'react-router';

const GradeAssessment: React.FunctionComponent<GradeAssessmentProps> = (props): JSX.Element => {
  const match = useRouteMatch<{submissionId: string}>();
  return (
    <Layout
      {...props}
      features={[LayoutFeatures.HEADER, LayoutFeatures.BACK_BUTTON]}
      header={
        assessmentState.data?.item
          ? translate('assessmentSubmissionsTitle', { title: assessmentState.data.item.title })
          : ''
      }
    >
    </Layout>
  );
};

export interface GradeAssessmentProps extends PageComponent{
}

export default GradeAssessment;
