import React from 'react';
import { OpenviduWebComponentConfig } from '@doorward/common/types/openvidu';
import { OptionalKeysExcept } from '@doorward/common/types';
import ScriptComponent from '@doorward/ui/components/ScriptComponent';

class OpenviduWebComponent extends ScriptComponent<OpenviduWebComponentProps> {
  component: any;

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

  initialize = async (): Promise<void> => {
    const [, jqueryScript] = await this.addScripts(this.props.scriptUrl, 'https://code.jquery.com/jquery-3.5.1.min.js');
    jqueryScript.integrity = 'sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=';
    jqueryScript.crossOrigin = 'anonymous';

    // Keep this order of styles, to ensure we can override the default material styles
    this.addStyles('https://unpkg.com/@angular/material/prebuilt-themes/indigo-pink.css', this.props.stylesUrl);
  };

  componentWillUnmount(): void {
    super.componentWillUnmount();
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
    console.log('OpenviduWebComponentConfig', 'onSessionCreated');
  };

  onPublisherCreated = () => {
    if (this.props.onPublisherCreated) {
      this.props.onPublisherCreated();
    }
    console.log('OpenviduWebComponentConfig', 'onPublisherCreated');
  };

  onSessionError = () => {
    if (this.props.onError) {
      this.props.onError();
    }
    console.log('OpenviduWebComponentConfig', 'onError');
  };

  onLeftSession = () => {
    if (this.props.onLeftSession) {
      this.props.onLeftSession();
    }
    console.log('OpenviduWebComponentConfig', 'onLeftSession');
  };

  onJoinedSession = () => {
    if (this.props.onJoinedSession) {
      this.props.onJoinedSession();
    }
    console.log('OpenviduWebComponentConfig', 'onJoinedSession');
  };

  render(): JSX.Element {
    // save an encryption key to the localstorage
    localStorage.setItem('openvidu-webcomponent', JSON.stringify(this.props.config));
    return (
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      <openvidu-webcomponent
        config="openvidu-webcomponent"
        ref={(component) => {
          this.component = component;
        }}
      />
    );
  }
}

type Config = OptionalKeysExcept<OpenviduWebComponentConfig, 'ovServerApiUrl' | 'sessionId' | 'sessionConfig' | 'user'>;

export interface OpenviduWebComponentProps {
  scriptUrl: string;
  stylesUrl: string;
  config: Config;
  onSessionCreated?: () => void;
  onPublisherCreated?: () => void;
  onError?: () => void;
  onLeftSession?: () => void;
  onJoinedSession?: () => void;
}

export default OpenviduWebComponent;
