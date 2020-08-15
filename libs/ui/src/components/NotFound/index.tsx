import EImage from '../Image';
import React from 'react';
import Button from '../Buttons/Button';
import { FunctionComponent } from 'react';
import Card from '../Card';
import Header from '../Header';
import './NotFound.scss';
import notFound from '../../../assets/images/pageNotFound.svg';

const NotFound: FunctionComponent<NotFoundProps> = (props): JSX.Element => {
  return (
    <Card>
      <Card.Body>
        <div className="notFound__content">
          <Header size={1}>{props.title}</Header>
          <EImage src={notFound} size="xLarge" />
          <p>{props.message}</p>
          <Button link={props.buttonLink}>{props.buttonText}</Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export interface NotFoundProps {
  title: string;
  buttonText: string;
  message: string;
  buttonLink?: string;
}

export default NotFound;
