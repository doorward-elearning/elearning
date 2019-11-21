import React from 'react';
import withInput, { InputFeatures, InputProps } from './index';
import Switch from '../Switch';
import ItemArray from '../ItemArray';
import Row from '../Row';
import List from '../List';
import ListItem from '../List/ListItem';

const MultipleSwitchField: React.FunctionComponent<MultipleSwitchFieldProps> = props => {
  const value = props.value || [];
  const handleToggle = (name: string, open: boolean): void => {
    let newValue = value;
    if (open) {
      newValue.push(name);
    } else {
      newValue = newValue.filter((item: string) => item === name);
    }
    props.onChange({
      target: {
        value: newValue,
        name: props.name,
      },
    });
  };
  return (
    <div className="eb-input__switch">
      <List>
        <ItemArray data={props.choices}>
          {item => (
            <ListItem>
              <Row style={{ justifyContent: 'start', gridGap: 'var(--padding-lg)' }}>
                <Switch
                  open={!!value.find((i: string) => i === item)}
                  onToggle={open => handleToggle(item, open)}
                  id={props.id + item}
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
}

export default withInput(MultipleSwitchField, [InputFeatures.LABEL], { labelPosition: 'top' });
