import React from 'react';
import WebComponent from '@doorward/ui/components/WebComponent';
import BasicForm, { BasicFormFeatures } from '../BasicForm';
import { ActionCreator, WebComponentState } from '@doorward/ui/reducers/reducers';
import { UseForm } from '@doorward/ui/hooks/useForm';
import Table, { TableColumns } from '@doorward/ui/components/Table';
import SwitchInput from '@doorward/ui/components/Input/SwitchInput';
import { FormikProps } from 'formik';
import Row from '@doorward/ui/components/Row';

function ChooseItemsForm<T, R>(props: ChooseItemsFormProps<T, R>): JSX.Element {
  const createList = (items: Array<T>): Array<T & { selected: boolean }> => {
    return items.map(item => ({ ...item, selected: false }));
  };

  return (
    <div>
      <WebComponent
        data={props.getItems(props.items)}
        loading={props.items.fetching}
        showRefreshingProgress
        actionMessage={props.hasSearch && 'Remove filter'}
        onAction={props.onRemoveFilter}
      >
        {(items): JSX.Element => (
          <BasicForm
            initialValues={{ items: createList(items) }}
            state={props.state}
            form={props.form}
            showSuccessToast
            onSuccess={props.onSuccess}
            features={props.features || []}
            submitAction={props.submitAction}
            createData={props.createData}
          >
            {(formikProps): JSX.Element => (
              <Row style={{ alignItems: 'start', gridGap: 'var(--padding)' }}>
                <Table
                  columns={{
                    ...props.columns,
                    _uniqueColumnAdd_: props.chooseHeader || 'Choose',
                  }}
                  data={formikProps.values.items}
                  onRowClick={(row, index): void => {
                    if (props.singleChoice) {
                      for (let i = 0; i < items.length; i++) {
                        formikProps.setFieldValue(`items.${i}.selected`, false);
                      }
                    }
                    formikProps.setFieldValue(`items.${index}.selected`, !formikProps.values.items[index].selected);
                  }}
                  getCell={(row, index) => {
                    return {
                      _uniqueColumnAdd_: <SwitchInput labelPosition="right" name={`items.${index}.selected`} />,
                      ...(props.renderCell ? props.renderCell(row, index) : {}),
                    };
                  }}
                />
                {props.children && props.children(formikProps)}
              </Row>
            )}
          </BasicForm>
        )}
      </WebComponent>
    </div>
  );
}

export interface ChooseItemsFormProps<T, R> {
  items: WebComponentState<R>;
  getItems: (state: WebComponentState<R>) => Array<T>;
  state: WebComponentState<any>;
  form: UseForm<{ items: Array<T & { selected?: boolean }> }>;
  onSuccess: () => void;
  features?: Array<BasicFormFeatures>;
  submitAction: ActionCreator;
  chooseHeader?: string;
  createData: (data: { items: Array<T & { selected: boolean }> }) => any;
  columns: TableColumns;
  renderCell?: (row: T, index: number) => { [name in keyof TableColumns]: JSX.Element };
  children?: (formikProps: FormikProps<any>) => JSX.Element;
  singleChoice?: boolean;
  hasSearch?: boolean;
  onRemoveFilter?: () => void;
}

export default ChooseItemsForm;
