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
import DraftHTMLContent from '../../../components/ui/DraftHTMLContent';
import CreateQuizForm from '../../../components/static/Forms/QuizForms/CreateQuizForm';
import useForm from '../../../hooks/useForm';
import RoleContainer from '../../../components/static/RolesManager/RoleContainer';
import { Roles } from '../../../components/static/RolesManager';
import CreateAssignmentForm from '../../../components/static/Forms/CreateAssignmentForm';
import QuizView from '../../../components/static/UI/QuizView';
import EditableView from '../../../components/static/EditableView';

const ViewModuleItem: React.FunctionComponent<ViewModulePageProps> = props => {
  const [item, setItem] = useState<ModuleItem>();
  const [module, setModule] = useState<Module>();
  const [editing, setEditing] = useState(false);
  const [courseId, course] = useViewCourse();
  const match: any = useRouteMatch();
  const routes = useRoutes();
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
  }, [course.data.course]);

  const goBack = () => {
    routes.navigate(routes.viewCourse, {
      courseId,
    });
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
        theme: 'secondary',
        roles: [Roles.TEACHER],
        onClick: () => setEditing(true),
        disabled: editing,
      }}
      header={Tools.str(item?.title)}
    >
      <WebComponent data={item} loading={course.fetching}>
        {(item): JSX.Element => {
          return (
            <React.Fragment>
              <IfElse condition={item.type === 'Page'}>
                <DraftHTMLContent content={item.content} />
              </IfElse>
              {module && (
                <React.Fragment>
                  <IfElse condition={item.type === 'Quiz'}>
                    <EditableView
                      viewerView={<QuizView quiz={item} />}
                      creatorView={
                        <CreateQuizForm
                          onSuccess={() => {}}
                          onCancel={() => setEditing(false)}
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
                    <RoleContainer roles={[Roles.TEACHER]}>
                      <CreateAssignmentForm
                        onSuccess={() => {}}
                        onCancel={goBack}
                        form={assignmentForm}
                        module={module}
                        assignment={item}
                      />
                    </RoleContainer>
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
