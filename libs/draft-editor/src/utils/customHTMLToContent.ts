// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import { ContentState, convertFromHTML, getSafeBodyFromHTML } from 'draft-js';

// { compose
// }  = require('underscore')

// underscore compose function
const compose = function (...args) {
  const start = args.length - 1;
  return function () {
    let i = start;
    let result = args[start].apply(this, args);
    while (i--) {
      result = args[i].call(this, result);
    }
    return result;
  };
};

// from https://gist.github.com/N1kto/6702e1c2d89a33a15a032c234fc4c34e

/*
 * Helpers
 */

// Prepares img meta data object based on img attributes
const getBlockSpecForElement = (imgElement) => {
  return {
    contentType: 'image',
    imgSrc: imgElement.getAttribute('src'),
  };
};

// Wraps meta data in HTML element which is 'understandable' by Draft, I used <blockquote />.
const wrapBlockSpec = (blockSpec) => {
  if (blockSpec === null) {
    return null;
  }

  const tempEl = document.createElement('blockquote');
  // stringify meta data and insert it as text content of temp HTML element. We will later extract
  // and parse it.
  tempEl.innerText = JSON.stringify(blockSpec);
  return tempEl;
};

// Replaces <img> element with our temp element
export const replaceElement = (oldEl, newEl) => {
  if (!(newEl instanceof HTMLElement)) {
    return;
  }

  const upEl = getUpEl(oldEl);
  //parentNode = oldEl.parentNode
  //return parentNode.replaceChild(newEl, oldEl)
  return upEl.parentNode.insertBefore(newEl, upEl);
};

const getUpEl = (el) => {
  while (el.parentNode) {
    if (el.parentNode.tagName !== 'BODY') {
      el = el.parentNode;
    }
    if (el.parentNode.tagName === 'BODY') {
      return el;
    }
  }
};

export const imgReplacer = (imgElement) => {
  const element = wrapBlockSpec(getBlockSpecForElement(imgElement));
  return replaceElement(imgElement, element);
};

const customHTML2Content = function (HTML, blockRn) {
  let tempDoc: any = new DOMParser().parseFromString(HTML, 'text/html');
  // replace all <img /> with <blockquote /> elements

  tempDoc.querySelectorAll('img').forEach((item) => imgReplacer(item));

  // use DraftJS converter to do initial conversion. I don't provide DOMBuilder and
  // blockRenderMap arguments here since it should fall back to its default ones, which are fine
  // console.log(tempDoc.body.innerHTML)
  const content = convertFromHTML(tempDoc.body.innerHTML, getSafeBodyFromHTML, blockRn);

  let contentBlocks: any = content.contentBlocks;

  // now replace <blockquote /> ContentBlocks with 'atomic' ones
  contentBlocks = contentBlocks.map(function (block) {
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
      text: 'a',
      data: {
        url: json.imgSrc,
        forceUpload: true,
      },
    });
  });

  tempDoc = null;
  return ContentState.createFromBlockArray(contentBlocks);
};
export default customHTML2Content;
