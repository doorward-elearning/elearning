import React, { CSSProperties, useEffect, useRef, useState } from 'react';
import './HorizontalScroll.scss';
import classNames from 'classnames';
import Icon from '../Icon';
import IfElse from '../IfElse';
import Button from '@doorward/ui/components/Buttons/Button';

const HorizontalScroll: React.FunctionComponent<HorizontalScrollProps> = (props) => {
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
      setTimeout(checkScroll, 200);
    }
  };

  useEffect(checkScroll, [scroll]);

  return (
    <div className="ed-horizontal-scroll__parent">
      {scrollValue > 0 && (
        <div className="indicator indicator__left">
          <Button
            type="button"
            mini
            fab
            theme="primary"
            icon="chevron_left"
            className="icon"
            onClick={() => scrollBy(-1)}
          />
        </div>
      )}
      <div
        ref={scroll}
        className={classNames({
          'ed-horizontal-scroll': true,
          [props.className || '']: true,
        })}
        style={props.style}
      >
        {props.children}
      </div>
      {scrollValue < maxScroll && (
        <div className="indicator indicator__right">
          <Button
            type="button"
            mini
            fab
            theme="primary"
            icon="chevron_left"
            className="icon"
            onClick={() => scrollBy(1)}
          />
        </div>
      )}
    </div>
  );
};

export interface HorizontalScrollProps {
  className?: string;
  scrollBy?: number;
  style?: CSSProperties;
}

export default HorizontalScroll;
