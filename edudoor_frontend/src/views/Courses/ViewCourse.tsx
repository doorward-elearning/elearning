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
import Button from '../../components/ui/Buttons/Button';
import Accordion from '../../components/ui/Accordion';
import List from '../../components/ui/List';
import ListItem from '../../components/ui/List/ListItem';
import Header from '../../components/ui/Header';
import Card from '../../components/ui/Card';
import Row from '../../components/ui/Row';
import useAccordion from '../../hooks/useAccordion';
import useModal from '../../hooks/useModal';
import { ModalFeatures } from '../../components/ui/Modal';
import AddModuleForm from '../../components/static/Forms/AddModuleForm';
import AddStudentForm from '../../components/static/Forms/AddStudentForm';
import { Course } from '../../services/models';

const ViewCourse: React.FunctionComponent<ViewCourseProps> = props => {
  const { setTitle } = useRoutes();
  const fetchCourses = useAction(fetchCoursesAction);
  const addModuleModal = useModal(false);
  const addStudentModal = useModal(false);
  useEffect(() => {
    fetchCourses();
  }, []);

  const courseId = props.match.params.courseId;

  const courses = useSelector((state: State) => state.courses.courseList);
  const [course, setCourse] = useState<Course | undefined>(undefined);

  useEffect(() => {
    setCourse((courses.data || []).find(course => course.id === +courseId));
  }, [courses]);
  const title = course ? course.title : '';

  setTitle(ROUTES.viewCourse.id, title);

  const modules = 4;
  const accordions = Array(modules)
    .fill(0)
    .map(() => useAccordion(true));
  return (
    <Layout
      {...props}
      features={[LayoutFeatures.HEADER, LayoutFeatures.BREAD_CRUMBS, LayoutFeatures.ACTION_BUTTON]}
      header={title}
      actionBtnProps={{ text: 'Add Student', onClick: addStudentModal.openModal }}
      renderHeaderEnd={(): JSX.Element => (
        <Button theme="primary" bordered onClick={addModuleModal.openModal}>
          Add Module
        </Button>
      )}
    >
      <AddModuleForm
        useModal={addModuleModal}
        features={[ModalFeatures.POSITIVE_BUTTON, ModalFeatures.CLOSE_BUTTON_FOOTER]}
      />
      <AddStudentForm
        useModal={addStudentModal}
        features={[ModalFeatures.POSITIVE_BUTTON, ModalFeatures.CLOSE_BUTTON_FOOTER]}
      />
      {courses.data && (
        <Card flat>
          <Card.Body>
            {accordions.map((accordion, index) => (
              <Accordion useAccordion={accordion} key={index}>
                <Row style={{ justifyContent: 'space-between', paddingRight: '20px' }}>
                  <Header size={3} onClick={accordion.toggle}>
                    The list of modules
                  </Header>
                  <Button theme="accent" icon="add" mini bordered>
                    Add Item
                  </Button>
                </Row>
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
            ))}
          </Card.Body>
        </Card>
      )}
    </Layout>
  );
};

export interface ViewCourseProps extends PageComponent {
  match: match<{ courseId: string }>;
}

export default ViewCourse;
