import React, { useEffect, useState } from 'react';
import useViewConference from '../../../hooks/useViewConference';
import { useRouteMatch } from 'react-router';
import Layout, { LayoutFeatures } from '../../Layout';
import useRoutes from '../../../hooks/useRoutes';
import CreateQuizForm from '../../../components/Forms/QuizForms/CreateQuizForm';
import CreateAssignmentForm from '../../../components/Forms/CreateAssignmentForm';
import QuizView from '../../../components/UI/QuizView';
import EditableView from '../../../components/EditableView';
import AssignmentView from '../../../components/UI/AssignmentView';
import ViewPages from './ViewPages';
import WebComponent from '@doorward/ui/components/WebComponent';
import IfElse from '@doorward/ui/components/IfElse';
import Tools from '@doorward/common/utils/Tools';
import { Roles } from '@doorward/ui/components/RolesManager';
import useForm from '@doorward/ui/hooks/useForm';
import { PageComponent } from '@doorward/ui/types';
import { Module } from '@doorward/common/models/Module';
import { ModuleItem } from '@doorward/common/models/ModuleItem';
import useAction from '@doorward/ui/hooks/useActions';
import { fetchModuleItem } from '../../../reducers/conferences/actions';
import { useSelector } from 'react-redux';
import { State } from '../../../store';

const ViewModuleItem: React.FunctionComponent<ViewModulePageProps> = props => {
  const [item, setItem] = useState<ModuleItem>();
  const [module, setModule] = useState<Module>();
  const [conferenceId, conference] = useViewConference();
  const match: any = useRouteMatch();
  const routes = useRoutes();
  const [editing, setEditing] = useState(routes.currentRoute === routes.editModuleItem.id);
  const assignmentForm = useForm();

  const fetchItem = useAction(fetchModuleItem);
  useEffect(() => {
    fetchItem(match.params.itemId);
  }, [match.params.itemId]);

  const state = useSelector((state: State) => state.conferences.moduleItem);

  useEffect(() => {
    setEditing(routes.currentRoute === routes.editModuleItem.id);
  }, [routes.currentRoute]);

  useEffect(() => {
    const moduleItem = state.data.item;
    if (moduleItem) {
      setItem(moduleItem);
    }
  }, [state]);

  useEffect(() => {
    if (conference.data.conference) {
      const currentModule = conference.data.conference.modules.find(module => module.id === match.params.moduleId);
      if (currentModule) {
        setModule(currentModule);
        routes.setTitle(routes.viewModuleItem.id, currentModule.title);
      }
    }
  }, [conference.data.conference, match.params.itemId]);

  const goBack = () => {
    routes.navigate(routes.viewConference, {
      conferenceId,
    });
  };

  const params = {
    conferenceId,
    moduleId: module?.id,
    itemId: item?.id,
  };

  return (
    <Layout
      {...props}
      features={[
        LayoutFeatures.BREAD_CRUMBS,
        LayoutFeatures.HEADER,
        LayoutFeatures.BACK_BUTTON,
        LayoutFeatures.ACTION_BUTTON,
      ]}
      actionBtnProps={{
        icon: 'edit',
        text: item ? `Edit ${item?.type}` : '',
        theme: 'secondary',
        roles: [Roles.MODERATOR],
        onClick: () => routes.navigate(routes.editModuleItem, params),
        disabled: editing,
      }}
      header={Tools.str(state.fetching ? '' : item?.title)}
    >
      <WebComponent data={item} hasData={() => !state.fetching} loading={state.fetching}>
        {(item): JSX.Element => {
          return (
            <React.Fragment>
              {module && (
                <React.Fragment>
                  <IfElse condition={item.type === 'Page'}>
                    <ViewPages
                      onEditSuccess={() => setEditing(false)}
                      module={module}
                      editing={editing}
                      params={params}
                      item={item}
                    />
                  </IfElse>
                  <IfElse condition={item.type === 'Quiz'}>
                    <EditableView
                      viewerView={<QuizView quiz={item} onCancel={() => routes.navigate(routes.viewConference, params)} />}
                      creatorView={
                        <CreateQuizForm
                          onSuccess={() => {}}
                          onCancel={() => routes.navigate(routes.viewModuleItem, params)}
                          module={module}
                          quiz={item}
                        />
                      }
                      creator={[Roles.MODERATOR]}
                      viewer={[Roles.MEMBER]}
                      isEditing={editing}
                    />
                  </IfElse>
                  <IfElse condition={item.type === 'Assignment'}>
                    <EditableView
                      creatorView={
                        <CreateAssignmentForm
                          onSuccess={() => {}}
                          onCancel={goBack}
                          form={assignmentForm}
                          module={module}
                          assignment={item}
                        />
                      }
                      isEditing={editing}
                      viewerView={<AssignmentView assignment={item} />}
                      creator={[Roles.MODERATOR]}
                      viewer={[Roles.MEMBER]}
                    />
                  </IfElse>
                </React.Fragment>
              )}
            </React.Fragment>
          );
        }}
      </WebComponent>
    </Layout>
  );
};

export interface ViewModulePageProps extends PageComponent {}

export default ViewModuleItem;
