import React, { useEffect, useRef, useState } from 'react';
import './HorizontalScroll.scss';
import classNames from 'classnames';
import Icon from '../Icon';
import IfElse from '../IfElse';

const HorizontalScroll: React.FunctionComponent<HorizontalScrollProps> = props => {
  const scroll = useRef(null);
  const [scrollValue, setScrollValue] = useState(0);
  const [maxScroll, setMaxScroll] = useState(500);

  const checkScroll = () => {
    if (scroll.current) {
      const current: any = scroll.current;
      const checkMax = current.scrollWidth - current.clientWidth;
      if (checkMax) {
        setMaxScroll(checkMax);
      }
      setScrollValue(current.scrollLeft);
    }
  };

  const scrollBy = (delta: number) => {
    if (scroll.current) {
      const current: any = scroll.current;
      current.scrollBy({
        top: 0,
        left: delta * (props.scrollBy || 500),
        behavior: 'smooth',
      });
      setTimeout(checkScroll, 500);
    }
  };

  useEffect(checkScroll, [scroll]);

  return (
    <div className="ed-horizontal-scroll__parent">
      <IfElse condition={scrollValue > 0}>
        <div className="indicator indicator__left">
          <Icon icon="chevron_left" className="icon" onClick={() => scrollBy(-1)} />
        </div>
      </IfElse>
      <div
        ref={scroll}
        className={classNames({
          'ed-horizontal-scroll': true,
          [props.className || '']: true,
        })}
      >
        {props.children}
      </div>
      <IfElse condition={scrollValue < maxScroll}>
        <div className="indicator indicator__right">
          <Icon icon="chevron_left" className="icon" onClick={() => scrollBy(1)} />
        </div>
      </IfElse>
    </div>
  );
};

export interface HorizontalScrollProps {
  className?: string;
  scrollBy?: number;
}

export default HorizontalScroll;
