import React from 'react';
import ScriptComponent from '@doorward/ui/components/ScriptComponent';

class JitsiMeeting extends ScriptComponent<JitsiMeetingProps> {
  api: JitsiMeetExternalAPI;

  componentDidMount(): void {
    this.addScript('https://meet.jit.si/external_api.js');
  }

  render(): JSX.Element {
    return <div></div>;
  }
}

export interface JitsiMeetingProps {}

export default JitsiMeeting;
