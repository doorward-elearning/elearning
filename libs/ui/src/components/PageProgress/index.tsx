import React, { useState } from 'react';
import classNames from 'classnames';
import './PageProgress.scss';
import useStateRef from '../../hooks/useStateRef';
import ProgressBar from '../ProgressBar';

export type PageProgressContextProps = {
  setLoading: (loading: boolean) => void;
};

export const PageProgressContext = React.createContext<PageProgressContextProps>({
  setLoading: loading => {},
});

const PageProgress: React.FunctionComponent<PageProgressProps> = props => {
  const [value, setValue, valueRef] = useStateRef(10);
  const [completed, setCompleted] = useState(false);
  const [units, setUnits, unitsRef] = useStateRef(0);

  const GROWTH_PERCENTAGE = 0.05;
  const INITIAL_PROGRESS = 0.66;
  const INTERVAL = 100;

  let timeout: any;
  const setLoading = (loading: boolean): void => {
    setValue(loading ? INITIAL_PROGRESS : 1);
    if (loading) {
      if (timeout) {
        clearInterval(timeout);
      }
      timeout = setInterval(() => {
        setUnits(unitsRef.current + INTERVAL);
        if (valueRef.current >= 1) {
          clearInterval(timeout);
          setUnits(0);
          setTimeout(() => {
            setCompleted(true);
          }, 500);
        } else {
          setValue(INITIAL_PROGRESS * Math.pow(1 + GROWTH_PERCENTAGE, unitsRef.current / 1000.0));
          setCompleted(false);
        }
      }, INTERVAL);
    }
  };

  return (
    <PageProgressContext.Provider value={{ setLoading }}>
      <div
        className={classNames({
          'page-progress__container': true,
          completed: completed || value === 10,
        })}
      >
        <ProgressBar progress={value} indeterminate={false} />
        {props.children}
      </div>
    </PageProgressContext.Provider>
  );
};

export interface PageProgressProps {}

export default PageProgress;
