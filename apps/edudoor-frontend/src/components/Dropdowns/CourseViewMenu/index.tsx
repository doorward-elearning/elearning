import React from 'react';
import * as Yup from 'yup';
import { deleteCourseAction } from '../../../reducers/courses/actions';
import { useSelector } from 'react-redux';
import { State } from '../../../store';
import useRoutes from '../../../hooks/useRoutes';
import WebConfirmModal from '@edudoor/ui/components/ConfirmModal/WebConfirmModal';
import useModal, { UseModal } from '@edudoor/ui/hooks/useModal';
import Dropdown from '@edudoor/ui/components/Dropdown';
import TextField from '@edudoor/ui/components/Input/TextField';
import Icon from '@edudoor/ui/components/Icon';
import useForm from '@edudoor/ui/hooks/useForm';
import { Course } from '@edudoor/common/models';
import Form from '@edudoor/ui/components/Form';

const CourseViewMenuModals: React.FunctionComponent<CourseViewMenuModalsProps> = ({ course, deleteCourseModal }) => {
  const deleteForm = useForm();
  const routes = useRoutes();
  const deleteState = useSelector((state: State) => state.courses.deleteCourse);
  const onDeleteSuccess = () => {
    routes.navigate(routes.courseList);
  };
  return (
    <React.Fragment>
      <Form
        initialValues={{ courseName: '' }}
        form={deleteForm}
        onSubmit={() => {}}
        validationSchema={Yup.object({
          courseName: Yup.string()
            .nullable()
            .required('Please enter the name of the course')
            .oneOf([course.title], 'Please enter the exact name of the course'),
        })}
      >
        {formikProps => (
          <WebConfirmModal
            state={deleteState}
            useModal={deleteCourseModal}
            title="Delete Course"
            showErrorToast
            showSuccessToast
            buttonDisabled={!formikProps.isValid}
            action={() => deleteCourseAction(course.id)}
            onSuccess={onDeleteSuccess}
          >
            <div>
              <p>Deleting a course will have the following effects.</p>
              <ul>
                <li>Students will be un-enrolled from the course</li>
                <li>Course resources will be deleted</li>
                <li>Course report will no longer be accessible.</li>
              </ul>
              <TextField placeholder="Enter the course name to confirm" name="courseName" />
            </div>
          </WebConfirmModal>
        )}
      </Form>
    </React.Fragment>
  );
};

const CourseViewMenu: React.FunctionComponent<CourseViewMenuProps> = props => {
  const deleteCourseModal = useModal(false);

  return (
    <React.Fragment>
      <Dropdown positionX="right">
        <Icon icon="more_vert" />
        <Dropdown.Menu>
          {/*<Dropdown.Item icon="account_circle">Participants</Dropdown.Item>*/}
          {/*<Dropdown.Item icon="event">Calendar</Dropdown.Item>*/}
          {/*<Dropdown.Item icon="settings">Settings</Dropdown.Item>*/}
          <Dropdown.Item icon="delete" onClick={deleteCourseModal.openModal}>
            Delete Course
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <CourseViewMenuModals course={props.course} deleteCourseModal={deleteCourseModal} />
    </React.Fragment>
  );
};

export interface CourseViewMenuProps {
  course: Course;
}

export interface CourseViewMenuModalsProps {
  course: Course;
  deleteCourseModal: UseModal;
}

export default CourseViewMenu;