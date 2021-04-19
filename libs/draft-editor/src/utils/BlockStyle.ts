// The function will return block inline styles using block level meta-data
import { ContentBlock } from 'draft-js';

export default function blockStyleFn(block: ContentBlock): any {
  const blockAlignment = block.getData() && block.getData().get('text-align');
  if (blockAlignment) {
    return `rdw-${blockAlignment}-aligned-block`;
  }
  return '';
}
