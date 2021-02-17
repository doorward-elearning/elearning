import React, { useCallback, useEffect, useState } from 'react';
import WebComponent from '@doorward/ui/components/WebComponent';
import './ChooseItemsForm.scss';
import BasicForm, { BasicFormFeatures } from '../BasicForm';
import { UseForm } from '@doorward/ui/hooks/useForm';
import Table, { ColumnProperties } from '@doorward/ui/components/Table';
import { FieldArray, FormikProps } from 'formik';
import Row from '@doorward/ui/components/Row';
import translate from '@doorward/common/lang/translate';
import { ApiActionCreator, WebComponentState } from 'use-api-action/types/types';
import Checkbox, { BasicCheckbox } from '@doorward/ui/components/Input/Checkbox';

function ChooseItemsForm<T extends { id: string | number }, R>(props: ChooseItemsFormProps<T, R>): JSX.Element {
  const [itemsState, setItemsState] = useState<Record<string, boolean>>({});
  const [allSelected, setAllSelected] = useState(false);

  useEffect(() => {
    if (!props.singleChoice) {
      const items = props.getItems(props.items) || [];
      setAllSelected(!items.find((item) => !itemsState[item.id]));
    }
  }, [itemsState, props.items]);

  const createList = useCallback(
    (items: Array<T>): Array<T & { selected: boolean }> => {
      return items.map((item) => ({ ...item, selected: !!itemsState[item.id] }));
    },
    [itemsState]
  );

  return (
    <div className="ed-items-chooser">
      <WebComponent
        data={props.getItems(props.items)}
        loading={props.items.fetching}
        showRefreshingProgress
        actionMessage={props.hasSearch && translate('removeFilter')}
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
                <FieldArray name="items">
                  {(fieldArrayProps) => (
                    <Table
                      height={300}
                      columns={{
                        _uniqueColumnAdd_: {
                          title: props.chooseHeader || translate('choose'),
                          width: 300,
                          cellRenderer: ({ rowIndex: index }) => (
                            <div style={{ display: 'grid', placeItems: 'center', zIndex: 1 }}>
                              <Checkbox labelPosition="right" name={`items.${index}.selected`} />
                            </div>
                          ),
                          headerRenderer: ({}) =>
                            !props.singleChoice && (
                              <div style={{ display: 'grid', placeItems: 'center' }}>
                                <BasicCheckbox
                                  labelPosition="right"
                                  value={allSelected}
                                  onChange={(e) => {
                                    if (!props.singleChoice) {
                                      const items = props.getItems(props.items);
                                      const result = { ...itemsState };
                                      for (let index = 0; index < items.length; index++) {
                                        formikProps.setFieldValue(`items.${index}.selected`, !allSelected);
                                        result[items[index].id] = !allSelected;
                                      }
                                      setItemsState(result);
                                    }
                                  }}
                                />
                              </div>
                            ),
                          headerClassName: 'items-chooser-checkbox-header',
                          className: 'items-chooser-checkbox',
                          disableSort: true,
                        },
                        ...props.columns,
                      }}
                      rowHeight={50}
                      headerHeight={50}
                      data={formikProps.values.items}
                      onRowClick={({ rowData, index }): void => {
                        let result = { ...itemsState };
                        if (props.singleChoice) {
                          result = {};
                          for (let i = 0; i < items.length; i++) {
                            formikProps.setFieldValue(`items.${i}.selected`, false);
                          }
                        }
                        formikProps.setFieldValue(`items.${index}.selected`, !formikProps.values.items[index].selected);
                        result[items[index].id] = !formikProps.values.items[index].selected;
                        setItemsState(result);
                      }}
                    />
                  )}
                </FieldArray>
                {props.children && props.children(formikProps)}
              </Row>
            )}
          </BasicForm>
        )}
      </WebComponent>
    </div>
  );
}

export interface ChooseItemsFormProps<T extends { id: string | number }, R> {
  items: WebComponentState<R>;
  getItems: (state: WebComponentState<R>) => Array<T>;
  state: WebComponentState<any>;
  form: UseForm<{ items: Array<T & { selected?: boolean }> }>;
  onSuccess: () => void;
  features?: Array<BasicFormFeatures>;
  submitAction: ApiActionCreator;
  chooseHeader?: string;
  createData: (data: { items: Array<T & { selected: boolean }> }) => any;
  columns?: ColumnProperties<T>;
  children?: (formikProps: FormikProps<any>) => JSX.Element;
  singleChoice?: boolean;
  hasSearch?: boolean;
  onRemoveFilter?: () => void;
}

export default ChooseItemsForm;
