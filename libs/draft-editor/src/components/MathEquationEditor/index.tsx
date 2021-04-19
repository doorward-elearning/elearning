import React from 'react';
import Modal, { ModalFeatures } from '@doorward/ui/components/Modal';
import './MathEquationEditor.scss';
import withModal from '@doorward/ui/hoc/withModal';
import { UseModal } from '@doorward/ui/hooks/useModal';
import EquationEditor from 'equation-editor-react';

class MathEquationEditor extends React.Component<MathEquationEditorProps> {
  state = {
    value: '',
  };

  componentDidMount() {
    this.setState({
      value: this.props.value,
    });
  }

  componentDidUpdate(prevProps: Readonly<MathEquationEditorProps>, prevState: Readonly<{}>, snapshot?: any) {
    const { open, modal } = this.props;

    if (open) {
      modal.openModal();
    } else {
      modal.closeModal();
    }
  }

  componentWillReceiveProps(nextProps: Readonly<MathEquationEditorProps>, nextContext: any) {
    if (nextProps.value !== this.state.value) {
      this.setState({
        value: nextProps.value,
      });
    }
  }

  render(): JSX.Element {
    const { translations, autoCommands, title, autoOperatorNames, onClose, onSubmit, modal } = this.props;

    const { value } = this.state;
    return (
      <Modal
        useModal={modal}
        features={[ModalFeatures.POSITIVE_BUTTON, ModalFeatures.NEGATIVE_BUTTON, ModalFeatures.TITLE]}
        onClose={onClose}
      >
        <Modal.Header title={title} />
        <Modal.Body>
          <div className="ed-math-editor">
            <EquationEditor
              autoCommands={autoCommands}
              autoOperatorNames={autoOperatorNames}
              onChange={(equation) => {
                this.setState({
                  value: equation,
                });
              }}
              value={value}
            />
            {!value && <span className="ed-math-editor__placeholder">{translations('enterEquationHere')}</span>}
          </div>
        </Modal.Body>
        <Modal.Footer
          props={{ positive: { disabled: !value } }}
          buttons={{ positive: translations('add'), negative: translations('cancel') }}
          onPositiveClick={() => onSubmit(value)}
          onNegativeClick={onClose}
        />
      </Modal>
    );
  }
}

export interface MathEquationEditorProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (equation: string) => void;
  translations: any;
  modal: UseModal;
  autoCommands: string;
  autoOperatorNames: string;
  value?: string;
  title: string;
}

export default withModal('modal', MathEquationEditor);
