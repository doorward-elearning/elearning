import React from 'react';
import withInput, { InputFeatures, InputProps } from './index';
import Switch from '../Switch';
import ItemArray from '../ItemArray';
import Row from '../Row';
import List from '../List';
import ListItem from '../List/ListItem';

const MultipleSwitchField: React.FunctionComponent<MultipleSwitchFieldProps> = props => {
  const value = props.value;
  const values = props.values || props.choices;
  const handleToggle = (name: string, open: boolean): void => {
    let newValue = value;
    if (props.singleChoice) {
      if (open) {
        newValue = name;
      } else {
        newValue = '';
      }
    } else {
      newValue = newValue || [];
      if (open) {
        newValue.push(name);
      } else {
        newValue = newValue.filter((item: string) => item !== name);
      }
    }
    const event = {
      target: {
        value: newValue,
        name: props.name,
      },
    };
    props.onChange(event);
    props.onBlur(event);
  };

  return (
    <div className="eb-input__switch">
      <List>
        <ItemArray data={props.choices}>
          {(item, index) => (
            <ListItem>
              <Row style={{ justifyContent: 'start', gridGap: 'var(--padding-lg)' }}>
                <Switch
                  open={props.singleChoice ? value === values[index] : !!value.find((i: string) => i === values[index])}
                  onToggle={open => handleToggle(values[index], open)}
                  id={props.id + values[index]}
                />
                <span>{item}</span>
              </Row>
            </ListItem>
          )}
        </ItemArray>
      </List>
    </div>
  );
};

export interface MultipleSwitchFieldProps extends InputProps {
  choices: Array<string>;
  values?: Array<string>;
  singleChoice?: boolean;
}

export default withInput(MultipleSwitchField, [InputFeatures.LABEL], { labelPosition: 'top' });
