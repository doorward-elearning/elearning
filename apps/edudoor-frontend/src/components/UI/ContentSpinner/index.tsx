import React, { FunctionComponent } from 'react';
import './ContentSpinner.scss';
import Spinner, { SpinnerProps } from '@edudoor/ui/components/Spinner';

const ContentSpinner: FunctionComponent<ContentSpinnerProps> = (props): JSX.Element => {
  return (
    <div className="ed-content__spinner">
      <Spinner {...props} />
    </div>
  );
};

export interface ContentSpinnerProps extends SpinnerProps {}

export default ContentSpinner;
