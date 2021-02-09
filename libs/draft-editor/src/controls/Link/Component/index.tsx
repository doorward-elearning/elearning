import React, { Component, MouseEventHandler } from 'react';
import classNames from 'classnames';
import { getFirstIcon } from '../../../utils/toolbar';
import Option from '../../../components/Option';
import { Dropdown, DropdownOption } from '../../../components/Dropdown';
import './styles.css';
import Icon from '@doorward/ui/components/Icon';
import withModal from '@doorward/ui/hoc/withModal';
import withForm from '@doorward/ui/hoc/withForm';
import { UseModal } from '@doorward/ui/hooks/useModal';
import { UseForm } from '@doorward/ui/hooks/useForm';
import Modal, { ModalFeatures } from '@doorward/ui/components/Modal';
import Form from '@doorward/ui/components/Form';
import TextField from '@doorward/ui/components/Input/TextField';
import Checkbox from '@doorward/ui/components/Input/Checkbox';
import validation from './validation';

interface LayoutComponentProps {
  expanded: boolean;
  doExpand: Function;
  doCollapse: MouseEventHandler;
  onExpandEvent: MouseEventHandler;
  config: Record<string, any>;
  onChange: Function;
  currentState: Record<string, any>;
  translations: any;
  modal: UseModal;
  form: UseForm<any>;
}

class LayoutComponent extends Component<LayoutComponentProps, any> {
  state = {
    showModal: false,
    linkTarget: '',
    linkTitle: '',
    linkTargetOption: this.props.config.defaultTargetOption,
  };

  componentDidUpdate(prevProps) {
    if (prevProps.expanded && !this.props.expanded) {
      this.closeModal();
    }
    const { modal, expanded } = this.props;
    const { showModal } = this.state;

    if (expanded || showModal) {
      modal.openModal();
    } else {
      modal.closeModal();
    }
  }

  removeLink = () => {
    const { onChange } = this.props;
    onChange('unlink');
  };

  addLink = () => {
    const { onChange } = this.props;
    const { linkTitle, linkTarget, linkTargetOption } = this.state;
    onChange('link', linkTitle, linkTarget, linkTargetOption);
  };

  signalExpandShowModal = () => {
    const {
      onExpandEvent,
      currentState: { link, selectionText },
    } = this.props;
    const { linkTargetOption } = this.state;
    onExpandEvent(null);
    this.setState({
      showModal: true,
      linkTarget: (link && link.target) || '',
      linkTargetOption: (link && link.targetOption) || linkTargetOption,
      linkTitle: (link && link.title) || selectionText,
    });
  };

  forceExpandAndShowModal = () => {
    const {
      doExpand,
      currentState: { link, selectionText },
    } = this.props;
    const { linkTargetOption } = this.state;
    doExpand();
    this.setState({
      showModal: true,
      linkTarget: link && link.target,
      linkTargetOption: (link && link.targetOption) || linkTargetOption,
      linkTitle: (link && link.title) || selectionText,
    });
  };

  renderAddLinkModal() {
    const {
      config: { popupClassName },
      doCollapse,
      translations,
      modal,
      form,
    } = this.props;
    const { linkTitle, linkTarget, linkTargetOption } = this.state;
    return (
      <Modal
        useModal={modal}
        cancellable={false}
        features={[
          ModalFeatures.TITLE,
          ModalFeatures.CLOSE_BUTTON_HEADER,
          ModalFeatures.NEGATIVE_BUTTON,
          ModalFeatures.POSITIVE_BUTTON,
        ]}
        onClose={() => doCollapse(null)}
      >
        <Modal.Header title={translations('components_controls_link_link')} />
        <Modal.Body>
          <div className={classNames(popupClassName)}>
            <Form
              validationSchema={validation}
              form={form}
              initialValues={{
                linkTitle,
                linkTarget,
              }}
              onSubmit={(values) => {
                this.setState(values);
                this.addLink();
                this.closeModal();
              }}
            >
              {(formikProps) => (
                <React.Fragment>
                  <TextField
                    name="linkTitle"
                    placeholder={translations('components_controls_link_linkTitle')}
                    overrideValue={
                      formikProps.touched.linkTitle || linkTitle
                        ? formikProps.values.linkTitle
                        : formikProps.values.linkTarget
                    }
                  />
                  <TextField
                    name="linkTarget"
                    placeholder={translations('components_controls_link_linkTarget')}
                    value={linkTarget}
                  />
                  <Checkbox
                    checked={linkTargetOption === '_blank'}
                    placeholder={translations('components_controls_link_linkTargetOption')}
                    name="linkTargetOption"
                    value="_blank"
                  />
                </React.Fragment>
              )}
            </Form>
          </div>
        </Modal.Body>
        <Modal.Footer
          onNegativeClick={this.closeModal}
          onPositiveClick={form.formikProps?.submitForm}
          props={{ positive: { disabled: !form.formikProps?.isValid } }}
          buttons={{ positive: translations('add'), negative: translations('cancel') }}
        />
      </Modal>
    );
  }

  closeModal = () => {
    const { doCollapse } = this.props;
    doCollapse(null);
    this.setState({
      showModal: false,
      linkTarget: '',
      linkTitle: '',
      linkTargetOption: this.props.config.defaultTargetOption,
    });
  };

  renderInFlatList() {
    const {
      config: { options, link, unlink, className },
      currentState,
      translations,
    } = this.props;
    const { showModal } = this.state;
    return (
      <div className={classNames('rdw-link-wrapper', className)} aria-label="rdw-link-control">
        {options.indexOf('link') >= 0 && (
          <Option
            value="unordered-list-item"
            className={classNames(link.className)}
            onClick={this.signalExpandShowModal}
            aria-haspopup="true"
            aria-expanded={showModal}
            title={link.title || translations('components_controls_link_link')}
          >
            <Icon icon={link.icon} />
          </Option>
        )}
        {options.indexOf('unlink') >= 0 && (
          <Option
            disabled={!currentState.link}
            value="ordered-list-item"
            className={classNames(unlink.className)}
            onClick={this.removeLink}
            title={unlink.title || translations('components_controls_link_unlink')}
          >
            <Icon icon={unlink.icon} />
          </Option>
        )}
      </div>
    );
  }

  renderInDropDown() {
    const { expanded, onExpandEvent, doCollapse, doExpand, onChange, config, currentState, translations } = this.props;
    const { options, link, unlink, className, dropdownClassName, title } = config;
    const { showModal } = this.state;
    return (
      <div
        className="rdw-link-wrapper"
        aria-haspopup="true"
        aria-label="rdw-link-control"
        aria-expanded={expanded}
        title={title}
      >
        <Dropdown
          className={classNames('rdw-link-dropdown', className)}
          optionWrapperClassName={classNames(dropdownClassName)}
          onChange={onChange}
          expanded={expanded && !showModal}
          doExpand={doExpand}
          doCollapse={doCollapse}
          onExpandEvent={onExpandEvent}
        >
          <Icon icon={getFirstIcon(config)} />
          {options.indexOf('link') >= 0 && (
            <DropdownOption
              onClick={this.forceExpandAndShowModal}
              className={classNames('rdw-link-dropdownoption', link.className)}
              title={link.title || translations('components_controls_link_link')}
            >
              <Icon icon={link.icon} />
            </DropdownOption>
          )}
          {options.indexOf('unlink') >= 0 && (
            <DropdownOption
              onClick={this.removeLink}
              disabled={!currentState.link}
              className={classNames('rdw-link-dropdownoption', unlink.className)}
              title={unlink.title || translations('components_controls_link_unlink')}
            >
              <Icon icon={unlink.icon} />
            </DropdownOption>
          )}
        </Dropdown>
      </div>
    );
  }

  render() {
    const {
      config: { inDropdown },
    } = this.props;

    return (
      <React.Fragment>
        {inDropdown ? this.renderInDropDown() : this.renderInFlatList()}
        {this.renderAddLinkModal()}
      </React.Fragment>
    );
  }
}

export default withForm('form', withModal('modal', LayoutComponent));
