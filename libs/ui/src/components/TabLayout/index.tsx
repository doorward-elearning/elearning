import React, { FunctionComponent, ReactElement, useEffect, useRef, useState } from 'react';
import './TabLayout.scss';
import classNames from 'classnames';
import { TabProps } from './Tab';
import IfElse from '../IfElse';
import Badge from '../Badge';
import Row from '../Row';
import compareLists from '@doorward/common/utils/compareLists';

const TabHeader: FunctionComponent<TabHeaderProps> = ({ tabs, selected, setSelected }): JSX.Element => {
  return (
    <React.Fragment>
      {tabs.map((tab, index) => (
        <div
          key={tab.title}
          className={classNames({
            'ed-tabLayout__tabTitle': true,
            selected: index == selected,
          })}
          onClick={() => setSelected(index)}
        >
          <Row>
            {tab.title}
            <IfElse condition={tab.badge}>
              <Badge>{tab.badge}</Badge>
            </IfElse>
          </Row>
        </div>
      ))}
    </React.Fragment>
  );
};

const TabContent: FunctionComponent<TabContentProps> = ({ children, selected }): JSX.Element => {
  return (
    <React.Fragment>
      {children.map((child, index) => (
        <div
          key={index}
          className={classNames({
            'ed-tabLayout__contentTab': true,
            selected: index === selected,
          })}
        >
          {child}
        </div>
      ))}
    </React.Fragment>
  );
};

const TabLayout: FunctionComponent<TabLayoutProps> = (props): JSX.Element => {
  const [tabs, setTabs] = useState<Array<TabProps>>([]);
  const slider = useRef(null);
  const tabLayout = useRef(null);
  const [selected, setSelected] = useState(props.selected || 0);
  const children = (props.children instanceof Array ? props.children : [props.children]) as Array<
    ReactElement<TabProps>
  >;

  useEffect(() => {
    const newTabs: Array<TabProps> = [];
    children.forEach((child, index) => {
      newTabs[index] = child.props;
    });
    setTabs(newTabs);
    if (props.openRecentTab) {
      const { newItems } = compareLists(tabs, newTabs, (existingTab, newTab) => {
        return (existingTab.id || existingTab.title) === (newTab.id || newTab.title);
      });

      if (newItems.length) {
        const itemIndex = newTabs.findIndex((tab) => (tab.id || tab.title) === (newItems[0].id || newItems[0].title));
        if (itemIndex >= 0) {
          setSelected(itemIndex);
        }
      }
    }
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
    if (props.onTabChange) {
      props.onTabChange(selected);
    }
  }, [selected, props.children]);

  return (
    <div
      className={classNames({
        'ed-tabLayout': true,
        stickyHeader: props.stickyHeader,
      })}
      ref={tabLayout}
    >
      <div className="ed-tabLayout__header">
        <TabHeader
          tabs={tabs}
          setSelected={(tab) => {
            if (tab !== selected) {
              setSelected(tab);
            }
          }}
          selected={selected}
        />
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
  stickyHeader?: boolean;
  onTabChange?: (selected: number) => void;
  openRecentTab?: boolean;
}

export interface TabHeaderProps {
  tabs: Array<TabProps>;
  setSelected: (tab: number) => void;
  selected: number;
}

export interface TabContentProps {
  children: Array<ReactElement>;
  selected: number;
}

export default TabLayout;
