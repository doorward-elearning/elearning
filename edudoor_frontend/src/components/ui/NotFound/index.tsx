import React, { FunctionComponent } from 'react';
import Card from '../Card';
import Header from '../Header';
import EImage from '../Image';
import notFound from '../../../assets/images/notFound.svg';
import Button from '../Buttons/Button';
import ROUTES from '../../../routes/routes';
import './NotFound.scss';

const NotFound: FunctionComponent<NotFoundProps> = (props): JSX.Element => {
  return (
    <Card>
      <Card.Body>
        <div className="notFound__content">
          <Header size={1}>{props.title}</Header>
          <EImage src={notFound} size="xLarge" />
          <p>{props.message}</p>
          <Button link={ROUTES.dashboard.link}>{props.buttonText}</Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export interface NotFoundProps {
  title: string;
  buttonText: string;
  message: string;
}

export default NotFound;
