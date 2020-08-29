import React, { ReactChild } from 'react';
import BasicForm from '../BasicForm';
import { createCourseModuleItemAction } from '../../../reducers/courses/actions';
import { UseForm } from '@doorward/ui/hooks/useForm';
import { useSelector } from 'react-redux';
import { State } from '../../../store';
import { CourseModuleItemBody } from '../../../services/models/requestBody';
import { FormikProps } from 'formik';
import { Module } from '@doorward/common/models/Module';
import { ModuleItemTypes } from '@doorward/common/models';

function AddModuleItemForm<T extends AddModuleItemFormState>(props: AddModuleItemFormProps<T>): JSX.Element {
  const initialValues: any = {
    title: '',
    content: null,
    type: props.type,
    ...(props.initialValues || ({} as T)),
  };
  const state = useSelector((state: State) => state.courses.addModuleItem);
  return (
    <BasicForm
      submitAction={createCourseModuleItemAction}
      onSuccess={props.onSuccess}
      onCancel={props.onCancel}
      initialValues={initialValues}
      validationSchema={props.validationSchema}
      state={state}
      form={props.form}
      showSuccessToast
      showOverlay
      createData={
        props.createData ||
        ((values) => [
          props.item.id,
          {
            ...values,
            content: values.video
              ? {
                  content: values.content,
                  video: values.video || '',
                }
              : values.content,
          },
        ])
      }
    >
      {props.children}
    </BasicForm>
  );
}

export interface AddModuleItemFormState extends CourseModuleItemBody {
  [name: string]: any;
}

export interface AddModuleItemFormProps<T extends AddModuleItemFormState> {
  onSuccess: () => void;
  onCancel: () => void;
  type: ModuleItemTypes;
  form: UseForm<T>;
  item: Module;
  initialValues?: Omit<T, keyof CourseModuleItemBody>;
  validationSchema?: ((props: any) => any) | any;
  createData?: (values: T) => Array<any>;
  children: Array<ReactChild> | ReactChild | ((formikProps: FormikProps<T>) => JSX.Element);
}

export default AddModuleItemForm;
