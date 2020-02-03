import useAction from './useActions';
import useFormSubmit from './useFormSubmit';
import { UseModal } from './useModal';
import { ActionCreator, WebComponentState } from '../reducers/reducers';

const useRequestModal = (props: UseRequestModalProps): UseRequestModal => {
  const overrideAction = () => {
    const action = { ...props.action(...(props.args || [])) };
    action.showErrorToast = props.showErrorToast;
    action.showSuccessToast = props.showSuccessToast;
    return action;
  };

  const action = useAction(overrideAction);

  useFormSubmit(props.state, () => {
    if (props.state.fetched) {
      props.useModal.closeModal();
      props.onSuccess && props.onSuccess(props.state.data);
    }
    if (props.state.errors.message || props.state.errors.errors) {
      props.useModal.closeModal();
      props.onError && props.onError(props.state.errors);
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
  action: ActionCreator;
  state: WebComponentState<any>;
  showErrorToast?: boolean;
  showSuccessToast?: boolean;
  useModal: UseModal;
  args?: Array<any>;
  onSuccess?: (data: any) => void;
  onError?: (errors: any) => void;
}
export default useRequestModal;
