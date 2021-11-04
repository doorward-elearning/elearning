import React, { CSSProperties, ReactNode, useEffect, useRef, useState } from 'react';
import './VerticalScroll.scss';
import Button from '@doorward/ui/components/Buttons/Button';
import classNames from 'classnames';

const POINTER_OFFSET = 20;

const VerticalScroll: React.FunctionComponent<VerticalScrollProps> = (props): JSX.Element => {
  const content = useRef();
  const [scrollEvent, setScrollEvent] = useState(null);
  const [moreContentUp, setMoreContentUp] = useState(false);
  const [moreContentDown, setMoreContentDown] = useState(false);

  useEffect(() => {
    if (scrollEvent) {
      const top = scrollEvent.target.scrollTop;
      const height = scrollEvent.target.scrollHeight;
      const bottom = height - (top + props.maxHeight);

      setMoreContentUp(top > POINTER_OFFSET && top < height);
      setMoreContentDown(bottom > 0);
    }
  }, [scrollEvent]);

  useEffect(() => {
    const { current } = content;
    if (current) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
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
        className={classNames('ed-verticalScroll__content', props.className)}
        onScroll={(e) => setScrollEvent({ ...e })}
        ref={content}
        style={{
          ...props.style,
          maxHeight: props.maxHeight,
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
    </div>
  );
};

export interface VerticalScrollProps {
  maxHeight: number;
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
}

export default VerticalScroll;
