import React, { Component } from 'react';
import classNames from 'classnames';

import Option from '../../../components/Option';
import Spinner from '../../../components/Spinner';
import './styles.css';
import Icon from '@doorward/ui/components/Icon';
import Modal, { ModalFeatures } from '@doorward/ui/components/Modal';
import { UseModal } from '@doorward/ui/hooks/useModal';
import withModal from '@doorward/ui/hoc/withModal';
import TextField, { PlainTextField } from '@doorward/ui/components/Input/TextField';
import Form from '@doorward/ui/components/Form';
import useForm, { UseForm } from '@doorward/ui/hooks/useForm';
import withForm from '@doorward/ui/hoc/withForm';
import FileUploadField from '@doorward/ui/components/Input/FileUploadField';
import validation from './validation';

interface LayoutComponentProps {
  expanded: boolean;
  onExpandEvent: Function;
  doCollapse: Function;
  doExpand: Function;
  onChange: Function;
  config: Record<string, any>;
  translations: Record<string, any>;
  modal: UseModal;
  form: UseForm;
}

class LayoutComponent extends Component<LayoutComponentProps, any> {
  fileUpload: boolean;

  state = {
    imgSrc: '',
    dragEnter: false,
    uploadHighlighted: this.props.config.uploadEnabled && !!this.props.config.uploadCallback,
    showImageLoading: false,
    height: this.props.config.defaultSize.height,
    width: this.props.config.defaultSize.width,
    alt: '',
  };

  componentDidUpdate(prevProps) {
    const { config, expanded, modal } = this.props;
    if (prevProps.expanded && !this.props.expanded) {
      this.setState({
        imgSrc: '',
        dragEnter: false,
        uploadHighlighted: config.uploadEnabled && !!config.uploadCallback,
        showImageLoading: false,
        height: config.defaultSize.height,
        width: config.defaultSize.width,
        alt: '',
      });
    } else if (
      config.uploadCallback !== prevProps.config.uploadCallback ||
      config.uploadEnabled !== prevProps.config.uploadEnabled
    ) {
      this.setState({
        uploadHighlighted: config.uploadEnabled && !!config.uploadCallback,
      });
    }

    if (expanded) {
      modal.openModal();
    } else {
      modal.closeModal();
    }
  }

  onDragEnter = (event) => {
    this.stopPropagation(event);
    this.setState({
      dragEnter: true,
    });
  };

  onImageDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    this.setState({
      dragEnter: false,
    });

    // Check if property name is files or items
    // IE uses 'files' instead of 'items'
    let data;
    let dataIsItems;
    if (event.dataTransfer.items) {
      data = event.dataTransfer.items;
      dataIsItems = true;
    } else {
      data = event.dataTransfer.files;
      dataIsItems = false;
    }
    for (let i = 0; i < data.length; i += 1) {
      if ((!dataIsItems || data[i].kind === 'file') && data[i].type.match('^image/')) {
        const file = dataIsItems ? data[i].getAsFile() : data[i];
        this.uploadImage(file);
      }
    }
  };

  showImageUploadOption = () => {
    this.setState({
      uploadHighlighted: true,
    });
  };

  addImageFromState = () => {
    const { imgSrc, alt } = this.state;
    let { height, width } = this.state;
    const { onChange } = this.props;
    if (!isNaN(height)) {
      height += 'px';
    }
    if (!isNaN(width)) {
      width += 'px';
    }
    onChange(imgSrc, height, width, alt);
  };

  showImageURLOption = () => {
    this.setState({
      uploadHighlighted: false,
    });
  };

  toggleShowImageLoading = () => {
    const showImageLoading = !this.state.showImageLoading;
    this.setState({
      showImageLoading,
    });
  };

  updateValue = (event) => {
    this.setState({
      [`${event.target.name}`]: event.target.value,
    });
  };

  selectImage = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      this.uploadImage(event.target.files[0]);
    }
  };

  uploadImage = (file) => {
    this.toggleShowImageLoading();
    const { uploadCallback } = this.props.config;
    uploadCallback(file)
      .then(({ data }) => {
        this.setState({
          showImageLoading: false,
          dragEnter: false,
          imgSrc: data.link || data.url,
        });
        this.fileUpload = false;
      })
      .catch(() => {
        this.setState({
          showImageLoading: false,
          dragEnter: false,
        });
      });
  };

  fileUploadClick = (event) => {
    this.fileUpload = true;
    event.stopPropagation();
  };

  stopPropagation = (event) => {
    if (!this.fileUpload) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      this.fileUpload = false;
    }
  };

  RenderAddImageModal = () => {
    const { imgSrc, uploadHighlighted, showImageLoading, dragEnter, height, width, alt } = this.state;
    const {
      config: { popupClassName, uploadCallback, uploadEnabled, urlEnabled, previewImage, inputAccept, alt: altConf },
      translations,
      form,
    } = this.props;
    return (
      <div className={classNames(popupClassName)} onClick={this.stopPropagation}>
        <div className="rdw-image-modal-header">
          {uploadEnabled && uploadCallback && (
            <span onClick={this.showImageUploadOption} className="rdw-image-modal-header-option">
              {translations['components.controls.image.fileUpload']}
              <span
                className={classNames('rdw-image-modal-header-label', {
                  'rdw-image-modal-header-label-highlighted': uploadHighlighted,
                })}
              />
            </span>
          )}
          {urlEnabled && (
            <span onClick={this.showImageURLOption} className="rdw-image-modal-header-option">
              {translations['components.controls.image.byURL']}
              <span
                className={classNames('rdw-image-modal-header-label', {
                  'rdw-image-modal-header-label-highlighted': !uploadHighlighted,
                })}
              />
            </span>
          )}
        </div>
        <Form
          form={form}
          initialValues={{
            imgSrc: '',
            height: 'auto',
            width: 'auto',
          }}
          validationSchema={validation}
          onSubmit={() => {}}
        >
          {uploadHighlighted ? (
            <FileUploadField name="imgSrc" placeholder="File" />
          ) : (
            <div className="rdw-image-modal-url-section">
              <TextField
                className="rdw-image-modal-url-input"
                placeholder={'URL' || translations['components.controls.image.enterlink']}
                name="imgSrc"
                fluid
                required
                onChange={this.updateValue}
                onBlur={this.updateValue}
                value={imgSrc}
              />
            </div>
          )}
          {altConf.present && (
            <div className="rdw-image-modal-size">
              <span className="rdw-image-modal-alt-lbl">Alt Text</span>
              <TextField
                onChange={this.updateValue}
                onBlur={this.updateValue}
                value={alt}
                name="alt"
                required
                className="rdw-image-modal-alt-input"
                placeholder="alt"
              />
            </div>
          )}
          <div className="rdw-image-modal-size">
            <TextField
              onChange={this.updateValue}
              onBlur={this.updateValue}
              value={height}
              required
              name="height"
              className="rdw-image-modal-size-input"
              placeholder="Height"
            />
            <TextField
              onChange={this.updateValue}
              required
              onBlur={this.updateValue}
              value={width}
              name="width"
              className="rdw-image-modal-size-input"
              placeholder="Width"
            />
          </div>
          {showImageLoading ? (
            <div className="rdw-image-modal-spinner">
              <Spinner />
            </div>
          ) : undefined}
        </Form>
      </div>
    );
  };

  render() {
    const {
      config: { icon, className, title, alt: altConf },
      expanded,
      doExpand,
      doCollapse,
      modal,
      translations,
    } = this.props;

    const { imgSrc, height, width, alt } = this.state;
    return (
      <div className="rdw-image-wrapper" aria-haspopup="true" aria-expanded={expanded} aria-label="rdw-image-control">
        <Option
          className={classNames(className)}
          value="unordered-list-item"
          onClick={doExpand}
          title={title || translations['components.controls.image.image']}
        >
          <Icon icon={icon} />
        </Option>

        <Modal
          useModal={modal}
          features={[ModalFeatures.POSITIVE_BUTTON, ModalFeatures.NEGATIVE_BUTTON, ModalFeatures.TITLE]}
          onClose={() => doCollapse()}
        >
          <Modal.Header title={title || translations['components.controls.image.image']} />
          <Modal.Body>{this.RenderAddImageModal()}</Modal.Body>
          <Modal.Footer
            props={{
              positive: { disabled: !imgSrc || !height || !width || (altConf.mandatory && !alt) },
            }}
            buttons={{
              positive: translations['generic.add'],
              negative: translations['generic.cancel'],
            }}
            onPositiveClick={this.addImageFromState}
            onNegativeClick={() => doCollapse()}
          />
        </Modal>
      </div>
    );
  }
}

export default withForm('form', withModal('modal', LayoutComponent));
