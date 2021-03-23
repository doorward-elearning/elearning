import useAction from './useActions';
import useFormSubmit from './useFormSubmit';
import { UseModal } from './useModal';
import { ApiActionCreator, WebComponentState } from 'use-api-action/types/types';
import useRequestToast from '@doorward/ui/hooks/useRequestToast';

const useRequestModal = (props: UseRequestModalProps): UseRequestModal => {
  const overrideAction = () => {
    return { ...props.action(...(props.args || [])) };
  };

  const action = useAction(overrideAction);

  useRequestToast(props.state, props.showSuccessToast, props.showErrorToast);

  useFormSubmit(props.state, () => {
    if (props.state.fetched) {
      props.useModal.closeModal();
      setTimeout(() => {
        if (props.onSuccess) {
          props.onSuccess(props.state.data);
        }
      }, 200);
    }
    if (props.state?.errors?.message || props.state?.errors?.errors) {
      props.useModal.closeModal();
      setTimeout(() => {
        if (props.onError) {
          props.onError(props.state.errors);
        }
      }, 200);
    }
  });
  return {
    submit: action,
    loading: props.state.fetching || props.state.submitting,
  };
};

export interface UseRequestModal {
  submit: VoidFunction;
  loading: boolean;
}

export interface UseRequestModalProps {
  action: ApiActionCreator;
  state: WebComponentState<any>;
  showErrorToast?: boolean;
  showSuccessToast?: boolean;
  useModal: UseModal;
  args?: Array<any>;
  onSuccess?: (data: any) => void;
  onError?: (errors: any) => void;
}
export default useRequestModal;
