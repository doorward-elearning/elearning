import React, { FunctionComponent } from 'react';
import './styles/CourseList.scss';
import SimpleWebComponent from '../../components/ui/WebComponent/SimpleWebComponent';
import { fetchCoursesAction } from '../../reducers/courses/actions';
import { State } from '../../store';
import Card from '../../components/ui/Card';
import Header from '../../components/ui/Header';
import { Course } from '../../services/models';
import useRoutes from '../../hooks/useRoutes';
import IfElse from '../../components/ui/IfElse';
import Tools from '../../utils/Tools';

const CourseList: FunctionComponent<CourseListProps> = (props): JSX.Element => {
  const routes = useRoutes();
  return (
    <SimpleWebComponent
      action={fetchCoursesAction}
      dataSelector={data => data.courses}
      selector={(state: State) => state.courses.courseList}
    >
      {data => (
        <div className="dashboard__course-list">
          {data.map((course: Course) => (
            <div className="dashboard__course-list__course">
              <Card flat={false} onClick={() => routes.navigate(routes.viewCourse, { courseId: course.id })}>
                <Card.Header image>
                  <div className="card-image" />
                </Card.Header>
                <Card.Body>
                  <Header size={2}>{course.title}</Header>
                  <IfElse condition={course.modules.length}>
                    <div>
                      {Tools.truncate(course.modules, 3).map(module => (
                        <span>{module.title}</span>
                      ))}
                    </div>
                    <span>No modules have been added</span>
                  </IfElse>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      )}
    </SimpleWebComponent>
  );
};

export interface CourseListProps {}

export default CourseList;
