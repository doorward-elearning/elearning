import React from 'react';
import './styles.css';
import { UseModal } from '@doorward/ui/hooks/useModal';
import withModal from '@doorward/ui/hoc/withModal';
import Option from '../../../components/Option';
import classNames from 'classnames';
import Icon from '@doorward/ui/components/Icon';
import Modal, { ModalFeatures } from '@doorward/ui/components/Modal';

class EquationComponent extends React.Component<EquationComponentProps> {
  state = {
    value: '',
  };

  submitEquation = () => {
    const { onChange } = this.props;
    onChange();
  };

  componentDidUpdate(prevProps: Readonly<EquationComponentProps>, prevState: Readonly<{}>, snapshot?: any) {
    const { expanded, modal, config } = this.props;

    if (expanded) {
      modal.openModal();
    } else {
      modal.closeModal();
    }
  }

  render(): JSX.Element {
    const {
      config: { icon, className, title, autoCommands, autoOperatorNames },
      expanded,
      onExpand,
      onCollapse,
      modal,
      translations,
    } = this.props;

    const { value } = this.state;

    return (
      <div className={classNames('rdw-equation-wrapper')} aria-expanded={expanded}>
        <Option
          className={classNames(className)}
          onClick={onExpand}
          title={title || translations('components_controls_equation_equation')}
        >
          <Icon icon={icon} />
        </Option>
        <Modal
          useModal={modal}
          features={[ModalFeatures.POSITIVE_BUTTON, ModalFeatures.NEGATIVE_BUTTON, ModalFeatures.TITLE]}
          onClose={() => onCollapse()}
        >
          <Modal.Header title={title || translations('components_controls_equation_equation')} />
          <Modal.Body></Modal.Body>
          <Modal.Footer
            buttons={{ positive: translations('add'), negative: translations('cancel') }}
            onPositiveClick={this.submitEquation}
            onNegativeClick={() => onCollapse()}
          />
        </Modal>
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
  modal: UseModal;
}

export default withModal('modal', EquationComponent);
