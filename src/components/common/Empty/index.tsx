import React from 'react';
import './Empty.scss';
import Header from '../Header';
import Icon from '../Icon';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

const defaultMessage = 'Ops! There are no items here.';

const Empty: React.FunctionComponent<EmptyProps> = ({ message = defaultMessage, icon = 'beach_access' }) => {
  return (
    <div
      className={classNames({
        'ed-content-empty': true,
      })}
    >
      <Icon icon={icon} className="ed-content-empty__icon" />
      <Header size={3} className="ed-content-empty__message">
        {message}
      </Header>
      <Link to="#" className="help">Need Help?</Link>
    </div>
  );
};

export interface EmptyProps {
  message?: string;
  icon?: string;
}

export default Empty;
