import React from 'react';
import { Assignment } from '../../../../../../libs/shared/models';
import DraftHTMLContent from '@edudoor/ui/src/components/DraftHTMLContent';

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
