import React from 'react';
import DraftHTMLContent from '@edudoor/ui/components/DraftHTMLContent';
import { Assignment } from '@edudoor/common/models/Assignment';

const AssignmentView: React.FunctionComponent<AssignmentViewProps> = props => {
  return (
    <div className="assignment-view">
      <DraftHTMLContent content={props.assignment.content.assignment} />
    </div>
  );
};

export interface AssignmentViewProps {
  assignment: Assignment;
}

export default AssignmentView;
