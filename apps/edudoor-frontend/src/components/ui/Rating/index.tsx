import React, { FunctionComponent, MouseEventHandler, useEffect, useState } from 'react';
import './Rating.scss';
import ItemArray from '../ItemArray';
import classNames from 'classnames';
import Icon from '../Icon';
import { Icons } from '../../../types/icons';

const Star: FunctionComponent<StarProps> = ({ value, rating = 0, onClick }): JSX.Element => {
  let icon: Icons = 'star_border';
  if (value <= rating) {
    icon = 'star';
  }
  return (
    <span
      onClick={onClick}
      className={classNames({
        'ed-rating__star': true,
        selected: value <= rating,
      })}
    >
      <Icon icon={icon} />
    </span>
  );
};

const Rating: FunctionComponent<RatingProps> = ({ max = 5, size = 'default', ...props }): JSX.Element => {
  const [rating, setRating] = useState();

  useEffect(() => {
    if (rating >= 0) {
      props.onChange(rating);
    }
  }, [rating]);

  return (
    <div
      className={classNames({
        'ed-rating': true,
        [size]: true,
      })}
    >
      <ItemArray data={Array(5).fill(0)}>
        {(_, item) => (
          <Star value={item + 1} rating={rating} onClick={() => setRating(rating === item + 1 ? 0 : item + 1)} />
        )}
      </ItemArray>
    </div>
  );
};

export type RatingSize = 'default' | 'small' | 'medium' | 'large' | 'xLarge';

export interface RatingProps {
  max?: number;
  size?: RatingSize;
  onChange: (rating: number) => void;
}

export interface StarProps {
  value: number;
  rating?: number;
  onClick: MouseEventHandler;
}

export default Rating;
