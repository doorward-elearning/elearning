import React, { Component } from 'react';
import classNames from 'classnames';

import Option from '../../../components/Option';
import './styles.css';
import Icon from '@doorward/ui/components/Icon';
import Modal, { ModalFeatures } from '@doorward/ui/components/Modal';
import { UseModal } from '@doorward/ui/hooks/useModal';
import withModal from '@doorward/ui/hoc/withModal';
import { UseForm } from '@doorward/ui/hooks/useForm';
import withForm from '@doorward/ui/hoc/withForm';
import ImageModal from './ImageModal';

interface LayoutComponentProps {
  expanded: boolean;
  onExpandEvent: Function;
  doCollapse: Function;
  doExpand: Function;
  onChange: Function;
  config: Record<string, any>;
  translations: any;
  modal: UseModal;
  form: UseForm<any>;
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
    const { imgSrc, height, width, alt } = this.state;
    const {
      config: { uploadCallback, uploadEnabled, urlEnabled, previewImage, inputAccept, alt: altConf },
      translations,
      form,
      modal,
    } = this.props;
    return (
      <ImageModal
        form={form}
        onSubmit={(values) => {
          this.setState(values);
          this.addImageFromState();
          modal.closeModal();
        }}
        uploadEnabled={uploadEnabled}
        translations={translations}
        inputAccept={inputAccept}
        uploadCallback={uploadCallback}
        urlEnabled={urlEnabled}
        previewImage={previewImage}
        altConf={altConf}
        initialValues={{
          imgSrc,
          height,
          width,
          alt,
        }}
      />
    );
  };

  render() {
    const {
      config: { icon, className, title, alt: altConf },
      expanded,
      doExpand,
      doCollapse,
      modal,
      form,
      translations,
    } = this.props;

    return (
      <div className="rdw-image-wrapper" aria-haspopup="true" aria-expanded={expanded} aria-label="rdw-image-control">
        <Option
          className={classNames(className)}
          value="unordered-list-item"
          onClick={doExpand}
          title={title || translations('components_controls_image_image')}
        >
          <Icon icon={icon} />
        </Option>

        <Modal
          useModal={modal}
          features={[ModalFeatures.POSITIVE_BUTTON, ModalFeatures.NEGATIVE_BUTTON, ModalFeatures.TITLE]}
          onClose={() => doCollapse()}
        >
          <Modal.Header title={title || translations('components_controls_image_image')} />
          <Modal.Body>{this.RenderAddImageModal()}</Modal.Body>
          <Modal.Footer
            props={{
              positive: { disabled: !form.formikProps?.isValid },
            }}
            buttons={{
              positive: translations('add'),
              negative: translations('cancel'),
            }}
            onPositiveClick={form.formikProps?.submitForm}
            onNegativeClick={() => doCollapse()}
          />
        </Modal>
      </div>
    );
  }
}

export default withForm('form', withModal('modal', LayoutComponent));
