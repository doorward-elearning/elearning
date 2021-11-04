import React from 'react';
import HorizontalScroll, { HorizontalScrollProps } from '@doorward/ui/components/HorizontalScroll';
import VerticalScroll, { VerticalScrollProps } from '@doorward/ui/components/VerticalScroll';

const ScrollLayout: React.FunctionComponent<ScrollLayoutProps> = (props): JSX.Element => {
  if (props.scrollType === 'vertical') {
    return <VerticalScroll {...(props as VerticalScrollProps)} children={props.children} />;
  }
  return <HorizontalScroll {...props} />;
};

export type ScrollLayoutProps =
  | (HorizontalScrollProps & {
      scrollType: 'horizontal';
    })
  | (VerticalScrollProps & {
      scrollType: 'vertical';
    });

export default ScrollLayout;
