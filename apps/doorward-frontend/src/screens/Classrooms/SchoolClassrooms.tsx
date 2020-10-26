import React, { useEffect } from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import { PageComponent } from '@doorward/ui/types';
import './SchoolClassrooms.scss';
import { NavbarFeatures } from '@doorward/ui/components/NavBar/features';
import usePageResource from '../../hooks/usePageResource';
import WebComponent from '@doorward/ui/components/WebComponent';
import useRoutes from '../../hooks/useRoutes';
import useModal from '@doorward/ui/hooks/useModal';
import AddClassroomModal from '../../components/Modals/AddClassroomModal';
import useAction from '@doorward/ui/hooks/useActions';
import Card from '@doorward/ui/components/Card';
import Tools from '@doorward/common/utils/Tools';
import EImage from '@doorward/ui/components/Image';
import courseImage from '../../assets/images/course.svg';
import Header from '@doorward/ui/components/Header';
import ItemArray from '@doorward/ui/components/ItemArray';
import Button from '@doorward/ui/components/Buttons/Button';
import Panel from '@doorward/ui/components/Panel';
import useDoorwardApi from '../../hooks/useDoorwardApi';
import DoorwardApi from '../../services/apis/doorward.api';
import translate from '@doorward/common/lang/translate';

const SchoolClassrooms: React.FunctionComponent<ClassroomsProps> = (props): JSX.Element => {
  const state = useDoorwardApi((state) => state.schools.getSchool);
  const fetchSchool = useAction(DoorwardApi.schools.getSchool);
  usePageResource('schoolId', DoorwardApi.schools.getSchool);
  const routes = useRoutes();
  const addClassroomModal = useModal();

  useEffect(() => {
    if (state.data.school) {
      routes.setCurrentTitle(state.data.school.name);
    }
  }, [state]);
  return (
    <Layout
      {...props}
      header={state.data?.school?.name}
      navFeatures={[NavbarFeatures.BACK_BUTTON, NavbarFeatures.USER_MANAGEMENT, NavbarFeatures.PAGE_LOGO]}
      features={[LayoutFeatures.HEADER, LayoutFeatures.BREAD_CRUMBS, LayoutFeatures.ACTION_BUTTON]}
      actionBtnProps={{ text: translate.addClassroom(), onClick: addClassroomModal.openModal }}
    >
      <AddClassroomModal
        onSuccess={() => {
          addClassroomModal.closeModal();
          fetchSchool(state.data?.school?.id);
        }}
        modal={addClassroomModal}
        schoolId={state.data?.school?.id}
      />
      <Panel plain>{translate.clickOnAnyOfTheFollowingClassroomsToJoinAMeeting()}</Panel>
      <WebComponent
        data={state.data?.school?.classRooms}
        loading={state.fetching}
        emptyMessage={translate.noClassroomsHaveBeenCreatedForThisSchool()}
        icon="business_center"
      >
        {(classrooms) => {
          return (
            <React.Fragment>
              <div className="classroom__list">
                <ItemArray data={classrooms}>
                  {(classroom) => (
                    <div className="classroom__list__item">
                      <Card
                        onClick={() =>
                          routes.navigate(routes.videoCall, {
                            meetingId: classroom.meetingRoom.currentMeeting.id,
                          })
                        }
                      >
                        <Card.Header image>
                          <div className="card-image" style={{ background: Tools.color(classroom.id) }}>
                            <EImage src={courseImage} />
                          </div>
                        </Card.Header>
                        <Card.Body>
                          <Header size={2}>{classroom.name}</Header>
                        </Card.Body>
                        <Card.Footer>
                          <Panel plain>
                            <Button>{translate.join()}</Button>
                          </Panel>
                        </Card.Footer>
                      </Card>
                    </div>
                  )}
                </ItemArray>
              </div>
            </React.Fragment>
          );
        }}
      </WebComponent>
    </Layout>
  );
};

export interface ClassroomsProps extends PageComponent {}

export default SchoolClassrooms;
