import React, { Component, ReactNode } from 'react';
import './InformationCard.scss';
import { Icons } from '@doorward/ui/types/icons';
import Icon from '@doorward/ui/components/Icon';
import Card from '@doorward/ui/components/Card';

const Header: React.FunctionComponent<HeaderProps> = (props): JSX.Element => {
  return <div className="information-card-header mb-8">{props.children}</div>;
};

const Body: React.FunctionComponent<BodyProps> = (props): JSX.Element => {
  return <div className="information-card-body">{props.children}</div>;
};

const InformationItemBody: React.FunctionComponent<InformationItemBodyProps> = (props): JSX.Element => {
  return !props.hidden ? (
    <div className="information-card-item-body">
      {props.icon && <Icon icon={props.icon} />}
      <span className="information-card-item-content">
        {typeof props.children === 'string' ? <a href={props.link}>{props.children}</a> : props.children}
      </span>
    </div>
  ) : null;
};

const InformationItem: React.FunctionComponent<InformationItemProps> = (props): JSX.Element => {
  return !props.hidden ? (
    <div className="information-card-item">
      <div className="information-card-item-title">{props.title}</div>
      <InformationItemBody link={props.link} icon={props.icon}>
        {props.children}
      </InformationItemBody>
    </div>
  ) : null;
};

class InformationCard extends Component<InformationCardProps> {
  static Header = Header;
  static Body = Body;
  static Item = InformationItem;
  static ItemBody = InformationItemBody;

  render(): JSX.Element {
    return (
      <Card>
        <Card.Body>
          <div className="ed-information-card">{this.props.children}</div>
        </Card.Body>
      </Card>
    );
  }
}

export interface BodyProps {}

export interface InformationItemProps extends InformationItemBodyProps {
  title: string;
}

export interface InformationItemBodyProps {
  children: string | JSX.Element | Array<JSX.Element>;
  link?: string;
  icon?: Icons;
  hidden?: boolean;
}

export interface HeaderProps {
  children: ReactNode | [ReactNode, ReactNode];
}

export interface InformationCardProps {
  children: JSX.Element | [JSX.Element, JSX.Element];
}

export default InformationCard;
