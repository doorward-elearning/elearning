import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router';
import Layout, { LayoutFeatures } from '../../Layout';
import CreateAssignmentForm from '../../../components/Forms/CreateAssignmentForm';
import EditableView from '../../../components/EditableView';
import AssignmentView from '../../../components/UI/AssignmentView';
import ViewPages from './ViewPages';
import WebComponent from '@doorward/ui/components/WebComponent';
import IfElse from '@doorward/ui/components/IfElse';
import Tools from '@doorward/common/utils/Tools';
import useForm from '@doorward/ui/hooks/useForm';
import { PageComponent } from '@doorward/ui/types';
import ModuleItemEntity from '@doorward/common/entities/module.item.entity';
import ModuleEntity from '@doorward/common/entities/module.entity';
import DoorwardApi from '../../../services/apis/doorward.api';
import { AssignmentEntity } from '@doorward/common/entities/assignment.entity';
import { PageEntity } from '@doorward/common/entities/page.entity';
import CreateAssessmentForm from '../../../components/Forms/AssessmentForm/CreateAssessmentForm';
import { ModuleItemType } from '@doorward/common/types/moduleItems';
import AssessmentView from '../../../components/UI/AssessmentView';
import { AssessmentEntity } from '@doorward/common/entities/assessment.entity';
import translate from '@doorward/common/lang/translate';
import ModulesSideBar from './ModulesSideBar';
import ViewModuleVideo from './ViewModuleVideo';
import { ModuleVideoEntity } from '@doorward/common/entities/module-video.entity';
import useApiAction from '@doorward/api-actions/hooks/useApiAction';
import ROUTES from '@doorward/common/frontend/routes/main';
import useNavigation from '@doorward/ui/hooks/useNavigation';
import RoleContainer from '@doorward/ui/components/RolesManager/RoleContainer';
import Button from '@doorward/ui/components/Buttons/Button';

const ViewModuleItem: React.FunctionComponent<ViewModulePageProps> = (props) => {
  const [item, setItem] = useState<ModuleItemEntity>();
  const [module, setModule] = useState<ModuleEntity>();
  const match = useRouteMatch<{ itemId: string }>();
  const navigation = useNavigation();
  const [editing, setEditing] = useState([ROUTES.courses.modules.items.update].includes(match.path));
  const assignmentForm = useForm();

  const [fetchModule, moduleState] = useApiAction(DoorwardApi, (api) => api.modules.getModule, {
    onSuccess: (data) => {
      setModule(data.module);
    },
  });

  const [fetchItem, state] = useApiAction(DoorwardApi, (api) => api.moduleItems.getModuleItem, {
    onSuccess: (data) => {
      setItem(data.item);
      fetchModule(data.item.moduleId);
    },
  });

  useEffect(() => {
    fetchItem(match.params.itemId);
  }, [match.params.itemId]);

  useEffect(() => {
    setEditing([ROUTES.courses.modules.items.update].includes(match.path));
  }, [match.path]);

  const goBack = () => {
    navigation.navigate(ROUTES.courses.view, {
      courseId: item.courseId,
    });
  };

  const editingComplete = () => {
    fetchItem(match.params.itemId);
    navigation.navigate(ROUTES.courses.modules.items.view, {
      itemId: item.id,
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
      actionBtnProps={{
        icon: 'edit',
        text: item ? translate('editItem', { item: item.type }) : '',
        theme: 'secondary',
        privileges: ['modules.update'],
        onClick: () => {
          navigation.navigate(ROUTES.courses.modules.items.update, {
            itemId: item.id,
          });
        },
        disabled: editing,
      }}
      renderHeaderEnd={() => (
        <RoleContainer privileges={['assignments.grade', 'assessments.grade']}>
          {item?.type === ModuleItemType.ASSESSMENT && (
            <Button
              link={Tools.createRoute(ROUTES.assessments.submissions.list, { assessmentId: item.id })}
              theme="primary"
            >
              {translate('viewResults')}
            </Button>
          )}
        </RoleContainer>
      )}
      header={Tools.str(state.fetching ? '' : item?.title)}
      rightContent={<ModulesSideBar item={item} courseId={item?.courseId} />}
    >
      <WebComponent data={item} hasData={() => !state.fetching} loading={state.fetching}>
        {(item): JSX.Element => {
          return (
            <React.Fragment>
              {module && (
                <React.Fragment>
                  <IfElse condition={item?.type === ModuleItemType.PAGE}>
                    <ViewPages
                      onEditSuccess={() => setEditing(false)}
                      module={module}
                      editing={editing}
                      item={item as PageEntity}
                    />
                  </IfElse>
                  <IfElse condition={item.type === ModuleItemType.ASSESSMENT}>
                    <EditableView
                      viewerView={
                        <AssessmentView
                          assessment={item as AssessmentEntity}
                          onCancel={() => {
                            fetchItem(match.params.itemId);
                            navigation.navigate(ROUTES.courses.view, {
                              courseId: item.courseId,
                            });
                          }}
                        />
                      }
                      creatorView={
                        <CreateAssessmentForm
                          onSuccess={editingComplete}
                          onCancel={() =>
                            navigation.navigate(ROUTES.courses.modules.items.view, {
                              itemId: item.id,
                            })
                          }
                          module={module}
                          assessment={item as AssessmentEntity}
                          type={(item as AssessmentEntity).assessmentType}
                        />
                      }
                      creatorPrivileges={['moduleItems.create']}
                      viewerPrivileges={['moduleItems.read']}
                      isEditing={editing}
                    />
                  </IfElse>
                  <IfElse condition={item.type === ModuleItemType.ASSIGNMENT}>
                    <EditableView
                      creatorView={
                        <CreateAssignmentForm
                          onSuccess={editingComplete}
                          onCancel={goBack}
                          form={assignmentForm}
                          module={module}
                          assignment={item as AssignmentEntity}
                        />
                      }
                      isEditing={editing}
                      viewerView={<AssignmentView assignment={item as AssignmentEntity} />}
                      creatorPrivileges={['moduleItems.create']}
                      viewerPrivileges={['moduleItems.read']}
                    />
                  </IfElse>
                  <IfElse condition={item.type === ModuleItemType.VIDEO}>
                    <ViewModuleVideo
                      module={module}
                      editing={editing}
                      item={item as ModuleVideoEntity}
                      onEditSuccess={editingComplete}
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
