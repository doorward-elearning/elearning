import React from 'react';
import { Theme } from '../../../assets/themes';
import { ThemeContext } from '../ApplicationTheme';
const Loader = require('react-loader-spinner').default;

const Spinner: React.FunctionComponent<SpinnerProps> = props => {
  const defaultProps: SpinnerProps = {
    type: 'Oval',
    width: 50,
    height: 50,
  };
  return (
    <ThemeContext.Consumer>
      {(theme: Theme): JSX.Element => {
        return <Loader {...{ ...defaultProps, color: theme['--accent'], ...props }} />;
      }}
    </ThemeContext.Consumer>
  );
};

export interface SpinnerProps {
  type?: string;
  color?: string;
  height?: number;
  width?: number;
}

export default Spinner;
