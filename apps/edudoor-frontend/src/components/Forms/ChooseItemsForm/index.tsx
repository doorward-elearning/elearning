import React from 'react';
import WebComponent from '@edudoor/ui/components/WebComponent';
import BasicForm, { BasicFormFeatures } from '../BasicForm';
import { ActionCreator, WebComponentState } from '@edudoor/ui/reducers/reducers';
import { UseForm } from '@edudoor/ui/hooks/useForm';
import Table, { TableColumns } from '@edudoor/ui/components/Table';
import IfElse from '@edudoor/ui/components/IfElse';
import SwitchInput from '@edudoor/ui/components/Input/SwitchInput';
import Tools from '@edudoor/common/utils/Tools';
import { FormikProps } from 'formik';
import Row from '@edudoor/ui/components/Row';

function ChooseItemsForm<T>(props: ChooseItemsFormProps<T>): JSX.Element {
  const createList = (items: Array<T>): Array<T & { selected: boolean }> => {
    return items.map(item => ({ ...item, selected: false }));
  };

  return (
    <WebComponent data={props.items} loading={props.state.fetching}>
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
                  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                  // @ts-ignore
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
  );
}

export interface ChooseItemsFormProps<T> {
  items: Array<T>;
  state: WebComponentState<any>;
  form: UseForm<{ items: Array<T> }>;
  onSuccess: () => void;
  features?: Array<BasicFormFeatures>;
  submitAction: ActionCreator;
  chooseHeader?: string;
  createData: (data: { items: Array<T & { selected: boolean }> }) => any;
  columns: TableColumns;
  renderCell?: (row: T, index: number) => { [name in keyof TableColumns]: JSX.Element };
  children?: (formikProps: FormikProps<any>) => JSX.Element;
}

export default ChooseItemsForm;
