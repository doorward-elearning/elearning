import useModal, { UseModal } from '@doorward/ui/hooks/useModal';
import * as React from 'react';

function withModal<T extends string, BaseProps>(
  name: T,
  Component: React.ComponentType<BaseProps & Record<T, UseModal>>
): React.FunctionComponent<Omit<BaseProps, T>> {
  return ((props) => {
    const modal = useModal();

    return <Component {...{ ...props, [name]: modal }} />;
  }) as any;
}

export default withModal;
