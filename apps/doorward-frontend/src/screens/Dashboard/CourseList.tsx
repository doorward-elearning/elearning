import React, { FunctionComponent } from 'react';
import './styles/CourseList.scss';
import { fetchCoursesAction } from '../../reducers/courses/actions';
import { State } from '../../store';
import useRoutes from '../../hooks/useRoutes';
import courseImage from '../../assets/images/course.svg';
import EImage from '@doorward/ui/components/Image';
import SimpleWebComponent from '@doorward/ui/components/WebComponent/SimpleWebComponent';
import Tools from '@doorward/common/utils/Tools';
import Plural from '@doorward/ui/components/Plural';
import HorizontalScroll from '@doorward/ui/components/HorizontalScroll';
import Row from '@doorward/ui/components/Row';
import ItemArray from '@doorward/ui/components/ItemArray';
import Card from '@doorward/ui/components/Card';
import Header from '@doorward/ui/components/Header';
import { Course } from '@doorward/common/models/Course';
import RoleContainer from '@doorward/ui/components/RolesManager/RoleContainer';
import { Roles } from '@doorward/ui/components/RolesManager';

const CourseList: FunctionComponent<CourseListProps> = (props): JSX.Element => {
  const routes = useRoutes();
  return (
    <SimpleWebComponent
      action={fetchCoursesAction}
      dataSelector={data => data.courses}
      selector={(state: State) => state.courses.courseList}
    >
      {data => (
        <div>
          <HorizontalScroll className="dashboard__course-list">
            <ItemArray data={data}>
              {(course: Course) => (
                <div className="dashboard__course-list__course">
                  <Card onClick={() => routes.navigate(routes.viewCourse, { courseId: course.id })}>
                    <Card.Header image>
                      <div className="card-image" style={{ background: Tools.color(course.id) }}>
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
                    </Card.Body>
                  </Card>
                </div>
              )}
            </ItemArray>
          </HorizontalScroll>
        </div>
      )}
    </SimpleWebComponent>
  );
};

export interface CourseListProps {}

export default CourseList;
