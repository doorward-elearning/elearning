import React, { useEffect, useState } from 'react';

export const generateEditorStateFromString = (str?: string) => ({
  blocks: [
    {
      key: '8d01m',
      text: str || '',
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
  ],
  entityMap: {},
});

export default <T, K extends keyof T>(Komponent: React.FunctionComponent<T>, contentKey: K) => (props: T) => {
  const [content, setContent] = useState(generateEditorStateFromString());
  const [prevContent, setPrevContent] = useState();

  useEffect(() => {
    if (props[contentKey] && prevContent !== props[contentKey]) {
      try {
        setContent(JSON.parse(props[contentKey as any]));
      } catch (e) {
        setContent(generateEditorStateFromString(props[contentKey as any]));
      }
    }
    setPrevContent(props[contentKey]);
  }, [props[contentKey]]);

  return <Komponent {...{ ...props, [contentKey]: JSON.stringify(content) }} />;
};
