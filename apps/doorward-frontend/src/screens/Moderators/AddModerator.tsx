import React from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import { useSelector } from 'react-redux';
import { State } from '../../store';
import useRoutes from '../../hooks/useRoutes';
import { Redirect } from 'react-router';
import AddModeratorForm from '../../components/Forms/AddModeratorForm';
import IfElse from '@doorward/ui/components/IfElse';
import useFormSubmit from '@doorward/ui/hooks/useFormSubmit';
import useForm from '@doorward/ui/hooks/useForm';
import { PageComponent } from '@doorward/ui/types';

const AddModerator: React.FunctionComponent<AddMemberProps> = props => {
  const moderatorForm = useForm();
  const routes = useRoutes();
  const newModerator = useSelector((state: State) => state.moderators.createModerator);
  const submitted = useFormSubmit(newModerator);

  return (
    <IfElse condition={submitted}>
      <Redirect to={routes.routes.moderatorList.link} />
      <Layout
        {...props}
        header={routes.addModerator.name}
        features={[LayoutFeatures.HEADER, LayoutFeatures.BREAD_CRUMBS, LayoutFeatures.BACK_BUTTON]}
      >
        <AddModeratorForm
          onCancel={() => routes.navigate(routes.routes.moderatorList)}
          useForm={moderatorForm}
          state={newModerator}
        />
      </Layout>
    </IfElse>
  );
};

export interface AddMemberProps extends PageComponent {}

export default AddModerator;
