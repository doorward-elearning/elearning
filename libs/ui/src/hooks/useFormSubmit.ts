import { useEffect, useState } from 'react';
import { WebComponentState } from 'use-api-action/types/types';

function useFormSubmit<T extends WebComponentState<Data, any>, Data>(form?: T, onSubmit?: () => void): boolean {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (form) {
      if (form.submitting) {
        setSubmitting(true);
        setSubmitted(false);
      }
      if (form.submitted && submitting) {
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
