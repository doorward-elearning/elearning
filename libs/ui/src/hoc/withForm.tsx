import useForm, { UseForm } from '@doorward/ui/hooks/useForm';
import * as React from 'react';

function withForm<T extends string, BaseProps, R>(
  name: T,
  Component: React.ComponentType<BaseProps & Record<T, UseForm<R>>>
): React.FunctionComponent<BaseProps> {
  return ((props) => {
    const form = useForm();

    return <Component {...{ ...props, [name]: form }} />;
  }) as any;
}
export default withForm;
