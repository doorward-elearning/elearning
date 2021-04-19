import React from 'react';
import Option from '../../../components/Option';
import classNames from 'classnames';
import Icon from '@doorward/ui/components/Icon';

class EquationComponent extends React.Component<EquationComponentProps> {
  submitEquation = () => {
    const { onChange } = this.props;
    onChange();
  };

  render(): JSX.Element {
    const {
      config: { icon, className, title },
      expanded,
      translations,
    } = this.props;

    return (
      <div className={classNames('rdw-equation-wrapper')} aria-expanded={expanded}>
        <Option
          className={classNames(className)}
          onClick={this.submitEquation}
          title={title || translations('components_controls_equation_equation')}
        >
          <Icon icon={icon} />
        </Option>
      </div>
    );
  }
}

export interface EquationComponentProps {
  expanded: boolean;
  onExpand: Function;
  onCollapse: Function;
  onChange: Function;
  config: Record<string, any>;
  translations: any;
}

export default EquationComponent;
