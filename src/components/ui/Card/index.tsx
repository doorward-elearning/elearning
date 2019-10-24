import React from 'react';
import './Card.scss';
import classNames from 'classnames';

const Card: CardComponent = props => {
  const className = classNames({
    'ed-card': true,
    flat: props.flat,
    clickable: props.clickable,
  });
  return <div className={className}>{props.children}</div>;
};

export const Header: React.FunctionComponent<CardHeaderProps> = props => {
  return <div className="ed-card__header">{props.children}</div>;
};

export const Body: React.FunctionComponent<CardBodyProps> = props => {
  return <div className="ed-card__body">{props.children}</div>;
};

export const Footer: React.FunctionComponent<CardFooterProps> = props => {
  return <div className="ed-card__footer">{props.children}</div>;
};

export interface CardProps {
  flat?: boolean;
  clickable?: boolean;
}
export interface CardHeaderProps {}
export interface CardBodyProps {}
export interface CardFooterProps {}

export interface CardComponent extends React.FunctionComponent<CardProps> {
  Header: React.FunctionComponent<CardHeaderProps>;
  Body: React.FunctionComponent<CardBodyProps>;
  Footer: React.FunctionComponent<CardFooterProps>;
}

Card.Header = Header;
Card.Body = Body;
Card.Footer = Footer;

export default Card;
