import React, { useEffect } from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import { PageComponent } from '@doorward/ui/types';
import './SchoolClassrooms.scss';
import { NavbarFeatures } from '@doorward/ui/components/NavBar/features';
import { fetchSchoolAction } from '../../reducers/schools/actions';
import usePageResource from '../../hooks/usePageResource';
import { useSelector } from 'react-redux';
import { State } from '../../store';
import WebComponent from '@doorward/ui/components/WebComponent';
import useRoutes from '../../hooks/useRoutes';
import useModal from '@doorward/ui/hooks/useModal';
import AddClassroomModal from '../../components/Modals/AddClassroomModal';
import useAction from '@doorward/ui/hooks/useActions';
import Card from '@doorward/ui/components/Card';
import Tools from '@doorward/common/utils/Tools';
import EImage from '@doorward/ui/components/Image';
import forumImage from '../../assets/images/forum.svg';
import Header from '@doorward/ui/components/Header';
import ItemArray from '@doorward/ui/components/ItemArray';
import Button from '@doorward/ui/components/Buttons/Button';
import Panel from '@doorward/ui/components/Panel';

const SchoolClassrooms: React.FunctionComponent<ClassroomsProps> = (props): JSX.Element => {
  const state = useSelector((state: State) => state.schools.school);
  const fetchSchool = useAction(fetchSchoolAction);
  usePageResource('schoolId', fetchSchoolAction);
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
      actionBtnProps={{ text: 'Add Classroom', onClick: addClassroomModal.openModal }}
    >
      <AddClassroomModal
        onSuccess={() => {
          addClassroomModal.closeModal();
          fetchSchool(state.data?.school?.id);
        }}
        modal={addClassroomModal}
        schoolId={state.data?.school?.id}
      />
      <Panel plain>Click on any of the following classrooms to join the online meeting.</Panel>
      <WebComponent
        data={state.data?.school?.classrooms}
        loading={state.fetching}
        emptyMessage={'No classrooms have been created for this school'}
        icon="business_center"
      >
        {classrooms => {
          return (
            <React.Fragment>
              <div className="classroom__list">
                <ItemArray data={classrooms}>
                  {classroom => (
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
                            <EImage src={forumImage} />
                          </div>
                        </Card.Header>
                        <Card.Body>
                          <Header size={2}>{classroom.name}</Header>
                        </Card.Body>
                        <Card.Footer>
                          <Panel plain>
                            <Button>Join</Button>
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
