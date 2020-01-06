import React, { FunctionComponent } from 'react';
import './styles/CourseList.scss';
import SimpleWebComponent from '@edudoor/ui/src/components/WebComponent/SimpleWebComponent';
import { fetchCoursesAction } from '../../reducers/courses/actions';
import { State } from '../../store';
import Card from '@edudoor/ui/src/components/Card';
import Header from '@edudoor/ui/src/components/Header';
import { Course } from '../../../../../libs/shared/models';
import useRoutes from '../../hooks/useRoutes';
import Tools from '@edudoor/ui/src/utils/Tools';
import ItemArray from '@edudoor/ui/src/components/ItemArray';
import Row from '@edudoor/ui/src/components/Row';
import Plural from '@edudoor/ui/src/components/Plural';
import courseImage from '../../assets/images/course.svg';
import EImage from '@edudoor/ui/src/components/Image';
import HorizontalScroll from '@edudoor/ui/src/components/HorizontalScroll';

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
                        <span className="meta text-primary">
                          <Plural singular="Member" count={+course.numStudents} />
                        </span>
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
