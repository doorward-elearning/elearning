import { useEffect, useState } from 'react';
import { WebComponentState } from '../reducers/reducers';

function useFormSubmit<T extends WebComponentState<R>, R>(
  form?: T,
  onSubmit?: () => void
): boolean {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (form) {
      if (form.fetching) {
        setSubmitting(true);
        setSubmitted(false);
      }
      if (form.fetched && submitting) {
        setSubmitted(true);
      }
    }
  }, [form]);

  useEffect(() => {
    if (submitted) {
      onSubmit && onSubmit();
    }
  }, [submitted]);

  return submitted;
}

export default useFormSubmit;