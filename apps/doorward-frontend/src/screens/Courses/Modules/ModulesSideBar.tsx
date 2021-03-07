import React from 'react';
import Header from '@doorward/ui/components/Header';
import translate from '@doorward/common/lang/translate';
import Spacer from '@doorward/ui/components/Spacer';
import ContentList from '@doorward/ui/components/ContentList';
import WebComponent from '@doorward/ui/components/WebComponent';
import Empty from '@doorward/ui/components/Empty';
import Row from '@doorward/ui/components/Row';
import ModuleItemEntity from '@doorward/common/entities/module.item.entity';
import Icon from '@doorward/ui/components/Icon';
import { ModuleItemIcons } from '../../../components/Dropdowns/AddModuleItemDropdown';
import ROUTES from '@doorward/common/frontend/routes/main';
import useNavigation from '@doorward/ui/hooks/useNavigation';
import useCourse from '../../../hooks/useCourse';

const ModulesSideBar: React.FunctionComponent<ModulesSideBarProps> = ({ courseId, item }): JSX.Element => {
  const navigation = useNavigation();
  const course = useCourse(courseId);

  return (
    <WebComponent
      data={course.data?.course}
      loading={!course}
      emptyMessage={translate('courseDoesNotExist')}
      size="small"
    >
      {({ modules }) => (
        <div>
          <Header size={2}>{translate('courseContent')}</Header>
          <Spacer size="large" />
          <ContentList>
            {modules.map((module) => (
              <ContentList.Menu title={module.title}>
                {module.items?.length ? (
                  <React.Fragment>
                    {module.items.map((moduleItem) => (
                      <ContentList.MenuItem
                        onClick={() => {
                          navigation.navigate(ROUTES.courses.modules.items.view, {
                            itemId: moduleItem.id,
                          });
                        }}
                        selected={item?.id === moduleItem.id}
                      >
                        <Row style={{ justifyContent: 'start', alignItems: 'center', alignContent: 'center' }}>
                          <Icon icon={ModuleItemIcons[moduleItem.type]} />
                          <span>{moduleItem.title}</span>
                        </Row>
                      </ContentList.MenuItem>
                    ))}
                  </React.Fragment>
                ) : (
                  <Empty modelName={translate('moduleItems')} size="small" />
                )}
              </ContentList.Menu>
            ))}
          </ContentList>
        </div>
      )}
    </WebComponent>
  );
};

export interface ModulesSideBarProps {
  courseId: string;
  item: ModuleItemEntity;
}

export default ModulesSideBar;
