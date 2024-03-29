import React, { useContext } from 'react';
import { ReactGoogleChartProps } from 'react-google-charts/dist/types';
import { Chart } from 'react-google-charts';
import { ThemeContext } from '../ApplicationTheme';
import './CustomChart.scss';

const CustomChart: React.FunctionComponent<CustomChartProps> = props => {
  const { theme } = useContext(ThemeContext);
  return (
    <Chart
      className="ed-google-chart"
      {...props}
      options={{
        backgroundColor: theme['--bg-primary'],
        colors: [theme['--primary']],
        ...props.options,
      }}
    />
  );
};

export interface CustomChartProps extends ReactGoogleChartProps {}

export default CustomChart;
