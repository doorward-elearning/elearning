import Embedded from './Embedded';
import getImageComponent from '../renderer/Image';
import { ContentBlock } from 'draft-js';

const getBlockRenderFunc = (config, customBlockRenderer) => (block: ContentBlock) => {
  if (typeof customBlockRenderer === 'function') {
    const renderedComponent = customBlockRenderer(block, config, config.getEditorState);
    if (renderedComponent) return renderedComponent;
  }

  console.log('Running...');

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
    }
  }
  return undefined;
};

export default getBlockRenderFunc;
