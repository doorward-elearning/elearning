import React, { FunctionComponent, ReactElement } from 'react';
import './LabelRow.scss';
import IfElse from '../IfElse';

const LabelRow: FunctionComponent<LabelRowProps> = (props): JSX.Element => {
  return (
    <div className="ed-label-row">
      {props.children.map((child, index) => (
        <React.Fragment>
          {child}
          <IfElse condition={index < props.children.length - 1}>
            <span className="label-row__separator" />
          </IfElse>
        </React.Fragment>
      ))}
    </div>
  );
};

export interface LabelRowProps {
  children: Array<ReactElement>;
}

export default LabelRow;
