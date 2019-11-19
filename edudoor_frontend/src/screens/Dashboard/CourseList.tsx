import React, { FunctionComponent } from 'react';
import './styles/CourseList.scss';
import SimpleWebComponent from '../../components/ui/WebComponent/SimpleWebComponent';
import { fetchCoursesAction } from '../../reducers/courses/actions';
import { State } from '../../store';
import Card from '../../components/ui/Card';
import Header from '../../components/ui/Header';
import { Course } from '../../services/models';
import useRoutes from '../../hooks/useRoutes';
import Tools from '../../utils/Tools';
import ItemArray from '../../components/ui/ItemArray';
import Row from '../../components/ui/Row';
import Plural from '../../components/ui/Plural';
import courseImage from '../../assets/images/course.svg';
import EImage from '../../components/ui/Image';

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
          <div className="dashboard__course-list">
            <ItemArray data={data}>
              {(course: Course) => (
                <div className="dashboard__course-list__course">
                  <Card onClick={() => routes.navigate(routes.viewCourse, { courseId: course.id })}>
                    <Card.Header image>
                      <div className="card-image" style={{ background: Tools.color(course.id) }}>
                        <EImage src={courseImage}/>
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
                          <Plural singular="Member" count={12}/>
                        </span>
                      </Row>
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
