import React, { Component, MouseEvent, MouseEventHandler } from 'react';
import ReactDOM from 'react-dom';
import './Modal.scss';
import Feature from '../FeatureProvider/Feature';
import Icon from '../Icon';
import FeatureProvider from '../FeatureProvider';
import Header from '../Header';
import classNames from 'classnames';
import Button, { ButtonProps } from '../Buttons/Button';
import IfElse from '../IfElse';
import { UseModal } from '../../hooks/useModal';
import NavBarSearch from '../NavBar/NavBarSearch';
import Container from '@doorward/ui/components/Container';

export enum ModalFeatures {
  CLOSE_BUTTON_HEADER = 1,
  TITLE = 2,
  POSITIVE_BUTTON = 3,
  NEUTRAL_BUTTON = 4,
  NEGATIVE_BUTTON = 5,
  CLOSE_BUTTON_FOOTER = 6,
  SEARCH_BAR = 7,
}

const DEFAULT_FEATURES = [ModalFeatures.CLOSE_BUTTON_HEADER, ModalFeatures.TITLE];

const ModalContext = React.createContext<ModalContext>({
  isOpen: false,
  openModal: () => {},
  closeModal: () => {},
  cancellable: true,
});

const ModalHeader: React.FunctionComponent<ModalHeaderProps> = (props) => {
  return (
    <ModalContext.Consumer>
      {({ closeModal, cancellable }): JSX.Element => (
        <div className="ed-modal__content__headerContainer">
          <div className="ed-modal__content__header">
            <Feature feature={ModalFeatures.TITLE}>{props.title && <Header size={2}>{props.title}</Header>}</Feature>
            {props.children}
            <IfElse condition={cancellable}>
              <Feature feature={ModalFeatures.CLOSE_BUTTON_HEADER}>
                <Icon icon="close" onClick={closeModal} />
              </Feature>
            </IfElse>
          </div>
          <Feature feature={ModalFeatures.SEARCH_BAR}>
            <div className="ed-modal__content__header--searchBar">
              <NavBarSearch onSearch={props.onSearch} />
            </div>
          </Feature>
        </div>
      )}
    </ModalContext.Consumer>
  );
};

const Body: React.FunctionComponent<ModalBodyProps> = (props) => {
  return <div className="ed-modal__content__body">{props.children}</div>;
};

const ModalFooterButton: React.FunctionComponent<ModalFooterButtonProps> = ({ feature, children, props, onClick }) => {
  return (
    <Feature feature={feature}>
      <Button {...props} onClick={(e): void => onClick(feature, e)}>
        {children}
      </Button>
    </Feature>
  );
};

const Footer: React.FunctionComponent<ModalFooterProps> = ({
  buttons = { positive: 'Yes', negative: 'No', neutral: 'Cancel' },
  props = { positive: {}, negative: {}, neutral: {} },
  children,
  onNegativeClick,
  onNeutralClick,
  onPositiveClick,
}) => {
  const handleClick = (button: ModalButtons, e: MouseEvent): void => {
    if (button === ModalFeatures.POSITIVE_BUTTON && onPositiveClick) {
      onPositiveClick(e);
    } else if (button === ModalFeatures.NEUTRAL_BUTTON && onNeutralClick) {
      onNeutralClick(e);
    } else if (button === ModalFeatures.NEGATIVE_BUTTON && onNegativeClick) {
      onNegativeClick(e);
    }
  };
  return (
    <ModalContext.Consumer>
      {({ closeModal }): JSX.Element => (
        <div className="ed-modal__content__footer">
          <div className="ed-modal__content__footer__buttons">
            <div className="no-action-buttons">
              <ModalFooterButton
                props={{ ...props.neutral, theme: 'default', className: 'neutral_button' }}
                onClick={handleClick}
                feature={ModalFeatures.NEUTRAL_BUTTON}
              >
                {buttons.neutral}
              </ModalFooterButton>
              <Feature feature={ModalFeatures.CLOSE_BUTTON_FOOTER}>
                <Button theme="default" className="neutral_button" onClick={closeModal}>
                  Close
                </Button>
              </Feature>
            </div>
            <div className="action-buttons">
              <ModalFooterButton
                props={{ ...props.negative, theme: 'primary', className: 'negative_button' }}
                onClick={handleClick}
                feature={ModalFeatures.NEGATIVE_BUTTON}
              >
                {buttons.negative}
              </ModalFooterButton>
              <ModalFooterButton
                props={{ ...props.positive, theme: 'success', className: 'positive_button' }}
                onClick={handleClick}
                feature={ModalFeatures.POSITIVE_BUTTON}
              >
                {buttons.positive}
              </ModalFooterButton>
            </div>
          </div>
          {children}
        </div>
      )}
    </ModalContext.Consumer>
  );
};

export interface ModalProps {
  features?: Array<ModalFeatures | string | typeof ModalFeatures>;
  useModal: UseModal;
  cancellable?: boolean;
  className?: string;
  blurBackground?: boolean;
  bottomSheet?: boolean;
}

export interface ModalHeaderProps {
  title?: string;
  onSearch?: (search: string) => void;
}
export interface ModalBodyProps {}
export interface ModalFooterProps {
  buttons?: { positive?: string; negative?: string; neutral?: string };
  props?: { positive?: ButtonProps; negative?: ButtonProps; neutral?: ButtonProps };
  onPositiveClick?: MouseEventHandler;
  onNegativeClick?: MouseEventHandler;
  onNeutralClick?: MouseEventHandler;
}

export type ModalFooterButtonClickHandler = (which: ModalButtons, event: MouseEvent) => void;

export type ModalButtons = ModalFeatures.POSITIVE_BUTTON | ModalFeatures.NEGATIVE_BUTTON | ModalFeatures.NEUTRAL_BUTTON;

export interface ModalFooterButtonProps {
  feature: ModalButtons;
  props: ButtonProps;
  onClick: ModalFooterButtonClickHandler;
}

export interface ModalContext {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  cancellable: boolean;
}

class Modal extends Component<ModalProps> {
  state = {
    visible: false,
  };

  modal = React.createRef<HTMLDivElement>();

  container = document.getElementById('modal-box');

  componentWillUnmount(): void {}

  componentWillReceiveProps(nextProps: Readonly<ModalProps>): void {
    const { useModal, blurBackground = true } = nextProps;
    this.setState({
      visible: useModal.isOpen,
    });

    if (blurBackground) {
      document.getElementById('root').style.filter = useModal.isOpen ? 'blur(2px)' : '';
    }
  }

  render() {
    const { features = [], children, useModal, cancellable = true, ...props } = this.props;
    const { visible } = this.state;

    return ReactDOM.createPortal(
      <FeatureProvider features={[...features, ...DEFAULT_FEATURES]}>
        <ModalContext.Provider value={{ ...useModal, cancellable }}>
          <div
            ref={this.modal}
            className={classNames({
              'ed-modal': true,
              open: visible,
              bottomSheet: props.bottomSheet,
              [props.className || '']: true,
            })}
          >
            <div className="ed-modal__background" onClick={() => cancellable && useModal.closeModal()} />
            <div className="ed-modal__content">
              <Container>{children}</Container>
            </div>
          </div>
        </ModalContext.Provider>
      </FeatureProvider>,
      this.container
    );
  }

  static Body = Body;
  static Footer = Footer;
  static Header = ModalHeader;
}

export default Modal;
