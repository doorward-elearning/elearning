import { useContext } from 'react';
import { RouteNames } from '@doorward/ui/types';
import { AppContext } from '../main';
import useBasePageResource from '@doorward/ui/hooks/useBasePageResource';
import { ApiActionCreator } from 'use-api-action/types/types';

const usePageResource = <T extends RouteNames>(key: string, action: ApiActionCreator, args: any[] = []) => {
  const context = useContext(AppContext);
  useBasePageResource(context)(key, action, args);
};

export default usePageResource;
