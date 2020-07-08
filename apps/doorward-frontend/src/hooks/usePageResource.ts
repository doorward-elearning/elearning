import { useContext } from 'react';
import { ActionCreator } from '@doorward/ui/reducers/reducers';
import { RouteNames } from '@doorward/ui/types';
import { AppContext } from '../main';
import useBasePageResource from '@doorward/ui/hooks/useBasePageResource';

const usePageResource = <T extends RouteNames>(key: string, action: ActionCreator, args: any[] = []) => {
  const context = useContext(AppContext);
  useBasePageResource(context)(key, action, args);
};

export default usePageResource;
