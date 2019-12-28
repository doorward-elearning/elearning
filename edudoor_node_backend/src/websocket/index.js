const types = { liveClassroomStarted: 'LIVE_CLASSROOM_STARTED' };

const websocket = types.reduce((acc, type) => {
  return {
    ...acc,
    [type]: () => {

    }
  }
}, {});
