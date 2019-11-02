import React from 'react';
import { ThemeContext, ThemeContextProps } from '../ApplicationTheme';
const Loader = require('react-loader-spinner').default;

const Spinner: React.FunctionComponent<SpinnerProps> = props => {
  const defaultProps: SpinnerProps = {
    type: 'Oval',
    width: 50,
    height: 50,
  };
  return (
    <ThemeContext.Consumer>
      {(theme: ThemeContextProps): JSX.Element => {
        return <Loader {...{ ...defaultProps, color: theme.theme['--accent'], ...props }} />;
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
