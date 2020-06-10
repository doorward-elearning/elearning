import React from 'react';
import './StudentProfileView.scss';
import { Student } from '@edudoor/common/models/Student';
import SimpleUserView from '@edudoor/ui/components/UserChooser/SimpleUserView';

const StudentProfileView: React.FunctionComponent<StudentProfileViewProps> = (props): JSX.Element => {
  return (
    <div className="ed-student__profile_view">
      <SimpleUserView user={props.student} />
    </div>
  );
};

export interface StudentProfileViewProps {
  student: Student;
}

export default StudentProfileView;
