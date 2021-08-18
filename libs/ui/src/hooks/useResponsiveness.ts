import { useCallback, useEffect, useState } from 'react';

export enum DisplayDeviceType {
  MOBILE = 1,
  TABLET = 2,
  DESKTOP = 3,
}

/**
 * Provide real time updates on responsiveness to Javascript
 */
const useResponsiveness = () => {
  const [device, setDevice] = useState(DisplayDeviceType.DESKTOP);
  const [width, setWidth] = useState(window.innerWidth);

  const resizeListener = useCallback((event) => {
    setWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    setDevice(
      width <= 500 ? DisplayDeviceType.MOBILE : width <= 1000 ? DisplayDeviceType.TABLET : DisplayDeviceType.DESKTOP
    );
  }, [width]);

  useEffect(() => {
    window.addEventListener('resize', resizeListener);
  }, []);

  return [device, width];
};

export default useResponsiveness;
