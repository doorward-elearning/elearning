import React, { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import './VerticalScroll.scss';
import Button from '@edudoor/ui/components/Buttons/Button';
import classNames from 'classnames';

const POINTER_OFFSET = 20;

const VerticalScroll: React.FunctionComponent<VerticalScrollProps> = (props): JSX.Element => {
  const content = useRef();
  const [scrollEvent, setScrollEvent] = useState(null);
  const [moreContentUp, setMoreContentUp] = useState(false);
  const [moreContentDown, setMoreContentDown] = useState(false);
  const [scrollBar, setScrollBar] = useState({ height: props.maxHeight, top: 0 });

  const calculateScrollBar = useCallback((top, scrollHeight) => {
    const scrollBarHeight = (props.maxHeight / scrollHeight) * props.maxHeight;
    setScrollBar({
      height: scrollBarHeight,
      top: (top / scrollHeight) * props.maxHeight,
    });
  }, []);

  useEffect(() => {
    if (scrollEvent) {
      const top = scrollEvent.target.scrollTop;
      const height = scrollEvent.target.scrollHeight;
      const bottom = height - (top + props.maxHeight);

      setMoreContentUp(top > POINTER_OFFSET && top < height);
      setMoreContentDown(bottom > 0);
      calculateScrollBar(top, height);
    }
  }, [scrollEvent]);

  useEffect(() => {
    const { current } = content;
    if (current) {
      current.scrollTo({
        top: 1,
        behavior: 'smooth',
      });
    }
  }, [content]);
  return (
    <div className="ed-verticalScroll">
      <span
        className={classNames({
          'ed-verticalScroll__content--pointer pointer__up': true,
          moreContentUp,
        })}
      >
        <Button
          fab
          icon="keyboard_arrow_up"
          mini
          type="button"
          theme="primary"
          onClick={() => {
            if (scrollEvent) {
              scrollEvent.target.scrollTo({
                top: 0,
                behavior: 'smooth',
              });
            }
          }}
        />
      </span>
      <div
        className="ed-verticalScroll__content"
        onScroll={e => setScrollEvent({ ...e })}
        ref={content}
        style={{
          maxHeight: props.maxHeight + 'px',
        }}
      >
        {props.children}
      </div>
      <span
        className={classNames({
          'ed-verticalScroll__content--pointer pointer__down': true,
          moreContentDown,
        })}
      >
        <Button
          fab
          icon="keyboard_arrow_down"
          mini
          type="button"
          theme="primary"
          onClick={() => {
            if (scrollEvent) {
              scrollEvent.target.scrollTo({
                top: scrollEvent.target.scrollHeight,
                behavior: 'smooth',
              });
            }
          }}
        />
      </span>
      {scrollBar.height !== props.maxHeight && (
        <span className="ed-verticalScroll__scrollBar" style={{ ...scrollBar }} />
      )}
    </div>
  );
};

export interface VerticalScrollProps {
  maxHeight: number;
  children: ReactNode;
}

export default VerticalScroll;
