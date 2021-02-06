import React from 'react';
import classNames from 'classnames';
import './styles.css';
import { ContentState } from 'draft-js';

class Mention {
  findMentionEntities: Function;
  className: string;

  constructor(className) {
    this.className = className;
  }
  getMentionComponent = () => {
    const className = this.className;
    const MentionComponent: React.FunctionComponent<{
      entityKey: string;
      contentState: ContentState;
    }> = ({ entityKey, children, contentState }): JSX.Element => {
      const { url, value } = contentState.getEntity(entityKey).getData();
      return (
        <a href={url || value} className={classNames('rdw-mention-link', className)}>
          {children}
        </a>
      );
    };
    return MentionComponent;
  };
  getMentionDecorator = () => ({
    strategy: this.findMentionEntities,
    component: this.getMentionComponent(),
  });
}

Mention.prototype.findMentionEntities = (contentBlock, callback, contentState) => {
  contentBlock.findEntityRanges((character) => {
    const entityKey = character.getEntity();
    return entityKey !== null && contentState.getEntity(entityKey).getType() === 'MENTION';
  }, callback);
};

export default Mention;
