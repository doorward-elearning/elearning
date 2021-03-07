import { useHistory } from 'react-router';
import { History, Path } from 'history';
import Tools from '@doorward/common/utils/Tools';

export interface Navigation extends History {
  navigate(path: Path, params?: Record<string, any>): void;
}

const useNavigation = (): Navigation => {
  const history = useHistory();

  return {
    ...history,
    navigate(path: string, params?: Record<string, any>): void {
      history.push(Tools.createRoute(path, params));
    },
  };
};

export default useNavigation;
