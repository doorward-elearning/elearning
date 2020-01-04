import { ContentBlock, convertFromRaw } from 'draft-js';

const MAX_CHARACTERS = 3000;

const handleDraftPagination = (content: any): Array<Array<ContentBlock>> => {
  let contentState;
  try {
    contentState = convertFromRaw(content);
  } catch (err) {
    return [];
  }
  const blocks = [];

  const blockArray = contentState.getBlocksAsArray();

  let charCount = 0;

  let currentBlock = [];
  for (let i = 0; i < blockArray.length; i++) {
    charCount += blockArray[i].getText().length;
    if (charCount >= MAX_CHARACTERS) {
      charCount = 0;
      blocks.push(currentBlock);
      currentBlock = [];
    } else {
      currentBlock.push(blockArray[i]);
    }
  }
  if (currentBlock.length) {
    blocks.push(currentBlock);
  }

  return blocks;
};

export default handleDraftPagination;
