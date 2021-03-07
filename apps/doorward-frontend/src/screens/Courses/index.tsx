import React, { useEffect } from 'react';
import Layout, { LayoutFeatures } from '../Layout';
import AddCourse from './AddCourse';
import CourseTable from '../../components/Tables/CourseTable';
import useModal from '@doorward/ui/hooks/useModal';
import { PageComponent } from '@doorward/ui/types';
import DoorwardApi from '../../services/apis/doorward.api';
import translate from '@doorward/common/lang/translate';
import { useApiAction } from 'use-api-action';
import useNavigation from '@doorward/ui/hooks/useNavigation';
import ROUTES from '@doorward/common/frontend/routes/main';

const Courses: React.FunctionComponent<CoursesProps> = (props) => {
  const addCourseModal = useModal(props.location.pathname === '/courses/create');
  const [fetchCourses, courses] = useApiAction(DoorwardApi, (api) => api.courses.getCourses, {
    onNewData: (prevState, nextState) => {
      if (nextState?.pagination?.page === 1) {
        return nextState;
      }
      return { ...nextState, courses: [...prevState.courses, ...nextState.courses] };
    },
    id: 'all-courses-table',
  });
  const navigation = useNavigation();

  useEffect(() => {
    fetchCourses({ page: 1 });
  }, [props.location.search]);

  const TITLE = translate('createANewCourse').toUpperCase();
  return (
    <Layout
      {...props}
      features={[LayoutFeatures.HEADER, LayoutFeatures.ACTION_BUTTON, LayoutFeatures.BREAD_CRUMBS]}
      header={translate('courses')}
      actionBtnProps={{
        text: TITLE,
        onClick: (): void => navigation.navigate(ROUTES.courses.create),
        privileges: ['courses.create'],
      }}
    >
      <AddCourse history={props.history} useModal={addCourseModal} title={TITLE} />
      <CourseTable
        loadMore={async (page) => {
          fetchCourses({ page });
        }}
        pagination={courses.data?.pagination}
        courses={courses.data?.courses}
      />
    </Layout>
  );
};

export interface CoursesProps extends PageComponent {}

export default Courses;
