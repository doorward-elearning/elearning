import React, { MutableRefObject } from 'react';
import ScriptComponent from '@doorward/ui/components/ScriptComponent';
import Spinner from '@doorward/ui/components/Spinner';

class JitsiMeeting extends ScriptComponent<JitsiMeetingProps> {
  api: JitsiMeetExternalAPI;
  ref: MutableRefObject<HTMLDivElement> = React.createRef();
  state = {
    ready: false,
  };

  componentWillMount(): void {
    this.addScripts(...this.props.scripts).then(() => {
      this.setState({
        ready: true,
      });
    });
    this.addStyles(...this.props.styles);
  }

  componentWillUnmount(): void {
    super.componentWillUnmount();
    if (this.api) {
      this.api.dispose();
    }
  }

  render(): JSX.Element {
    const { ready } = this.state;
    if (ready) {
      if (this.ref.current) {
        this.api = new JitsiMeetExternalAPI(this.props.domain, {
          parentNode: document.querySelector('#meet'),
          width: '100%',
          height: '100%',
          ...this.props.options,
        });

        this.api.addEventListener('readyToClose', () => {
          alert('hi');
          this.props.onLeftSession();
        });
      }
    }

    return (
      <div id="meet" ref={this.ref} style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}>
        {!ready && <Spinner />}
      </div>
    );
  }
}

export interface JitsiMeetingProps {
  options: JitsiMeet.JitsiMeetOptions;
  domain: string;
  onLeftSession: () => void;
  scripts: string[];
  styles: string[];
}

export default JitsiMeeting;
