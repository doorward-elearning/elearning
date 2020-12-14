import React, { MouseEventHandler } from 'react';
import Accordion from '@doorward/ui/components/Accordion';
import List from '@doorward/ui/components/List';
import ListItem from '@doorward/ui/components/List/ListItem';
import classNames from 'classnames';
import './ContentList.scss';

interface ContentListType extends React.FunctionComponent<ContentListProps> {
  Menu: React.FunctionComponent<MenuProps>;
  MenuItem: React.FunctionComponent<MenuItemProps>;
}

const Menu: React.FunctionComponent<MenuProps> = (props): JSX.Element => {
  return (
    <div className="ed-contentList-menu">
      <Accordion
        open
        title={
          typeof props.title === 'string'
            ? () => <div className="ed-contentList-menu__header">{props.title}</div>
            : props.title
        }
      >
        <List>{props.children}</List>
      </Accordion>
    </div>
  );
};

const MenuItem: React.FunctionComponent<MenuItemProps> = (props): JSX.Element => {
  return (
    <ListItem
      onClick={props.onClick}
      selected={props.selected}
      className={classNames({
        'ed-contentList-menuItem': true,
      })}
    >
      {props.children}
    </ListItem>
  );
};

const ContentList: ContentListType = (props): JSX.Element => {
  return <div className="ed-contentList-menu">{props.children}</div>;
};

export interface ContentListProps {}

export interface MenuProps {
  title: string | (() => JSX.Element);
}

export interface MenuItemProps {
  onClick?: MouseEventHandler;
  selected?: boolean;
}

ContentList.Menu = Menu;
ContentList.MenuItem = MenuItem;

export default ContentList;
