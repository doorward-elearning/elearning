import { useEffect, useState } from 'react';
import { WebComponentState } from '../reducers/reducers';

function useFormSubmit<T extends WebComponentState<any>>(form: T): boolean {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (form.fetching) {
      setSubmitting(true);
    }
    if (form.fetched && submitting) {
      setSubmitted(true);
    }
  }, [form]);

  return submitted;
}

export default useFormSubmit;