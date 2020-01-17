import React from 'react';
import WebComponent from '@edudoor/ui/components/WebComponent';
import BasicForm, { BasicFormFeatures } from '../BasicForm';
import { ActionCreator, WebComponentState } from '@edudoor/ui/reducers/reducers';
import { UseForm } from '@edudoor/ui/hooks/useForm';
import Table, { TableColumns } from '@edudoor/ui/components/Table';
import IfElse from '@edudoor/ui/components/IfElse';
import SwitchInput from '@edudoor/ui/components/Input/SwitchInput';
import Tools from '@edudoor/common/utils/Tools';

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
            <Table
              columns={{
                ...props.columns,
                _uniqueColumnAdd_: props.chooseHeader || 'Choose',
              }}
              data={formikProps.values.items}
              onRowClick={(row, index): void => {
                formikProps.setFieldValue(`items.${index}.selected`, true);
              }}
              getCell={(row, index, column): JSX.Element => {
                return (
                  <IfElse condition={column === '_uniqueColumnAdd_'}>
                    <SwitchInput labelPosition="right" name={`items.${index}.selected`} />
                    {props.renderCell ? (
                      props.renderCell(row as T, index, column)
                    ) : (
                      <span>{Tools.str(row[column as keyof typeof row])}</span>
                    )}
                  </IfElse>
                );
              }}
            />
          )}
        </BasicForm>
      )}
    </WebComponent>
  );
}

export interface ChooseItemsFormProps<T> {
  items: Array<T>;
  state: WebComponentState<any>;
  form: UseForm<any>;
  onSuccess: () => void;
  features?: Array<BasicFormFeatures>;
  submitAction: ActionCreator;
  chooseHeader?: string;
  createData: (data: { items: Array<T & { selected: boolean }> }) => any;
  columns: TableColumns;
  renderCell?: (row: T, index: number, column: string) => JSX.Element;
}

export default ChooseItemsForm;
