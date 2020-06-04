import React from 'react';

class OpenviduWebComponent extends React.Component<OpenviduWebComponentProps> {
  component: any;

  componentDidMount(): void {
    if (this.component) {
      this.component.addEventListener('sessionCreated', this.onSessionCreated);
      this.component.addEventListener('publisherCreated', this.onPublisherCreated);
      this.component.addEventListener('error', this.onSessionError);
      this.component.addEventListener('joinSession', this.onJoinedSession);
      this.component.addEventListener('leaveSession', this.onLeftSession);
    }
  }

  componentWillUnmount(): void {
    if (this.component) {
      this.component.removeEventListener('sessionCreated', this.onSessionCreated);
      this.component.removeEventListener('publisherCreated', this.onPublisherCreated);
      this.component.removeEventListener('error', this.onSessionError);
      this.component.removeEventListener('joinSession', this.onJoinedSession);
      this.component.removeEventListener('leaveSession', this.onLeftSession);
    }
  }

  onSessionCreated = () => {
    if (this.props.onSessionCreated) {
      this.props.onSessionCreated();
    }
    console.log('OpenviduWebComponent', 'onSessionCreated');
  };

  onPublisherCreated = () => {
    if (this.props.onPublisherCreated) {
      this.props.onPublisherCreated();
    }
    console.log('OpenviduWebComponent', 'onPublisherCreated');
  };

  onSessionError = () => {
    if (this.props.onError) {
      this.props.onError();
    }
    console.log('OpenviduWebComponent', 'onError');
  };

  onLeftSession = () => {
    if (this.props.onLeftSession) {
      this.props.onLeftSession();
    }
    console.log('OpenviduWebComponent', 'onLeftSession');
  };

  onJoinedSession = () => {
    if (this.props.onJoinedSession) {
      this.props.onJoinedSession();
    }
    console.log('OpenviduWebComponent', 'onJoinedSession');
  };

  render(): JSX.Element {
    return (
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      <openvidu-webcomponent
        sessionConfig={JSON.stringify(this.props.sessionConfig || {})}
        theme={this.props.theme}
        openviduServerUrl={this.props.openviduServerURL}
        ref={component => {
          this.component = component;
        }}
        openviduSecret={this.props.openviduSecret}
      />
    );
  }
}
export interface SessionConfig {
  sessionName: string;
  user: string;
  tokens: string[];
  ovSettings: {
    chat: boolean;
    autopublish: boolean;
    toolbarButtons: {
      audio: boolean;
      video: boolean;
      screenShare: boolean;
      fullscreen: boolean;
      layoutSpeaking: boolean;
      exit: boolean;
    };
  };
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
  sessionConfig?: SessionConfig;
}

export default OpenviduWebComponent;
