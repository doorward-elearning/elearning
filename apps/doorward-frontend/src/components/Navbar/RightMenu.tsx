import React from 'react';
import Icon from '@doorward/ui/components/Icon';
import useRoutes from '../../hooks/useRoutes';

const RightMenu: React.FunctionComponent<RightMenuProps> = (props): JSX.Element => {
  const routes = useRoutes();
  return (
    <div>
      <Icon
        icon="chat"
        onClick={() => {
          routes.navigate(routes.chat);
        }}
      />
    </div>
  );
};

export interface RightMenuProps {}

export default RightMenu;
