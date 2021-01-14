import React, { useEffect } from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import AddCourse from './AddCourse';
import CourseTable from '../../components/Tables/CourseTable';
import { ROUTES } from '../../routes/routes';
import useModal from '@doorward/ui/hooks/useModal';
import { PageComponent } from '@doorward/ui/types';
import DoorwardApi from '../../services/apis/doorward.api';
import PaginationContainer from '@doorward/ui/components/PaginationContainer';
import translate from '@doorward/common/lang/translate';
import useApiAction from '@doorward/ui/hooks/useApiAction';

const Courses: React.FunctionComponent<CoursesProps> = (props) => {
  const addCourseModal = useModal(props.location.pathname === ROUTES.createCourse.link);
  const fetchCourses = useApiAction(DoorwardApi, (api) => api.courses.getCourses);

  useEffect(() => {
    fetchCourses.action({});
  }, [props.location.search]);

  const TITLE = translate('createANewCourse').toUpperCase();
  return (
    <Layout
      {...props}
      features={[LayoutFeatures.HEADER, LayoutFeatures.ACTION_BUTTON, LayoutFeatures.BREAD_CRUMBS]}
      header={translate('courses')}
      actionBtnProps={{
        text: TITLE,
        onClick: (): void => props.history.push(ROUTES.createCourse.link),
        privileges: ['courses.create'],
      }}
    >
      <AddCourse history={props.history} useModal={addCourseModal} title={TITLE} />
      <PaginationContainer
        state={fetchCourses.state}
        onChangePage={(page) => {}}
        data={fetchCourses.state.data.courses}
      >
        {(courses): JSX.Element => {
          return <CourseTable courses={courses} history={props.history} />;
        }}
      </PaginationContainer>
    </Layout>
  );
};

export interface CoursesProps extends PageComponent {}

export default Courses;
