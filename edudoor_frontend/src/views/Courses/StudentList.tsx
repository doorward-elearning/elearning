import React from 'react';
import Layout from '../Layout';
import { PageComponent } from '../../types';

const StudentList: React.FunctionComponent<StudentListProps> = props => {
  return (
    <Layout {...props} header="Student List">
      <div>Hello</div>
    </Layout>
  );
};

export interface StudentListProps extends PageComponent {}

export default StudentList;
