import React, { RefObject } from 'react';

class OpenviduWebComponent extends React.Component<OpenviduWebComponentProps> {
  component: RefObject<any>;

  componentDidMount(): void {
    if (this.component) {
      this.component.current.addEventListener('sessionCreated', this.onSessionCreated);
      this.component.current.addEventListener('publisherCreated', this.onPublisherCreated);
      this.component.current.addEventListener('error', this.onSessionError);
      this.component.current.addEventListener('joinSession', this.onJoinedSession);
      this.component.current.addEventListener('leaveSession', this.onLeftSession);
    }
  }

  componentWillUnmount(): void {
    if (this.component) {
      this.component.current.removeEventListener('sessionCreated', this.onSessionCreated);
      this.component.current.removeEventListener('publisherCreated', this.onPublisherCreated);
      this.component.current.removeEventListener('error', this.onSessionError);
      this.component.current.removeEventListener('joinSession', this.onJoinedSession);
      this.component.current.removeEventListener('leaveSession', this.onLeftSession);
    }
  }

  onSessionCreated = () => {
    if (this.props.onSessionCreated) {
      this.props.onSessionCreated();
    }
  };

  onPublisherCreated = () => {
    if (this.props.onPublisherCreated) {
      this.props.onPublisherCreated();
    }
  };

  onSessionError = () => {
    if (this.props.onError) {
      this.props.onError();
    }
  };

  onLeftSession = () => {
    if (this.props.onLeftSession) {
      this.props.onLeftSession();
    }
  };

  onJoinedSession = () => {
    if (this.props.onJoinedSession) {
      this.props.onJoinedSession();
    }
  };

  render(): JSX.Element {
    return (
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      <openvidu-webcomponent
        theme={this.props.theme}
        openviduServerUrl={this.props.openviduServerURL}
        ref={this.component}
        openviduSecret={this.props.openviduSecret}
      />
    );
  }
}

export interface OpenviduWebComponentProps {
  onSessionCreated?: () => void;
  onPublisherCreated?: () => void;
  onError?: () => void;
  onLeftSession?: () => void;
  onJoinedSession?: () => void;
  theme?: string;
  openviduServerURL?: string;
  openviduSecret?: string;
}

export default OpenviduWebComponent;
