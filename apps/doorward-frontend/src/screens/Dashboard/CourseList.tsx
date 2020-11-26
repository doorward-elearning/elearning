import React, { FunctionComponent, useEffect, useState } from 'react';
import './styles/CourseList.scss';
import useRoutes from '../../hooks/useRoutes';
import courseImage from '../../assets/images/course.svg';
import EImage from '@doorward/ui/components/Image';
import Tools from '@doorward/common/utils/Tools';
import Plural from '@doorward/ui/components/Plural';
import Row from '@doorward/ui/components/Row';
import ItemArray from '@doorward/ui/components/ItemArray';
import Card from '@doorward/ui/components/Card';
import Header from '@doorward/ui/components/Header';
import RoleContainer from '@doorward/ui/components/RolesManager/RoleContainer';
import ProgressModal from '../../components/Modals/ProgressModal';
import useModal from '@doorward/ui/hooks/useModal';
import Icon from '@doorward/ui/components/Icon';
import classNames from 'classnames';
import useDoorwardApi from '../../hooks/useDoorwardApi';
import DoorwardApi from '../../services/apis/doorward.api';
import CourseEntity from '@doorward/common/entities/course.entity';
import PaginationContainer from '@doorward/ui/components/PaginationContainer';
import useAction from '@doorward/ui/hooks/useActions';
import { useLocation } from 'react-router';
import translate from '@doorward/common/lang/translate';

const CourseList: FunctionComponent<CourseListProps> = (props): JSX.Element => {
  const liveClassroomModal = useModal(false);
  const [classroomCourse, startClassroom] = useState<CourseEntity>(null);
  const fetchCourses = useAction(DoorwardApi.courses.getCourses);
  const courses = useDoorwardApi((state) => state.courses.getCourses);

  const launchClassroom = useDoorwardApi((state) => state.courses.launchClassroom);
  const routes = useRoutes();
  const location = useLocation();

  useEffect(() => {
    fetchCourses({ limit: 8 });
  }, [location.search]);

  useEffect(() => {
    if (classroomCourse) {
      liveClassroomModal.openModal();
    }
  }, [classroomCourse]);
  return (
    <PaginationContainer onChangePage={() => {}} state={courses} data={courses.data.courses}>
      {(data) => (
        <div>
          <div className="dashboard__course-list">
            <ProgressModal
              state={launchClassroom}
              cancellable={false}
              showErrorToast
              action={() => DoorwardApi.courses.launchClassroom(classroomCourse?.id)}
              title={(classroomCourse?.meetingRoom?.currentMeeting ? translate.joiningMeeting() : translate.startingMeeting()) }
              useModal={liveClassroomModal}
              onSuccess={(data) => {
                routes.navigate(routes.videoCall, {
                  meetingId: data.meeting.id,
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
                          empty={<span>{translate.noModulesHaveBeenAdded()}</span>}
                        >
                          {(module) => <div>{module?.title}</div>}
                        </ItemArray>
                      </div>
                      <Row style={{ justifyContent: 'space-between' }}>
                        <span className="meta">{Tools.normalDate(course.createdAt)}</span>
                        <RoleContainer privileges={['courses.create']}>
                          <span className="meta text-primary">
                            {translate.studentWithCount({ count: +course.numStudents })}
                          </span>
                        </RoleContainer>
                      </Row>
                      <div className="actions">
                        <RoleContainer
                          privileges={['courses.start-meeting']}
                          condition={!!course?.meetingRoom?.currentMeeting}
                        >
                          <Icon
                            className={classNames({
                              joinMeeting: course?.meetingRoom?.currentMeeting,
                              action: true,
                            })}
                            icon="phone"
                            title={translate.meeting()}
                            onClick={() => startClassroom(course)}
                          />
                        </RoleContainer>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              )}
            </ItemArray>
          </div>
        </div>
      )}
    </PaginationContainer>
  );
};

export interface CourseListProps {}

export default CourseList;
