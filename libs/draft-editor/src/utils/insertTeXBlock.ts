import { AtomicBlockUtils, EditorState } from 'draft-js';

export function insertTeXBlock(editorState) {
  const contentState = editorState.getCurrentContent();
  const contentStateWithEntity = contentState.createEntity('TOKEN', 'IMMUTABLE', {
    content: '',
  });
  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
  const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
  return AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' ');
}
