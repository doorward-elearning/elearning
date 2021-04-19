import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Draft, {
  CompositeDecorator,
  convertFromRaw,
  convertToRaw,
  DefaultDraftBlockRenderMap,
  Editor,
  EditorState,
  getDefaultKeyBinding,
  Modifier,
  RichUtils,
} from 'draft-js';
import {
  blockRenderMap,
  changeDepth,
  extractInlineStyle,
  getCustomStyleMap,
  getSelectedBlocksType,
  handleNewLine,
} from 'draftjs-utils';
import classNames from 'classnames';
import ModalHandler from '../event-handler/modals';
import FocusHandler from '../event-handler/focus';
import KeyDownHandler from '../event-handler/keyDown';
import SuggestionHandler from '../event-handler/suggestions';
import blockStyleFn from '../utils/BlockStyle';
import { mergeRecursive } from '../utils/toolbar';
import { filter, hasProperty } from '../utils/common';
import { handlePastedText } from '../utils/handlePaste';
import Controls from '../controls';
import getLinkDecorator from '../decorators/Link';
import getMentionDecorators from '../decorators/Mention';
import getHashtagDecorator from '../decorators/HashTag';
import defaultToolbar from '../config/defaultToolbar';
import './styles.css';
import '../../css/Draft.css';
import customHTML2Content from '../utils/customHTMLToContent';
import { Map } from 'immutable';
import getCurrentBlock from '../utils/getCurrentBlock';
import addNewBlock from '../utils/addNewBlock';
import { UploadHandler } from '@doorward/ui/components/Input/FileUploadField';
import translate from '@doorward/common/lang/translate';
import texContent from '../data/texContent';
import { removeTeXBlock } from '../utils/removeTeXBlock';
import getImageComponent from '../renderer/Image';
import Embedded from '../renderer/Embedded';
import TeXBlock from '../components/KatexOutput';

export type SyntheticKeyboardEvent = React.KeyboardEvent<{}>;
export type SyntheticEvent = React.SyntheticEvent<{}>;
export type RawDraftContentState = Draft.RawDraftContentState;

export class ContentState extends Draft.ContentState {}
export class ContentBlock extends Draft.ContentBlock {}
export class SelectionState extends Draft.SelectionState {}

export interface EditorProps {
  webDriverTestID?: string;
  onChange?(contentState: RawDraftContentState): void;
  onEditorStateChange?(editorState: EditorState, wrapperId?: number): void;
  onContentStateChange?(contentState: RawDraftContentState): void;
  initialContentState?: RawDraftContentState;
  defaultContentState?: RawDraftContentState;
  fullScreenParent?: HTMLElement;
  contentState?: RawDraftContentState;
  editorState?: EditorState;
  defaultEditorState?: EditorState;
  toolbarOnFocus?: boolean;
  spellCheck?: boolean;
  stripPastedStyles?: boolean;
  toolbar?: Record<string, any>;
  toolbarCustomButtons?: Array<React.ReactElement<HTMLElement>>;
  toolbarClassName?: string;
  toolbarHidden?: boolean;
  locale?: string;
  localization?: Record<string, any>;
  editorClassName?: string;
  wrapperClassName?: string;
  toolbarStyle?: object;
  editorStyle?: React.CSSProperties;
  wrapperStyle?: React.CSSProperties;
  uploadCallback?: UploadHandler;
  onFocus?(event: SyntheticEvent): void;
  onBlur?(event: SyntheticEvent, editorState?: any): void;
  onTab?(event: SyntheticKeyboardEvent): any;
  mention?: Record<string, any>;
  hashtag?: Record<string, any>;
  textAlignment?: string;
  readOnly?: boolean;
  tabIndex?: number;
  placeholder?: string;
  ariaLabel?: string;
  ariaOwneeID?: string;
  ariaActiveDescendantID?: string;
  ariaAutoComplete?: string;
  ariaDescribedBy?: string;
  ariaExpanded?: string;
  ariaHasPopup?: string;
  customBlockRenderFunc?(block: ContentBlock): any;
  wrapperId?: number;
  customDecorators?: object[];
  editorRef?(ref: object): void;
  handlePastedText?(
    text: string,
    html: string,
    editorState: EditorState,
    onChange: (editorState: EditorState) => void
  ): boolean;
  customStyleMap?: object;
}

class WysiwygEditor extends Component<EditorProps, any> {
  private wrapperId: string;
  private modalHandler: ModalHandler;
  private focusHandler: FocusHandler;
  private blockRendererFn: any;
  private editorProps: any;
  private customStyleMap: any;
  private compositeDecorator: any;
  private wrapper: any;
  private editor: any;
  private blockRenderMap: any;
  private extendedBlockRenderMap: any;

  constructor(props) {
    super(props);
    const toolbar = mergeRecursive(defaultToolbar, props.toolbar);
    const wrapperId = props.wrapperId ? props.wrapperId : Math.floor(Math.random() * 10000);
    this.wrapperId = `rdw-wrapper-${wrapperId}`;
    this.modalHandler = new ModalHandler();
    this.focusHandler = new FocusHandler();
    this.blockRendererFn = this.getBlockRenderFunc(
      {
        isReadOnly: this.isReadOnly,
        isImageAlignmentEnabled: this.isImageAlignmentEnabled,
        getEditorState: this.getEditorState,
        onChange: this.onChange,
      },
      props.customBlockRenderFunc
    );
    this.editorProps = this.filterEditorProps(props);
    this.customStyleMap = this.getStyleMap(props);
    this.compositeDecorator = this.getCompositeDecorator(toolbar);
    const editorState = this.createEditorState(this.compositeDecorator);
    extractInlineStyle(editorState);
    this.state = {
      editorState,
      editorFocused: false,
      toolbar,
      fullScreen: false,
      liveTeXEdits: Map(),
    };

    this.blockRenderMap = Map({
      image: {
        element: 'figure',
      },
      video: {
        element: 'figure',
      },
      embed: {
        element: 'div',
      },
      unstyled: {
        wrapper: null,
        element: 'div',
        aliasedElements: ['p'],
      },
      paragraph: {
        wrapper: null,
        element: 'div',
        aliasedElements: ['p'],
      },
      placeholder: {
        wrapper: null,
        element: 'div',
      },
      'code-block': {
        element: 'pre',
        wrapper: null,
      },
    });

    this.extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(this.blockRenderMap);
  }

  _removeTeX = (blockKey) => {
    const { editorState, liveTeXEdits } = this.state;
    this.setState({
      liveTeXEdits: liveTeXEdits.remove(blockKey),
      editorState: removeTeXBlock(editorState, blockKey),
    });
  };

  componentDidMount() {}
  // todo: change decorators depending on properties recceived in componentWillReceiveProps.

  componentDidUpdate(prevProps) {
    if (prevProps === this.props) return;
    const newState: any = {};
    const { editorState, contentState } = this.props;
    if (!this.state.toolbar) {
      newState.toolbar = mergeRecursive(defaultToolbar, this.state.toolbar);
    }
    if (hasProperty(this.props, 'editorState') && editorState !== prevProps.editorState) {
      if (editorState) {
        newState.editorState = EditorState.set(editorState, {
          decorator: this.compositeDecorator,
        });
      } else {
        newState.editorState = EditorState.createEmpty(this.compositeDecorator);
      }
    } else if (hasProperty(this.props, 'contentState') && contentState !== prevProps.contentState) {
      if (contentState) {
        const newEditorState = this.changeEditorState(contentState);
        if (newEditorState) {
          newState.editorState = newEditorState;
        }
      } else {
        newState.editorState = EditorState.createEmpty(this.compositeDecorator);
      }
    }
    if (prevProps.editorState !== editorState || prevProps.contentState !== contentState) {
      extractInlineStyle(newState.editorState);
    }
    if (Object.keys(newState).length) this.setState(newState);
    this.editorProps = this.filterEditorProps(this.props);
    this.customStyleMap = this.getStyleMap(this.props);
  }

  onEditorBlur = () => {
    this.setState({
      editorFocused: false,
    });
  };

  onEditorFocus = (event) => {
    const { onFocus } = this.props;
    this.setState({
      editorFocused: true,
    });
    const editFocused = this.focusHandler.isEditorFocused();
    if (onFocus && editFocused) {
      onFocus(event);
    }
  };

  onEditorMouseDown = () => {
    this.focusHandler.onEditorMouseDown();
  };

  keyBindingFn = (event) => {
    if (event.key === 'Tab') {
      const { onTab } = this.props;
      if (!onTab || !onTab(event)) {
        const editorState = changeDepth(this.state.editorState, event.shiftKey ? -1 : 1, 4);
        if (editorState && editorState !== this.state.editorState) {
          this.onChange(editorState);
          event.preventDefault();
        }
      }
      return null;
    }
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      if (SuggestionHandler.isOpen()) {
        event.preventDefault();
      }
    }
    return getDefaultKeyBinding(event);
  };

  onToolbarFocus = (event) => {
    const { onFocus } = this.props;
    if (onFocus && this.focusHandler.isToolbarFocused()) {
      onFocus(event);
    }
  };

  onWrapperBlur = (event) => {
    const { onBlur } = this.props;
    if (onBlur && this.focusHandler.isEditorBlur(event)) {
      onBlur(event, this.getEditorState());
    }
  };

  componentWillReceiveProps(nextProps: Readonly<EditorProps>, nextContext: any): void {
    this.blockRendererFn = this.getBlockRenderFunc(
      {
        isReadOnly: this.isReadOnly,
        isImageAlignmentEnabled: this.isImageAlignmentEnabled,
        getEditorState: this.getEditorState,
        onChange: this.onChange,
      },
      this.props.customBlockRenderFunc
    );
  }

  getBlockRenderFunc = (config, customBlockRenderer) => (block: ContentBlock) => {
    if (typeof customBlockRenderer === 'function') {
      const renderedComponent = customBlockRenderer(block, config, config.getEditorState);
      if (renderedComponent) return renderedComponent;
    }

    if (block.getType() === 'atomic') {
      const contentState = config.getEditorState().getCurrentContent();
      const entity = block.getEntityAt(0) ? contentState.getEntity(block.getEntityAt(0)) : null;
      if (entity && entity.type === 'IMAGE') {
        return {
          component: getImageComponent(config),
          editable: false,
        };
      } else if (entity && entity.type === 'EMBEDDED_LINK') {
        return {
          component: Embedded,
          editable: false,
        };
      } else if (entity && entity.type === 'TOKEN') {
        return {
          component: TeXBlock,
          editable: false,
          props: {
            onStartEdit: (blockKey) => {
              const { liveTeXEdits } = this.state;
              this.setState({ liveTeXEdits: liveTeXEdits.set(blockKey, true) });
            },
            onFinishEdit: (blockKey, newContentState) => {
              const { liveTeXEdits } = this.state;
              this.setState({
                liveTeXEdits: liveTeXEdits.remove(blockKey),
                editorState: EditorState.createWithContent(newContentState),
              });
            },
            onRemove: (blockKey) => this._removeTeX(blockKey),
            translations: translate,
            autoCommands: this.state.toolbar?.equation?.autoCommands || '',
            autoOperatorNames: this.state.toolbar?.equation?.autoOperatorNames || '',
            title: this.state.toolbar?.equation?.title || translate('components_controls_equation_equation'),
          },
        };
      }
    }
    return undefined;
  };

  onFullScreenChanged = () => {
    this.setState((prevState) => ({
      fullScreen: !prevState.fullScreen,
    }));
  };

  onChange = (editorState) => {
    const { readOnly, onEditorStateChange } = this.props;
    if (!readOnly && !(getSelectedBlocksType(editorState) === 'atomic' && editorState.getSelection().isCollapsed)) {
      if (onEditorStateChange) {
        onEditorStateChange(editorState, this.props.wrapperId);
      }
      if (!hasProperty(this.props, 'editorState')) {
        this.setState({ editorState }, () => this.afterChange(editorState));
      } else {
        this.afterChange(editorState);
      }
    }
  };

  setWrapperReference = (ref) => {
    this.wrapper = ref;
  };

  setEditorReference = (ref) => {
    if (ref) {
      if (this.props.editorRef) {
        this.props.editorRef(ref);
      }
      this.editor = ref;
    }
  };

  getCompositeDecorator = (toolbar) => {
    const decorators = [
      ...this.props.customDecorators,
      getLinkDecorator({
        showOpenOptionOnHover: toolbar.link.showOpenOptionOnHover,
      }),
    ];
    if (this.props.mention) {
      decorators.push(
        ...getMentionDecorators({
          ...this.props.mention,
          onChange: this.onChange,
          getEditorState: this.getEditorState,
          getSuggestions: this.getSuggestions,
          getWrapperRef: this.getWrapperRef,
          modalHandler: this.modalHandler,
        })
      );
    }
    if (this.props.hashtag) {
      decorators.push(getHashtagDecorator(this.props.hashtag));
    }
    return new CompositeDecorator(decorators as any);
  };

  getWrapperRef = () => this.wrapper;

  getEditorState = () => (this.state ? this.state.editorState : EditorState.createWithContent(texContent));

  getSuggestions = () => this.props.mention && this.props.mention.suggestions;

  afterChange = (editorState) => {
    setTimeout(() => {
      const { onChange, onContentStateChange } = this.props;
      if (onChange) {
        onChange(convertToRaw(editorState.getCurrentContent()));
      }
      if (onContentStateChange) {
        onContentStateChange(convertToRaw(editorState.getCurrentContent()));
      }
    });
  };

  isReadOnly = () => this.props.readOnly;

  isImageAlignmentEnabled = () => this.state.toolbar.image.alignmentEnabled;

  createEditorState = (compositeDecorator) => {
    let editorState;
    if (hasProperty(this.props, 'editorState')) {
      if (this.props.editorState) {
        editorState = EditorState.set(this.props.editorState, {
          decorator: compositeDecorator,
        });
      }
    } else if (hasProperty(this.props, 'defaultEditorState')) {
      if (this.props.defaultEditorState) {
        editorState = EditorState.set(this.props.defaultEditorState, {
          decorator: compositeDecorator,
        });
      }
    } else if (hasProperty(this.props, 'contentState')) {
      if (this.props.contentState) {
        const contentState = convertFromRaw(this.props.contentState);
        editorState = EditorState.createWithContent(contentState, compositeDecorator);
        editorState = EditorState.moveSelectionToEnd(editorState);
      }
    } else if (hasProperty(this.props, 'defaultContentState') || hasProperty(this.props, 'initialContentState')) {
      let contentState: any = this.props.defaultContentState || this.props.initialContentState;
      if (contentState) {
        contentState = convertFromRaw(contentState);
        editorState = EditorState.createWithContent(contentState, compositeDecorator);
        editorState = EditorState.moveSelectionToEnd(editorState);
      }
    }
    if (!editorState) {
      editorState = EditorState.createEmpty(compositeDecorator);
    }
    return editorState;
  };

  filterEditorProps = (props) =>
    filter(props, [
      'onChange',
      'onEditorStateChange',
      'onContentStateChange',
      'initialContentState',
      'defaultContentState',
      'contentState',
      'editorState',
      'defaultEditorState',
      'locale',
      'localization',
      'toolbarOnFocus',
      'toolbar',
      'toolbarCustomButtons',
      'toolbarClassName',
      'editorClassName',
      'toolbarHidden',
      'wrapperClassName',
      'toolbarStyle',
      'editorStyle',
      'wrapperStyle',
      'uploadCallback',
      'onFocus',
      'onBlur',
      'onTab',
      'mention',
      'hashtag',
      'ariaLabel',
      'customBlockRenderFunc',
      'customDecorators',
      'handlePastedText',
      'customStyleMap',
    ]);

  getStyleMap = (props) => ({ ...getCustomStyleMap(), ...props.customStyleMap });

  changeEditorState = (contentState) => {
    const newContentState = convertFromRaw(contentState);
    let { editorState } = this.state;
    editorState = EditorState.push(editorState, newContentState, 'insert-characters');
    editorState = EditorState.moveSelectionToEnd(editorState);
    return editorState;
  };

  focusEditor = () => {
    setTimeout(() => {
      if (this.editor) {
        this.editor.focus();
      }
    }, 300);
  };

  handleKeyCommand = (command) => {
    const {
      editorState,
      toolbar: { inline },
    } = this.state;
    if (inline && inline.options.indexOf(command) >= 0) {
      const newState = RichUtils.handleKeyCommand(editorState, command);
      if (newState) {
        this.onChange(newState);
        return true;
      }
    }
    return false;
  };

  handleReturn = (event) => {
    if (SuggestionHandler.isOpen()) {
      return true;
    }
    const { editorState } = this.state;
    const newEditorState = handleNewLine(editorState, event);
    if (newEditorState) {
      this.onChange(newEditorState);
      return true;
    }
    return false;
  };

  handlePastedTextFn = (text, html) => {
    const { editorState } = this.state;
    const { handlePastedText: handlePastedTextProp, stripPastedStyles } = this.props;

    if (handlePastedTextProp) {
      return handlePastedTextProp(text, html, editorState, this.onChange);
    }
    if (!stripPastedStyles) {
      handlePastedText(text, html, editorState, this.extendedBlockRenderMap).then((contentState) => {
        this.onChange(EditorState.push(editorState, contentState, 'insert-characters'));
      });
    }
    return true;
  };

  handleTXTPaste = (text, html) => {
    const currentBlock = this.getCurrentBlock(this.state.editorState);

    let { editorState } = this.state;

    switch (currentBlock.getType() as any) {
      case 'image':
      case 'video':
      case 'placeholder': {
        const newContent = Modifier.replaceText(
          editorState.getCurrentContent(),
          new SelectionState({
            anchorKey: currentBlock.getKey(),
            anchorOffset: 0,
            focusKey: currentBlock.getKey(),
            focusOffset: 2,
          }),
          text
        );

        editorState = EditorState.push(editorState, newContent, 'insert-characters');

        this.onChange(editorState);

        return true;
      }
      default:
        return false;
    }
  };

  getCurrentBlock = (editorState) => {
    return getCurrentBlock(editorState);
  };

  handleHTMLPaste = (text, html) => {
    const currentBlock = this.getCurrentBlock(this.state.editorState);

    const { editorState } = this.state;

    switch (currentBlock.getType() as any) {
      case 'image':
      case 'video':
      case 'placeholder':
        return this.handleTXTPaste(text, html);
    }

    const newContentState = customHTML2Content(html, this.extendedBlockRenderMap);

    const pastedBlocks = newContentState.getBlockMap();

    const newState = Modifier.replaceWithFragment(
      editorState.getCurrentContent(),
      editorState.getSelection(),
      pastedBlocks
    );

    const pushedContentState = EditorState.push(editorState, newState, 'insert-fragment');

    this.onChange(pushedContentState);

    return true;
  };

  handlePasteImage = (files) => {
    //TODO: check file types
    return files.map((file) => {
      const opts = {
        url: URL.createObjectURL(file),
        file,
      };

      return this.onChange(addNewBlock(this.state.editorState, 'image', opts));
    });
  };

  preventDefault = (event) => {
    if (event.target.tagName === 'INPUT' || event.target.tagName === 'LABEL' || event.target.tagName === 'TEXTAREA') {
      this.focusHandler.onInputMouseDown();
    } else {
      event.preventDefault();
    }
  };

  render() {
    const { fullScreen, editorState, editorFocused, toolbar } = this.state;
    const {
      toolbarCustomButtons,
      toolbarOnFocus,
      toolbarClassName,
      toolbarHidden,
      editorClassName,
      wrapperClassName,
      toolbarStyle,
      editorStyle,
      wrapperStyle,
      uploadCallback,
      ariaLabel,
    } = this.props;

    const controlProps = {
      modalHandler: this.modalHandler,
      onFullScreenChanged: this.onFullScreenChanged,
      fullScreen,
      editorState,
      onChange: this.onChange,
      translations: translate,
    };
    const toolbarShow = editorFocused || this.focusHandler.isInputFocused() || !toolbarOnFocus;
    const EditorComponent = (
      <div
        id={this.wrapperId}
        className={classNames(wrapperClassName, 'rdw-editor-wrapper', { readOnly: this.isReadOnly() })}
        style={wrapperStyle}
        onClick={this.modalHandler.onEditorClick}
        onBlur={this.onWrapperBlur}
        aria-label="rdw-wrapper"
      >
        <div className="rdw-editor-toolbar-wrapper">
          {!toolbarHidden && !this.isReadOnly() && (
            <div
              className={classNames('rdw-editor-toolbar', toolbarClassName, {
                fullScreen,
              })}
              style={{
                visibility: toolbarShow ? 'visible' : 'hidden',
                ...toolbarStyle,
              }}
              onMouseDown={this.preventDefault}
              aria-label="rdw-toolbar"
              aria-hidden={!editorFocused && toolbarOnFocus}
              onFocus={this.onToolbarFocus}
            >
              {toolbar.options
                .filter((option) => {
                  return !(option === 'fullScreen' && !this.props.fullScreenParent);
                })
                .map((opt, index) => {
                  const Control = Controls[opt];
                  const config = toolbar[opt];
                  if (opt === 'image' && uploadCallback) {
                    config.uploadCallback = uploadCallback;
                  }
                  return <Control key={index} {...controlProps} config={config} />;
                })}
              {toolbarCustomButtons &&
                toolbarCustomButtons.map((button, index) =>
                  React.cloneElement(button, { key: index, ...controlProps })
                )}
            </div>
          )}
        </div>
        <div
          ref={this.setWrapperReference}
          className={classNames(editorClassName, 'rdw-editor-main')}
          style={editorStyle}
          onClick={this.focusEditor}
          onFocus={this.onEditorFocus}
          onBlur={this.onEditorBlur}
          onKeyDown={KeyDownHandler.onKeyDown}
          onMouseDown={this.onEditorMouseDown}
        >
          <div className="ed-container">
            <Editor
              ref={this.setEditorReference}
              keyBindingFn={this.keyBindingFn}
              editorState={editorState}
              onChange={this.onChange}
              blockStyleFn={blockStyleFn.bind(this)}
              customStyleMap={this.getStyleMap(this.props)}
              handleReturn={this.handleReturn}
              blockRendererFn={this.blockRendererFn}
              handlePastedText={this.handlePastedTextFn}
              handleKeyCommand={this.handleKeyCommand}
              ariaLabel={ariaLabel || 'rdw-editor'}
              blockRenderMap={blockRenderMap}
              {...this.editorProps}
              readOnly={this.state.liveTeXEdits.count()}
            />
          </div>
        </div>
      </div>
    );

    if (this.props.fullScreenParent) {
      if (this.state.fullScreen) {
        this.props.fullScreenParent.classList.add('fullscreen');
      } else {
        this.props.fullScreenParent.classList.remove('fullscreen');
      }
    }

    return this.state.fullScreen && this.props.fullScreenParent
      ? ReactDOM.createPortal(EditorComponent, this.props.fullScreenParent)
      : EditorComponent;
  }

  static defaultProps = {
    toolbarOnFocus: false,
    toolbarHidden: false,
    stripPastedStyles: false,
    localization: { locale: 'en', translations: {} },
    customDecorators: [],
  };
}

export default WysiwygEditor;
