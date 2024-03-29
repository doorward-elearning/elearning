import React, { FunctionComponent } from 'react';

const Tab: FunctionComponent<TabProps> = (props): JSX.Element => {
  return (
    <div className="ed-Tab" key={props.title}>
      {props.children}
    </div>
  );
};

export interface TabProps {
  title: string;
  badge?: string;
  id?: string;
  action?: JSX.Element;
}

export default Tab;
