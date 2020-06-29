import React, { useEffect, useRef, useState } from 'react';
import './VerticalScroll.scss';
import Button from '@edudoor/ui/components/Buttons/Button';
import Icon from '@edudoor/ui/components/Icon';
import IconButton from '@edudoor/ui/components/Buttons/IconButton';

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
      setMoreContentDown(bottom > POINTER_OFFSET);
    }
  }, [scrollEvent]);

  useEffect(() => {
    if (content.current) {
      const top = content.current.scrollTop;
      const height = content.current.scrollHeight;
      const bottom = height - (top + props.maxHeight);

      setMoreContentUp(top > POINTER_OFFSET && top < height);
      setMoreContentDown(bottom > POINTER_OFFSET);
    }
  }, [content]);
  return (
    <div
      className="ed-verticalScroll"
      onScroll={e => setScrollEvent({ ...e })}
      ref={content}
      style={{
        maxHeight: props.maxHeight + 'px',
        height: '100%',
      }}
    >
      <div className="ed-verticalScroll__content">
        {moreContentUp && (
          <span className="ed-verticalScroll__content--pointer pointer__up">
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
        )}
        <div>{props.children}</div>
        {moreContentDown && (
          <span className="ed-verticalScroll__content--pointer pointer__down">
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
        )}
      </div>
    </div>
  );
};

export interface VerticalScrollProps {
  maxHeight: number;
}

export default VerticalScroll;
