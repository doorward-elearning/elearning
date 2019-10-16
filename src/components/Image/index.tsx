import React, { FunctionComponent } from 'react';
import classNames from 'classnames';
import './Image.scss';

const Image: FunctionComponent<ImageProps> = ({ size = 'default', ...props }): JSX.Element => {
  const classes = classNames({
    'eb-image': true,
    circle: props.circle,
    [size]: true,
  });
  return <img src={props.src} alt={props.alt} className={classes} />;
};

export interface ImageProps {
  src?: string;
  alt?: string;
  circle?: boolean;
  size?: 'medium' | 'small' | 'large' | 'xLarge' | 'default';
}

export default Image;
