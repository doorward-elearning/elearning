import React from 'react';

class OpenviduWebComponent extends React.Component<OpenviduWebComponentProps> {
  component: any;
  script: HTMLScriptElement;
  style: HTMLLinkElement;
  jqueryScript: HTMLScriptElement;

  componentDidMount(): void {
    this.initialize();
    if (this.component) {
      this.component.addEventListener('sessionCreated', this.onSessionCreated);
      this.component.addEventListener('publisherCreated', this.onPublisherCreated);
      this.component.addEventListener('error', this.onSessionError);
      this.component.addEventListener('joinSession', this.onJoinedSession);
      this.component.addEventListener('leaveSession', this.onLeftSession);
    }
  }

  initialize = (): void => {
    this.script = this.addScript(this.props.scriptUrl);
    this.jqueryScript = this.addScript('https://code.jquery.com/jquery-3.5.1.min.js');
    this.jqueryScript.integrity = 'sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=';
    this.jqueryScript.crossOrigin = 'anonymous';

    this.style = this.addStyles(this.props.stylesUrl);
  };

  addScript = (url: string): HTMLScriptElement => {
    const script = document.createElement('script');
    script.src = url;
    script.async = true;
    document.body.appendChild(script);
    return script;
  };

  addStyles = (url: string): HTMLLinkElement => {
    const style = document.createElement('link');
    style.href = url;
    document.head.appendChild(style);
    return style;
  };

  componentWillUnmount(): void {
    if (this.component) {
      this.component.removeEventListener('sessionCreated', this.onSessionCreated);
      this.component.removeEventListener('publisherCreated', this.onPublisherCreated);
      this.component.removeEventListener('error', this.onSessionError);
      this.component.removeEventListener('joinSession', this.onJoinedSession);
      this.component.removeEventListener('leaveSession', this.onLeftSession);
    }
    document.body.removeChild(this.script);
    document.body.removeChild(this.jqueryScript);
    document.head.removeChild(this.style);
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
    const { sessionId, sessionName, user, logoUrl, avatar, tokens, chat, autoPublish, toolbarButtons } = this.props;
    const sessionConfig: SessionConfig = {
      sessionName: sessionId,
      sessionTitle: sessionName,
      user,
      avatar,
      tokens,
      ovSettings: {
        chat: !!chat,
        logoUrl: logoUrl || '',
        autopublish: !!autoPublish,
        toolbarButtons: {
          audio: true,
          video: true,
          fullscreen: true,
          layoutSpeaking: true,
          exit: true,
          ...(toolbarButtons || {}),
          screenShare: true,
        },
      },
    };
    return (
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      <openvidu-webcomponent
        sessionConfig={JSON.stringify(sessionConfig)}
        theme={this.props.theme}
        openviduServerApiUrl={this.props.openviduServerApiURL}
        ref={component => {
          this.component = component;
        }}
      />
    );
  }
}
export interface SessionConfig {
  sessionName: string;
  sessionTitle: string;
  user: string;
  tokens: string[];
  avatar: string;
  ovSettings: {
    logoUrl: string;
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

export enum OpenviduToolbarButtons {
  AUDIO = 'audio',
  VIDEO = 'video',
  SCREEN_SHARE = 'screenShare',
  FULL_SCREEN = 'fullScreen',
  LAYOUT_SPEAKING = 'layoutSpeaking',
  EXIT = 'exit',
}

export interface OpenviduWebComponentProps {
  scriptUrl: string;
  stylesUrl: string;
  sessionId: string;
  sessionName: string;
  user: string;
  onSessionCreated?: () => void;
  onPublisherCreated?: () => void;
  onError?: () => void;
  onLeftSession?: () => void;
  onJoinedSession?: () => void;
  theme?: string;
  openviduServerApiURL?: string;
  tokens?: string[];
  chat?: boolean;
  autoPublish?: boolean;
  toolbarButtons?: Record<OpenviduToolbarButtons, boolean>;
  logoUrl?: string;
  avatar?: string;
}

export default OpenviduWebComponent;
