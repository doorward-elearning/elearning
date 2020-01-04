import React, { FunctionComponent } from 'react';
import withInput, { InputFeatures, InputProps } from './index';
import Rating, { RatingSize } from '../Rating';
import './styles/RatingInput.scss';

const RatingInput: FunctionComponent<RatingInputProps> = (props): JSX.Element => {
  const onChange = (rating: number) => {
    props.onChange({ target: { name: props.name, value: rating === 0 ? null : rating } });
    props.onBlur({ target: { name: props.name, value: rating === 0 ? null : rating } });
  };
  return (
    <div className="eb-input__rating">
      <Rating size={props.size} onChange={onChange} />
    </div>
  );
};

export interface RatingInputProps extends InputProps {
  size: RatingSize;
}

export default withInput(RatingInput, [InputFeatures.LABEL], { labelPosition: 'top' });
