import React, { useEffect } from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import { PageComponent } from '../../types';
import ROUTES from '../../routes/routes';
import useRoutes from '../../hooks/useRoutes';
import { useSelector } from 'react-redux';
import { match } from 'react-router';
import useAction from '../../hooks/useActions';
import { fetchCourseAction } from '../../reducers/courses/actions';
import Button from '../../components/ui/Buttons/Button';
import Accordion from '../../components/ui/Accordion';
import List from '../../components/ui/List';
import ListItem from '../../components/ui/List/ListItem';
import Header from '../../components/ui/Header';
import Card from '../../components/ui/Card';
import useModal from '../../hooks/useModal';
import { ModalFeatures } from '../../components/ui/Modal';
import AddModuleForm from '../../components/static/Forms/AddModuleForm';
import AddStudentForm from '../../components/static/Forms/AddStudentForm';
import WebComponent from '../../components/ui/WebComponent';
import Panel from '../../components/ui/Panel';
import HtmlContent from '../../components/ui/HtmlContent';
import './Courses.scss';
import { State } from '../../store';

const ViewCourse: React.FunctionComponent<ViewCourseProps> = props => {
  const { setTitle } = useRoutes();
  const fetchCourse = useAction(fetchCourseAction);
  const addModuleModal = useModal(false);
  const addStudentModal = useModal(false);
  const courseId = +props.match.params.courseId;

  useEffect(() => {
    fetchCourse(courseId);
  }, []);

  const course = useSelector((state: State) => state.courses.viewCourse);

  return (
    <Layout
      {...props}
      className="view-course"
      features={[LayoutFeatures.HEADER, LayoutFeatures.BREAD_CRUMBS, LayoutFeatures.ACTION_BUTTON]}
      header={course.data.course && course.data.course.title}
      actionBtnProps={{ text: 'Add Student', onClick: addStudentModal.openModal }}
      renderHeaderEnd={(): JSX.Element => (
        <Button theme="primary" bordered onClick={addModuleModal.openModal}>
          Add Module
        </Button>
      )}
    >
      <WebComponent data={course.data.course} loading={course.fetching}>
        {(course): JSX.Element => {
          setTitle(ROUTES.viewCourse.id, course.title);
          return (
            <React.Fragment>
              <AddModuleForm
                courseId={course.id}
                useModal={addModuleModal}
                features={[ModalFeatures.POSITIVE_BUTTON, ModalFeatures.CLOSE_BUTTON_FOOTER]}
              />
              <AddStudentForm
                useModal={addStudentModal}
                features={[ModalFeatures.POSITIVE_BUTTON, ModalFeatures.CLOSE_BUTTON_FOOTER]}
              />
              <Panel className="course-description" plain>
                <HtmlContent html={course.description} />
              </Panel>
              <Card flat>
                <Card.Body>
                  {course.modules.map((module, index) => {
                    return (
                      <Accordion
                        title={() => <Header size={3}>{module.title}</Header>}
                        action={() => (
                          <Button theme="accent" icon="add" mini bordered>
                            Add Item
                          </Button>
                        )}
                        key={index}
                      >
                        <List>
                          <ListItem>
                            <Header size={3}>Kicking off with your new Team</Header>
                          </ListItem>
                          <List>
                            <ListItem>Remote calls Overview: Coach</ListItem>
                            <ListItem>Physical Environment on calls: Coach</ListItem>
                            <ListItem>Eyes on Remote Calls: Coach</ListItem>
                            <ListItem>Calm down with Breath: Coach</ListItem>
                            <ListItem>Speaking to be Understood</ListItem>
                            <ListItem>
                              <Header size={4}>Coach Calm Down with Breath (1).mp4</Header>
                            </ListItem>
                            <List>
                              <ListItem>
                                <a href="#">Output 1.1 Your Team Kickoff Call -- Again!</a>
                              </ListItem>
                            </List>
                          </List>
                        </List>
                      </Accordion>
                    );
                  })}
                </Card.Body>
              </Card>
            </React.Fragment>
          );
        }}
      </WebComponent>
    </Layout>
  );
};

export interface ViewCourseProps extends PageComponent {
  match: match<{ courseId: string }>;
}

export default ViewCourse;
