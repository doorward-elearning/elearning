import React, { FunctionComponent, useEffect, useState } from 'react';
import './styles/CourseList.scss';
import { fetchCoursesAction, startLiveClassroom } from '../../reducers/courses/actions';
import { State } from '../../store';
import useRoutes from '../../hooks/useRoutes';
import courseImage from '../../assets/images/course.svg';
import EImage from '@doorward/ui/components/Image';
import SimpleWebComponent from '@doorward/ui/components/WebComponent/SimpleWebComponent';
import Tools from '@doorward/common/utils/Tools';
import Plural from '@doorward/ui/components/Plural';
import Row from '@doorward/ui/components/Row';
import ItemArray from '@doorward/ui/components/ItemArray';
import Card from '@doorward/ui/components/Card';
import Header from '@doorward/ui/components/Header';
import { Course } from '@doorward/common/models/Course';
import RoleContainer from '@doorward/ui/components/RolesManager/RoleContainer';
import { Roles } from '@doorward/ui/components/RolesManager';
import ProgressModal from '../../components/Modals/ProgressModal';
import IfElse from '@doorward/ui/components/IfElse';
import Button from '@doorward/ui/components/Buttons/Button';
import useModal from '@doorward/ui/hooks/useModal';
import { useSelector } from 'react-redux';

const CourseList: FunctionComponent<CourseListProps> = (props): JSX.Element => {
  const liveClassroomModal = useModal(false);
  const [classroomCourse, startClassroom] = useState();

  const launchClassroom = useSelector((state: State) => state.courses.launchClassroom);
  const routes = useRoutes();

  useEffect(() => {
    if (classroomCourse) {
      liveClassroomModal.openModal();
    }
  }, [classroomCourse]);
  return (
    <SimpleWebComponent
      action={fetchCoursesAction}
      dataSelector={data => data.courses}
      selector={(state: State) => state.courses.courseList}
    >
      {data => (
        <div>
          <div className="dashboard__course-list">
            <ProgressModal
              state={launchClassroom}
              cancellable={false}
              showErrorToast
              action={() => startLiveClassroom(classroomCourse)}
              title="Starting classroom"
              useModal={liveClassroomModal}
              onSuccess={data => {
                routes.navigate(routes.videoCall, {
                  meetingId: data.id,
                });
              }}
            />
            <ItemArray data={data}>
              {(course: Course) => (
                <div className="dashboard__course-list__course">
                  <Card>
                    <Card.Header image>
                      <div className="card-image" style={{ background: Tools.color(course.id) }}>
                        <EImage src={courseImage} />
                      </div>
                    </Card.Header>
                    <Card.Body>
                      <Header size={2} onClick={() => routes.navigate(routes.viewCourse, { courseId: course.id })}>
                        {course.title}
                      </Header>
                      <div>
                        <ItemArray
                          data={Tools.truncate(course.modules, 3)}
                          empty={<span>No modules have been added</span>}
                        >
                          {module => <div>{module.title}</div>}
                        </ItemArray>
                      </div>
                      <Row style={{ justifyContent: 'space-between' }}>
                        <span className="meta">{Tools.normalDate(course.createdAt)}</span>
                        <RoleContainer roles={[Roles.TEACHER]}>
                          <span className="meta text-primary">
                            <Plural singular="Member" count={+course.numStudents} />
                          </span>
                        </RoleContainer>
                      </Row>
                      <IfElse condition={course?.meetingRoom?.currentMeeting}>
                        <Button icon="phone" mini onClick={() => startClassroom(course.id)}>
                          Join live classroom
                        </Button>
                        <RoleContainer roles={[Roles.TEACHER]}>
                          <Button icon="phone" mini onClick={() => startClassroom(course.id)}>
                            Start live classroom
                          </Button>
                        </RoleContainer>
                      </IfElse>
                    </Card.Body>
                  </Card>
                </div>
              )}
            </ItemArray>
          </div>
        </div>
      )}
    </SimpleWebComponent>
  );
};

export interface CourseListProps {}

export default CourseList;
