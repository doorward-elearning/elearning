import { getSelectedBlock } from 'draftjs-utils';
import { BlockMap, convertFromHTML, Modifier } from 'draft-js';
import { imgReplacer } from './customHTMLToContent';
import { List } from 'immutable';

export const handlePastedText = async (text, html, editorState, blockRenderMap) => {
  const selectedBlock = getSelectedBlock(editorState);
  if (selectedBlock && selectedBlock.type === 'code') {
    const contentState = Modifier.replaceText(
      editorState.getCurrentContent(),
      editorState.getSelection(),
      text,
      editorState.getCurrentInlineStyle()
    );
    return contentState;
  } else if (html) {
    let tempDoc: any = new DOMParser().parseFromString(html, 'text/html');
    // replace all <img /> with <blockquote /> elements

    tempDoc.querySelectorAll('img').forEach((item) => imgReplacer(item));

    const contentBlock: any = convertFromHTML(tempDoc.body.innerHTML, undefined, blockRenderMap);

    // now replace <blockquote /> ContentBlocks with 'atomic' ones
    contentBlock.contentBlocks = contentBlock.contentBlocks.map(function (block) {
      // console.log(convertToRaw(ContentState.createFromBlockArray([block])));
      if (block.getType() !== 'blockquote') {
        return block;
      }

      let json: any = '';
      try {
        json = JSON.parse(block.getText());
      } catch (error) {
        return block;
      }

      // new block
      return block.merge({
        type: 'image',
        text: '',
        data: {
          url: json.imgSrc,
          forceUpload: true,
        },
      });
    });

    let contentState = editorState.getCurrentContent();

    contentState = Modifier.replaceWithFragment(
      contentState,
      editorState.getSelection(),
      (List(contentBlock.contentBlocks) as unknown) as BlockMap
    );

    tempDoc = null;
    return contentState;
  }
  throw new Error('Could not paste.');
};
