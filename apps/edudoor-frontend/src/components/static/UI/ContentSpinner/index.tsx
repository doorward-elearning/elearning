import React, { FunctionComponent } from 'react';
import Spinner, { SpinnerProps } from '../../../ui/Spinner';
import './ContentSpinner.scss';

const ContentSpinner: FunctionComponent<ContentSpinnerProps> = (props): JSX.Element => {
  return (
    <div className="ed-content__spinner">
      <Spinner {...props} />
    </div>
  );
};

export interface ContentSpinnerProps extends SpinnerProps {}

export default ContentSpinner;
