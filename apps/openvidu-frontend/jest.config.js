module.exports = {
  name: 'openvidu-frontend',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/openvidu-frontend',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js',
  ],
};
