import React, { FunctionComponent } from 'react';
import classNames from 'classnames';
import placeholder from '../../../../apps/edudoor_frontend/src/assets/images/placeholder.png';
import './Image.scss';

const EImage: FunctionComponent<ImageProps> = ({ size = 'default', ...props }): JSX.Element => {
  const classes = classNames({
    'eb-image': true,
    circle: props.circle,
    fluid: props.fluid,
    [size]: true,
  });
  return <img src={props.src || placeholder} alt={props.alt} className={classes} />;
};

export interface ImageProps {
  src?: string;
  alt?: string;
  fluid?: boolean;
  circle?: boolean;
  size?: 'medium' | 'small' | 'large' | 'xLarge' | 'default' | 'responsive';
}

export default EImage;
