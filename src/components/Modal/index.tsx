import React, { MouseEvent } from 'react';
import './Modal.scss';
import Feature from '../FeatureProvider/Feature';
import Icon from '../Icon';
import FeatureProvider from '../FeatureProvider';
import Header from '../Header';
import useClickOutside from '../../hooks/useClickOutside';
import classNames from 'classnames';
import { UseModal } from '../../hooks/useModal';
import Button, { ButtonProps } from '../Buttons/Button';

export enum ModalFeatures {
  CLOSE_BUTTON_HEADER = 1,
  TITLE = 2,
  POSITIVE_BUTTON = 3,
  NEUTRAL_BUTTON = 4,
  NEGATIVE_BUTTON = 5,
  CLOSE_BUTTON_FOOTER = 6,
}

const DEFAULT_FEATURES = [ModalFeatures.CLOSE_BUTTON_HEADER, ModalFeatures.TITLE];

const ModalContext = React.createContext<UseModal>({
  isOpen: false,
  openModal: () => {},
  closeModal: () => {},
});

const Modal: ModalComponent = ({ features = [], children, useModal }) => {
  const overlay: any = React.useRef(null);

  useClickOutside(() => {
    if (useModal.isOpenRef && useModal.isOpenRef.current) {
      useModal.closeModal();
    }
  }, overlay);

  return (
    <FeatureProvider features={[...features, ...DEFAULT_FEATURES]}>
      <ModalContext.Provider value={useModal}>
        <div
          className={classNames({
            'ed-modal': true,
            open: useModal.isOpen,
          })}
        >
          <div className="ed-modal__background" />
          <div className="ed-modal__content" ref={overlay}>
            {children}
          </div>
        </div>
      </ModalContext.Provider>
    </FeatureProvider>
  );
};

const ModalHeader: React.FunctionComponent<ModalHeaderProps> = props => {
  return (
    <ModalContext.Consumer>
      {({ closeModal }): JSX.Element => (
        <div className="ed-modal__content__header">
          <Feature feature={ModalFeatures.TITLE}>
            <Header size={2}>{props.title}</Header>
          </Feature>
          {props.children}
          <Feature feature={ModalFeatures.CLOSE_BUTTON_HEADER}>
            <Icon icon="close" onClick={closeModal} />
          </Feature>
        </div>
      )}
    </ModalContext.Consumer>
  );
};

const Body: React.FunctionComponent<ModalBodyProps> = props => {
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
  onClick,
}) => {
  const handleClick = (button: ModalButtons, e: MouseEvent): void => {
    onClick && onClick(button, e);
  };
  return (
    <ModalContext.Consumer>
      {({ closeModal }): JSX.Element => (
        <div className="ed-modal__content__footer">
          <div className="ed-modal__content__footer__buttons">
            <div className="action-buttons">
              <ModalFooterButton
                props={{ ...props.positive, theme: 'success', className: 'positive_button' }}
                onClick={handleClick}
                feature={ModalFeatures.POSITIVE_BUTTON}
              >
                {buttons.positive}
              </ModalFooterButton>
              <ModalFooterButton
                props={{ ...props.negative, theme: 'primary', className: 'negative_button' }}
                onClick={handleClick}
                feature={ModalFeatures.NEGATIVE_BUTTON}
              >
                {buttons.negative}
              </ModalFooterButton>
            </div>
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
}
export interface ModalHeaderProps {
  title?: string;
}
export interface ModalBodyProps {}
export interface ModalFooterProps {
  buttons?: { positive?: string; negative?: string; neutral?: string };
  props?: { positive?: ButtonProps; negative?: ButtonProps; neutral?: ButtonProps };
  onClick?: ModalFooterButtonClickHandler;
}

export type ModalButtons = ModalFeatures.POSITIVE_BUTTON | ModalFeatures.NEGATIVE_BUTTON | ModalFeatures.NEUTRAL_BUTTON;
export interface ModalFooterButtonProps {
  feature: ModalButtons;
  onClick: ModalFooterButtonClickHandler;
  props: ButtonProps;
}
export type ModalFooterButtonClickHandler = (which: ModalButtons, event: MouseEvent) => void;

export interface ModalComponent extends React.FunctionComponent<ModalProps> {
  Header: React.FunctionComponent<ModalHeaderProps>;
  Body: React.FunctionComponent<ModalBodyProps>;
  Footer: React.FunctionComponent<ModalFooterProps>;
}

Modal.Body = Body;
Modal.Footer = Footer;
Modal.Header = ModalHeader;

export default Modal;
