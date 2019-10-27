import React, { useEffect, useState } from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import { PageComponent } from '../../types';
import ROUTES from '../../routes/routes';
import useRoutes from '../../hooks/useRoutes';
import { useSelector } from 'react-redux';
import { State } from '../../store/store';
import { match } from 'react-router';
import useAction from '../../hooks/useActions';
import { fetchCoursesAction } from '../../reducers/courses/actions';
import { CourseResponse } from '../../services/responseBodies';
import Button from '../../components/ui/Buttons/Button';
import Accordion from '../../components/ui/Accordion';
import CourseTable from '../../components/static/Tables/CourseTable';
import List from '../../components/ui/List';
import ListItem from '../../components/ui/List/ListItem';
import Header from '../../components/ui/Header';
import Panel from '../../components/ui/Panel';

const ViewCourse: React.FunctionComponent<ViewCourseProps> = props => {
  const { setTitle } = useRoutes();
  const fetchCourses = useAction(fetchCoursesAction);
  useEffect(() => {
    fetchCourses();
  }, []);

  const courseId = props.match.params.courseId;

  const courses = useSelector((state: State) => state.courses.courseList);
  const [course, setCourse] = useState<CourseResponse | undefined>(undefined);

  useEffect(() => {
    setCourse((courses.data || []).find(course => course.key === +courseId));
  }, [courses]);
  const title = course ? course.title : '';

  setTitle(ROUTES.viewCourse.id, title);
  return (
    <Layout
      {...props}
      features={[LayoutFeatures.HEADER, LayoutFeatures.BREAD_CRUMBS, LayoutFeatures.ACTION_BUTTON]}
      header={title}
      noNavBar
      actionBtnProps={{ text: 'Add Student' }}
      renderHeaderEnd={(): JSX.Element => <Button>Add Module</Button>}
    >
      {courses.data && (
        <React.Fragment>
          <Accordion open>
            <Header size={3}>The list of modules</Header>
            <List>
              <ListItem>
                <Header size={3}>Kicking off with your new Team</Header>
              </ListItem>
              <ListItem>
                <List>
                  <ListItem>Remote calls Overview: Coach</ListItem>
                  <ListItem>Physical Environment on calls: Coach</ListItem>
                  <ListItem>Eyes on Remote Calls: Coach</ListItem>
                  <ListItem>Calm down with Breath: Coach</ListItem>
                  <ListItem>Speaking to be Understood</ListItem>
                  <ListItem>
                    <Header size={4}>Coach Calm Down with Breath (1).mp4</Header>
                  </ListItem>
                  <ListItem>
                    <List>
                      <ListItem>
                        <a href="#">Output 1.1 Your Team Kickoff Call -- Again!</a>
                      </ListItem>
                    </List>
                  </ListItem>
                </List>
              </ListItem>
            </List>
          </Accordion>
          <Accordion open>
            <Header size={3}>The second list of modules</Header>
            <List>
              <ListItem>
                <Header size={3}>Kicking off with your new Team</Header>
              </ListItem>
              <ListItem>
                <List>
                  <ListItem>Remote calls Overview: Coach</ListItem>
                  <ListItem>Physical Environment on calls: Coach</ListItem>
                  <ListItem>Eyes on Remote Calls: Coach</ListItem>
                  <ListItem>Calm down with Breath: Coach</ListItem>
                  <ListItem>Speaking to be Understood</ListItem>
                  <ListItem>
                    <Header size={4}>Coach Calm Down with Breath (1).mp4</Header>
                  </ListItem>
                  <ListItem>
                    <List>
                      <ListItem>
                        <a href="#">Output 1.1 Your Team Kickoff Call -- Again!</a>
                      </ListItem>
                    </List>
                  </ListItem>
                </List>
              </ListItem>
            </List>
          </Accordion>
        </React.Fragment>
      )}
    </Layout>
  );
};

export interface ViewCourseProps extends PageComponent {
  match: match<{ courseId: string }>;
}

export default ViewCourse;
