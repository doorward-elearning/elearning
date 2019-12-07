import React, { useEffect, useState } from 'react';
import { Module, ModuleItem } from '../../../services/models';
import useViewCourse from '../../../hooks/useViewCourse';
import { useRouteMatch } from 'react-router';
import Layout, { LayoutFeatures } from '../../Layout';
import WebComponent from '../../../components/ui/WebComponent';
import { PageComponent } from '../../../types';
import useRoutes from '../../../hooks/useRoutes';
import Tools from '../../../utils/Tools';
import IfElse from '../../../components/ui/IfElse';
import CreateQuizForm from '../../../components/static/Forms/QuizForms/CreateQuizForm';
import useForm from '../../../hooks/useForm';
import { Roles } from '../../../components/static/RolesManager';
import CreateAssignmentForm from '../../../components/static/Forms/CreateAssignmentForm';
import QuizView from '../../../components/static/UI/QuizView';
import EditableView from '../../../components/static/EditableView';
import AssignmentView from '../../../components/static/UI/AssignmentView';
import ViewPages from './ViewPages';

const ViewModuleItem: React.FunctionComponent<ViewModulePageProps> = props => {
  const [item, setItem] = useState<ModuleItem>();
  const [module, setModule] = useState<Module>();
  const [courseId, course] = useViewCourse();
  const match: any = useRouteMatch();
  const routes = useRoutes();
  const [editing, setEditing] = useState(routes.currentRoute === routes.editModuleItem.id);
  const assignmentForm = useForm();

  useEffect(() => {
    if (course.data.course) {
      const currentModule = course.data.course.modules.find(module => module.id === match.params.moduleId);
      if (currentModule) {
        setModule(currentModule);
        const moduleItem = currentModule.items.find(item => {
          return item.id === match.params.itemId;
        });
        setItem(moduleItem);
        routes.setTitle(routes.viewModuleItem.id, currentModule.title);
      }
    }
  }, [course.data.course, match.params.itemId]);

  const goBack = () => {
    routes.navigate(routes.viewCourse, {
      courseId,
    });
  };

  const params = {
    courseId,
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
      noNavBar
      actionBtnProps={{
        icon: 'edit',
        text: item ? `Edit ${item?.type}` : '',
        theme: 'secondary',
        roles: [Roles.TEACHER],
        onClick: () => routes.navigate(routes.editModuleItem, params),
        disabled: editing,
      }}
      header={Tools.str(item?.title)}
    >
      <WebComponent data={item} loading={course.fetching}>
        {(item): JSX.Element => {
          return (
            <React.Fragment>
              {module && (
                <React.Fragment>
                  <IfElse condition={item.type === 'Page'}>
                    <ViewPages module={module} editing={editing} params={params} item={item}/>
                  </IfElse>
                  <IfElse condition={item.type === 'Quiz'}>
                    <EditableView
                      viewerView={<QuizView quiz={item} />}
                      creatorView={
                        <CreateQuizForm
                          onSuccess={() => {}}
                          onCancel={() => routes.navigate(routes.viewModuleItem, params)}
                          module={module}
                          quiz={item}
                        />
                      }
                      creator={[Roles.TEACHER]}
                      viewer={[Roles.STUDENT]}
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
                      creator={[Roles.TEACHER]}
                      viewer={[Roles.STUDENT]}
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
