import { WebComponentState } from 'use-api-action/types/types';
import useFormSubmit from '@doorward/ui/hooks/useFormSubmit';
import toast from '@doorward/ui/utils/toast';
import DApiResponse from '@doorward/common/dtos/response/base.response';
import { useCallback } from 'react';

const useRequestToast = <Response extends DApiResponse>(
  state: WebComponentState<Response, Response>,
  showSuccessToast = true,
  showErrorToast = true
) => {
  const onFormSubmit = useCallback(() => {
    if (showSuccessToast && state.fetched) {
      toast.show({
        message: state.data?.message,
        type: 'success',
        hPosition: 'center',
        vPosition: 'top',
      });
    }

    if (showErrorToast && state.failed) {
      toast.show({
        message: state.errors?.message,
        type: 'error',
        hPosition: 'center',
        vPosition: 'top',
      });
    }
  }, [state]);
  useFormSubmit(state, onFormSubmit);
};

export default useRequestToast;
