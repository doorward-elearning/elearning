import { EditorState, Modifier, SelectionState } from 'draft-js';

export function removeTeXBlock(editorState, blockKey) {
  const content = editorState.getCurrentContent();
  const block = content.getBlockForKey(blockKey);

  const targetRange = new SelectionState({
    anchorKey: blockKey,
    anchorOffset: 1,
    focusKey: blockKey,
    focusOffset: block.getLength(),
  });

  const withoutTeX = Modifier.removeRange(content, targetRange, 'backward');
  const resetBlock = Modifier.setBlockType(withoutTeX, withoutTeX.getSelectionAfter(), 'unstyled');

  const newState = EditorState.push(editorState, resetBlock, 'remove-range');
  return EditorState.forceSelection(newState, resetBlock.getSelectionAfter());
}
