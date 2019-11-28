import React, { FunctionComponent, ReactElement, useEffect, useState, useRef } from 'react';
import './TabLayout.scss';
import ItemArray from '../ItemArray';
import classNames from 'classnames';

const TabHeader: FunctionComponent<TabHeaderProps> = ({ tabs, selected, setSelected }): JSX.Element => {
  return (
    <ItemArray data={tabs}>
      {(tab, index) => (
        <div
          className={classNames({
            'ed-tabLayout__tabTitle': true,
            selected: index == selected,
          })}
          onClick={() => setSelected(index)}
        >
          {tab}
        </div>
      )}
    </ItemArray>
  );
};

const TabContent: FunctionComponent<TabContentProps> = ({ children, selected }): JSX.Element => {
  return (
    <ItemArray data={children}>
      {(child, index) => (
        <div
          key={index}
          className={classNames({
            'ed-tabLayout__contentTab': true,
            selected: index === selected,
          })}
        >
          {child}
        </div>
      )}
    </ItemArray>
  );
};

const TabLayout: FunctionComponent<TabLayoutProps> = (props): JSX.Element => {
  const [tabs, setTabs] = useState<Array<string>>([]);
  const slider = useRef(null);
  const tabLayout = useRef(null);
  const [selected, setSelected] = useState(props.selected || 0);
  const children = (props.children instanceof Array ? props.children : [props.children]) as Array<ReactElement>;

  useEffect(() => {
    const newTabs: Array<string> = [];
    children.map((child, index) => {
      newTabs[index] = child.props.title;
    });
    setTabs(newTabs);
  }, [props.children]);

  useEffect(() => {
    if (tabLayout.current && slider.current) {
      const tabLayoutElem: any = tabLayout.current;
      const sliderElem: any = slider.current;
      const selectedTab: any = tabLayoutElem.querySelector('.ed-tabLayout__tabTitle.selected');

      if (selectedTab) {
        const position = selectedTab.getBoundingClientRect();
        const parentPosition = tabLayoutElem.getBoundingClientRect();

        sliderElem.style.left = `${position.x - parentPosition.x}px`;
        sliderElem.style.width = `${position.width}px`;
      }
    }
  }, [selected, props.children]);

  return (
    <div className="ed-tabLayout" ref={tabLayout}>
      <div className="ed-tabLayout__header">
        <TabHeader tabs={tabs} setSelected={setSelected} selected={selected} />
        <span ref={slider} className="ed-tabLayout__slider" />
      </div>
      <div className="ed-tabLayout__content">
        <TabContent selected={selected}>{children}</TabContent>
      </div>
    </div>
  );
};

export interface TabLayoutProps {
  children: Array<ReactElement> | ReactElement;
  selected?: number;
}

export interface TabHeaderProps {
  tabs: Array<string>;
  setSelected: (tab: number) => void;
  selected: number;
}

export interface TabContentProps {
  children: Array<ReactElement>;
  selected: number;
}

export default TabLayout;
