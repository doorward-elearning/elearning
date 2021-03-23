import React from 'react';
import './LetterIcon.scss';
import Tools from '@doorward/common/utils/Tools';

const LetterIcon: React.FunctionComponent<LetterIconProps> = (props): JSX.Element => {
  return (
    <div
      style={{
        background: Tools.color(props.word),
        width: props.width,
        height: props.height,
        fontSize: props.height / 1.8,
      }}
      className="ed-letter-icon"
    >
      {props.word.toUpperCase().charAt(0)}
    </div>
  );
};

export interface LetterIconProps {
  word: string;
  width: number;
  height: number;
}

export default LetterIcon;
