import React, { useEffect, useState } from 'react';
import './Modal.scss';
import Feature from '../FeatureProvider/Feature';
import Icon from '../Icon';
import FeatureProvider from '../FeatureProvider';
import Header from '../Header';
import useClickOutside from '../../hooks/useClickOutside';
import classNames from 'classnames';
import { UseModal } from '../../hooks/useModal';

export enum ModalFeatures {
  CLOSE_BUTTON = 1,
  TITLE = 2,
}

const DEFAULT_FEATURES = [ModalFeatures.CLOSE_BUTTON, ModalFeatures.TITLE];

const ModalContext = React.createContext<UseModal>({
  isOpen: false,
  openModal: () => {},
  closeModal: () => {},
});

const Modal: ModalComponent = ({ features = [], children, useModal }) => {
  const overlay = React.useRef(null);

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
          <Feature feature={ModalFeatures.CLOSE_BUTTON}>
            <Header size={2}>{props.title}</Header>
          </Feature>
          {props.children}
          <Feature feature={ModalFeatures.CLOSE_BUTTON}>
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

const Footer: React.FunctionComponent<ModalFooterProps> = props => {
  return <div className="ed-modal__content__footer">{props.children}</div>;
};

export interface ModalProps {
  features?: Array<ModalFeatures | string | typeof ModalFeatures>;
  useModal: UseModal;
}
export interface ModalHeaderProps {
  title?: string;
}
export interface ModalBodyProps {}
export interface ModalFooterProps {}

export interface ModalComponent extends React.FunctionComponent<ModalProps> {
  Header: React.FunctionComponent<ModalHeaderProps>;
  Body: React.FunctionComponent<ModalBodyProps>;
  Footer: React.FunctionComponent<ModalFooterProps>;
}

Modal.Body = Body;
Modal.Footer = Footer;
Modal.Header = ModalHeader;

export default Modal;
