import React, { useEffect } from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import { PageComponent } from '@doorward/ui/types';
import './SchoolClassrooms.scss';
import { NavbarFeatures } from '@doorward/ui/components/NavBar/features';
import WebComponent from '@doorward/ui/components/WebComponent';
import useModal from '@doorward/ui/hooks/useModal';
import AddClassroomModal from '../../components/Modals/AddClassroomModal';
import Card from '@doorward/ui/components/Card';
import Tools from '@doorward/common/utils/Tools';
import EImage from '@doorward/ui/components/Image';
import courseImage from '../../assets/images/course.svg';
import Header from '@doorward/ui/components/Header';
import ItemArray from '@doorward/ui/components/ItemArray';
import Button from '@doorward/ui/components/Buttons/Button';
import Panel from '@doorward/ui/components/Panel';
import DoorwardApi from '../../services/apis/doorward.api';
import translate from '@doorward/common/lang/translate';
import useApiAction from '@doorward/api-actions/hooks/useApiAction';
import { useRouteMatch } from 'react-router';
import ROUTES from '@doorward/common/frontend/routes/main';
import useNavigation from '@doorward/ui/hooks/useNavigation';

const SchoolClassrooms: React.FunctionComponent<ClassroomsProps> = (props): JSX.Element => {
  const [fetchSchool, schoolState] = useApiAction(DoorwardApi, (api) => api.schools.getSchool);
  const match = useRouteMatch<{ schoolId: string }>();
  const navigation = useNavigation();

  useEffect(() => {
    if (match.params.schoolId) {
      fetchSchool(match.params.schoolId);
    }
  }, [match.params]);

  const addClassroomModal = useModal();

  return (
    <Layout
      {...props}
      header={schoolState.data?.school?.name}
      navFeatures={[NavbarFeatures.BACK_BUTTON, NavbarFeatures.USER_MANAGEMENT, NavbarFeatures.PAGE_LOGO]}
      features={[LayoutFeatures.HEADER, LayoutFeatures.BREAD_CRUMBS, LayoutFeatures.ACTION_BUTTON]}
      actionBtnProps={{ text: translate('addClassroom'), onClick: addClassroomModal.openModal }}
    >
      <div>
        <AddClassroomModal
          onSuccess={() => {
            addClassroomModal.closeModal();
            fetchSchool(schoolState.data?.school?.id);
          }}
          modal={addClassroomModal}
          schoolId={schoolState.data?.school?.id}
        />
        <Panel plain>{translate('clickOnAnyOfTheFollowingClassroomsToJoinAMeeting')}</Panel>
        <WebComponent
          data={schoolState.data?.school?.classRooms}
          loading={schoolState.fetching}
          emptyMessage={translate('noClassroomsHaveBeenCreatedForThisSchool')}
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
                            navigation.navigate(ROUTES.meeting.join, {
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
                              <Button>{translate('join')}</Button>
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
      </div>
    </Layout>
  );
};

export interface ClassroomsProps extends PageComponent {}

export default SchoolClassrooms;
