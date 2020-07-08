import React from 'react';
import Dropdown from '@doorward/ui/components/Dropdown';
import './MoreInfo.scss';

const MoreInfo: React.FunctionComponent<MoreInfoProps> = (props): JSX.Element => {
  return (
    <div className="ed-more-info">
      <Dropdown openOnHover>
        <React.Fragment>{props.children}</React.Fragment>
        <div className="info-content">
          <span>{props.info}</span>
        </div>
      </Dropdown>
    </div>
  );
};

export interface MoreInfoProps {
  info: string;
}

export default MoreInfo;
