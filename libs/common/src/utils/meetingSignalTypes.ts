enum SignalTypes {
  TOGGLE_AUDIO = 'TOGGLE_AUDIO',
  TOGGLE_VIDEO = 'TOGGLE_VIDEO',
  LEAVE_MEETING = 'LEAVE_MEETING',
}

export interface SignalData extends Record<SignalTypes, unknown> {
  [SignalTypes.TOGGLE_AUDIO]: { permanent: boolean };
  [SignalTypes.TOGGLE_VIDEO]: { permanent: boolean };
  [SignalTypes.LEAVE_MEETING]: undefined;
}

export default SignalTypes;
