import React, { FunctionComponent, useEffect, useState } from 'react';
import './styles/CourseList.scss';
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
import RoleContainer from '@doorward/ui/components/RolesManager/RoleContainer';
import { Roles } from '@doorward/common/types/roles';
import ProgressModal from '../../components/Modals/ProgressModal';
import useModal from '@doorward/ui/hooks/useModal';
import Icon from '@doorward/ui/components/Icon';
import classNames from 'classnames';
import useDoorwardApi from '../../hooks/useDoorwardApi';
import DoorwardApi from '../../services/apis/doorward.api';
import CourseEntity from '@doorward/common/entities/course.entity';

const CourseList: FunctionComponent<CourseListProps> = (props): JSX.Element => {
  const liveClassroomModal = useModal(false);
  const [classroomCourse, startClassroom] = useState<CourseEntity>(null);

  const launchClassroom = useDoorwardApi((state) => state.meetings.joinMeeting);
  const routes = useRoutes();

  useEffect(() => {
    if (classroomCourse) {
      liveClassroomModal.openModal();
    }
  }, [classroomCourse]);
  return (
    <SimpleWebComponent
      action={DoorwardApi.courses.getCourses}
      dataSelector={(data) => (data.courses || []).sort((a, b) => (a?.meetingRoom?.currentMeeting ? -1 : 1))}
      selector={(state) => state.courses.getCourses}
    >
      {(data) => (
        <div>
          <div className="dashboard__course-list">
            <ProgressModal
              state={launchClassroom}
              cancellable={false}
              showErrorToast
              action={() => DoorwardApi.meetings.joinMeeting(classroomCourse?.id)}
              title={(classroomCourse?.meetingRoom?.currentMeeting ? 'Joining ' : 'Starting ') + ' classroom.'}
              useModal={liveClassroomModal}
              onSuccess={(data) => {
                routes.navigate(routes.videoCall, {
                  meetingId: data.id,
                });
              }}
            />
            <ItemArray data={data}>
              {(course: CourseEntity) => (
                <div className="dashboard__course-list__course">
                  <Card>
                    <Card.Header image>
                      <div
                        className="card-image"
                        style={{ background: Tools.color(course.id) }}
                        onClick={() => routes.navigate(routes.viewCourse, { courseId: course.id })}
                      >
                        <EImage src={courseImage} />
                      </div>
                    </Card.Header>
                    <Card.Body>
                      <Header size={2}>{course.title}</Header>
                      <div>
                        <ItemArray
                          data={Tools.truncate(course.modules, 3)}
                          empty={<span>No modules have been added</span>}
                        >
                          {(module) => <div>{module?.title}</div>}
                        </ItemArray>
                      </div>
                      <Row style={{ justifyContent: 'space-between' }}>
                        <span className="meta">{Tools.normalDate(course.createdAt)}</span>
                        <RoleContainer privileges={['courses.create']}>
                          <span className="meta text-primary">
                            <Plural singular="Member" count={+course.numStudents} />
                          </span>
                        </RoleContainer>
                      </Row>
                      <div className="actions">
                        <Icon
                          className={classNames({
                            joinMeeting: course?.meetingRoom?.currentMeeting,
                            action: true,
                          })}
                          icon="phone"
                          title="Live classroom"
                          onClick={() => startClassroom(course)}
                        />
                      </div>
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
