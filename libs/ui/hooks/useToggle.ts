import { useState } from 'react';

export type UseToggle = (initial: boolean) => [boolean, (value: boolean) => void];

const useToggle = (initial = false): [boolean, (value: boolean) => void] => {
  return useState(initial);
};

export default useToggle;
