import React, { Component } from 'react';
import {
  Platform,
  TextInput,
  ScrollView,
  Button,
  Alert,
  Linking,
  StyleSheet,
  Text,
  View,
  Image,
  PermissionsAndroid,
  TouchableOpacity,
} from 'react-native';

import { OpenVidu, StreamManager } from 'openvidu-browser';
import { RTCView } from 'react-native-webrtc';
import axios from 'axios';
import btoa from 'btoa';

const OPENVIDU_SERVER_URL = 'https://classrooms.doorward.tech';
const OPENVIDU_SERVER_SECRET = 'Bhdhghjfsjdsg57543ghdgfhuyjufdyguydfiuhjhgdsjhbgj';

type Props = {};
type State = {
  mySessionId: string;
  myUserName: string;
  session?: any;
  mainStreamManager?: StreamManager;
  subscribers: Array<any>;
  role: string;
  mirror: boolean;
  videoSource?: any;
  camera: boolean;
  publisher?: any;
};
export default class App extends Component<Props, State> {
  private OV: OpenVidu | null;

  constructor(props: Props) {
    super(props);

    this.state = {
      mySessionId: 'SessionA',
      myUserName: 'Participant' + Math.floor(Math.random() * 100),
      session: undefined,
      mainStreamManager: undefined,
      subscribers: [],
      role: 'PUBLISHER',
      mirror: true,
      videoSource: undefined,
      camera: true,
    };
    this.OV = null;
  }

  componentDidMount() {}

  componentWillUnmount() {
    //this.leaveSession();
  }

  static async checkAndroidPermissions() {
    try {
      const camera = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
        title: 'Camera Permission',
        message: 'OpenVidu needs access to your camera',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      });
      const audio = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO, {
        title: 'Audio Permission',
        message: 'OpenVidu needs access to your microphone',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      });
      const storage = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE, {
        title: 'STORAGE',
        message: 'OpenVidu  needs access to your storage ',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      });
      if (camera === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
      if (audio === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the audio');
      } else {
        console.log('audio permission denied');
      }
      if (storage === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the storage');
      } else {
        console.log('storage permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  joinSession() {
    // --- 1) Get an OpenVidu object ---
    this.OV = new OpenVidu();
    this.OV.checkSystemRequirements = () => 1;
    // --- 2) Init a session ---

    this.setState(
      {
        session: this.OV.initSession(),
      },
      () => {
        const mySession = this.state.session;
        // --- 3) Specify the actions when events take place in the session ---

        // On every new Stream received...
        mySession.on('streamCreated', (event: any) => {
          // Subscribe to the Stream to receive it. Second parameter is undefined
          // so OpenVidu doesn't create an HTML video by its own
          const subscriber = mySession.subscribe(event.stream, undefined);

          const subscribers = this.state.subscribers;

          subscribers.push(subscriber);
          // Update the state with the new subscribers
          this.setState({
            subscribers: subscribers,
          });
        });

        // On every Stream destroyed...
        mySession.on('streamDestroyed', (event: any) => {
          event.preventDefault();
          // Remove the stream from 'subscribers' array
          this.deleteSubscriber(event.stream.streamManager);
        });

        // --- 4) Connect to the session with a valid user token ---
        // 'getToken' method is simulating what your server-side should do.
        // 'token' parameter should be retrieved and returned by your own backend
        this.getToken()
          .then((token) => {
            // First param is the token got from OpenVidu Server. Second param can be retrieved by every user on event
            // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
            mySession
              .connect(token, { clientData: this.state.myUserName })
              .then(() => {
                if (Platform.OS === 'android') {
                  App.checkAndroidPermissions();
                }

                // --- 5) Get your own camera stream ---
                if (this.state.role !== 'SUBSCRIBER') {
                  const properties = {
                    audioSource: undefined, // The source of audio. If undefined default microphone
                    videoSource: undefined, // The source of video. If undefined default webcam
                    publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
                    publishVideo: true, // Whether you want to start publishing with your video enabled or not
                    resolution: '640x480', // The resolution of your video
                    frameRate: 30, // The frame rate of your video
                    insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
                  };
                  // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
                  // element: we will manage it on our own) and with the desired properties
                  let publisher = this.OV?.initPublisher('', properties);

                  // --- 6) Publish your stream ---

                  // Set the main video in the page to display our webcam and store our Publisher
                  this.setState({
                    mainStreamManager: publisher,
                    videoSource: !properties.videoSource ? '1' : properties.videoSource, // 0: back camera | 1: user camera |
                  });
                  mySession.publish(publisher);
                }
              })
              .catch((error: any) => {
                console.log('There was an error connecting to the session:', error.code, error.message);
              });
          })
          .catch((error) => console.log('Error', error));
      }
    );
  }

  getNicknameTag(stream: any) {
    // Gets the nickName of the user
    if (stream.connection && JSON.parse(stream.connection.data) && JSON.parse(stream.connection.data).clientData) {
      return JSON.parse(stream.connection.data).clientData;
    }
    return '';
  }

  deleteSubscriber(streamManager: any) {
    setTimeout(() => {
      let subscribers = this.state.subscribers;
      const index = subscribers.indexOf(streamManager, 0);
      if (index > -1) {
        subscribers.splice(index, 1);
        this.setState({
          subscribers: subscribers,
        });
      }
    });
  }

  leaveSession() {
    // --- 7) Leave the session by calling 'disconnect' method over the Session object ---

    const mySession = this.state.session;

    if (mySession) {
      mySession.disconnect();
    }

    // Empty all properties...
    setTimeout(() => {
      this.OV = null;
      this.setState({
        session: undefined,
        subscribers: [],
        mySessionId: 'SessionA',
        myUserName: 'Participant' + Math.floor(Math.random() * 100),
        mainStreamManager: undefined,
        publisher: undefined,
      });
    });
  }

  toggleCamera() {
    /**
     * _switchCamera() Method provided by react-native-webrtc:
     * This function allows to switch the front / back cameras in a video track on the fly, without the need for adding / removing tracks or renegotiating
     */

    if (this.state.mainStreamManager?.stream?.getMediaStream()) {
      this.state.mainStreamManager.stream.getMediaStream()?.getVideoTracks()[0]._switchCamera();
    }
    this.setState({ mirror: !this.state.mirror });
  }

  muteUnmuteCamera() {
    // this.state.mainStreamManager?.video.publishVideo(!this.state.camera);
    // this.setState({ camera: !this.state.camera });
  }

  render() {
    return (
      <ScrollView>
        {this.state.mainStreamManager ? (
          <View>
            <View style={styles.container}>
              <Text>Session: {this.state.mySessionId}</Text>
              <Text>{this.getNicknameTag(this.state.mainStreamManager.stream)}</Text>
              <RTCView
                zOrder={0}
                streamURL={this.state.mainStreamManager.stream.getMediaStream().getVideoTracks()[0]}
                objectFit="cover"
                mirror={this.state.mirror}
                ref={(rtcVideo: any) => {
                  console.log(rtcVideo, '----------------------');
                  if (rtcVideo) {
                    rtcVideo.style = {};
                    rtcVideo.addEventListener = (...args: any) => {};
                    rtcVideo.removeEventListener = (...args: any) => {};
                    this.state.mainStreamManager?.addVideoElement(rtcVideo);
                  }
                }}
                style={styles.selfView}
              />
            </View>
            <View>
              <TouchableOpacity style={styles.button} onLongPress={this.toggleCamera} onPress={this.toggleCamera}>
                <Button onPress={() => this.toggleCamera()} title="Toggle Camera" color="#841584" />
              </TouchableOpacity>
              <TouchableOpacity
                onLongPress={this.muteUnmuteCamera}
                onPress={this.muteUnmuteCamera}
                style={styles.button}
              >
                <Button
                  onPress={() => this.muteUnmuteCamera()}
                  title={this.state.camera ? 'Mute Camera' : 'Unmute Camera'}
                  color="#00cbff"
                />
              </TouchableOpacity>
              <TouchableOpacity onLongPress={this.leaveSession} onPress={this.leaveSession} style={styles.button}>
                <Button onPress={() => this.leaveSession()} title="Leave Session" color="#ff0000" />
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                padding: 20,
              }}
            >
              <Image style={styles.img} source={require('./assets/images/openvidu_grey_bg_transp_cropped.png')} />
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <TextInput
                style={{ width: '90%', height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={(mySessionId) => this.setState({ mySessionId })}
                value={this.state.mySessionId}
              />
            </View>

            <TouchableOpacity style={styles.button} onLongPress={this.joinSession} onPress={this.joinSession}>
              <Button onPress={() => this.joinSession()} title="Join" color="#841584" />
            </TouchableOpacity>
          </View>
        )}

        <View style={[styles.container, { flexDirection: 'row', flexWrap: 'wrap' }]}>
          {this.state.subscribers.map((item, index) => {
            if (!item) {
              return (
                <View key={index}>
                  <Text>{this.getNicknameTag(item.stream)}</Text>
                  <RTCView
                    streamURL=""
                    zOrder={0}
                    objectFit="cover"
                    style={styles.remoteView}
                    ref={(rtcVideo: any) => {
                      if (rtcVideo) {
                        rtcVideo.style = {};
                        rtcVideo.addEventListener = () => {};
                        item.addVideoElement(rtcVideo);
                      }
                    }}
                  />
                </View>
              );
            }
          })}
        </View>
      </ScrollView>
    );
  }

  /**
   * --------------------------
   * SERVER-SIDE RESPONSIBILITY
   * --------------------------
   * These methods retrieve the mandatory user token from OpenVidu Server.
   * This behavior MUST BE IN YOUR SERVER-SIDE IN PRODUCTION (by using
   * the API REST, openvidu-java-client or openvidu-node-client):
   *   1) Initialize a session in OpenVidu Server	(POST /api/sessions)
   *   2) Generate a token in OpenVidu Server		(POST /api/tokens)
   *   3) The token must be consumed in Session.connect() method
   */

  getToken() {
    return this.createSession(this.state.mySessionId)
      .then((sessionId: any) => this.createToken(sessionId))
      .catch((error) => console.log(error));
  }

  createSession(sessionId: string) {
    return new Promise((resolve) => {
      const data = JSON.stringify({ customSessionId: sessionId });
      axios
        .post(OPENVIDU_SERVER_URL + '/api/sessions', data, {
          headers: {
            Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        })
        .then((response) => {
          console.log('CREATE SESSION', response);
          resolve(response.data.id);
        })
        .catch((response) => {
          console.log(response);
          const error = Object.assign({}, response);
          if (!error.response) {
            console.error('Network error: ', error);
            if (error.request && error.request._response) {
              console.error('Response of the request: ', error.request._response);
            }
          } else if (error.response && error.response.status && error.response.status === 409) {
            console.log('RESOLVING WITH SESSIONID, 409');
            resolve(sessionId);
          } else {
            console.warn('No connection to OpenVidu Server. This may be a certificate error at ' + OPENVIDU_SERVER_URL);

            Alert.alert(
              'No connection to OpenVidu Server.',
              'This may be a certificate error at "' +
                OPENVIDU_SERVER_URL +
                '"\n\nClick OK to navigate and accept it. ' +
                'If no certificate warning is shown, then check that your OpenVidu Server is up and running at "' +
                OPENVIDU_SERVER_URL +
                '"',
              [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {
                  text: 'OK',
                  onPress: () =>
                    Linking.openURL(OPENVIDU_SERVER_URL + '/accept-certificate').catch((err) =>
                      console.error('An error occurred', err)
                    ),
                },
              ],
              { cancelable: false }
            );
          }
        });
    });
  }

  createToken(sessionId?: string | null) {
    return new Promise((resolve, reject) => {
      const data = JSON.stringify({ session: sessionId });
      axios
        .post(OPENVIDU_SERVER_URL + '/api/tokens', data, {
          headers: {
            Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          console.log('TOKEN', response);
          resolve(response.data.token);
        })
        .catch((error) => reject(error));
    });
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    paddingTop: Platform.OS == 'ios' ? 20 : 0,
  },
  selfView: {
    width: '100%',
    height: 300,
    transform: [],
  },
  remoteView: {
    width: 150,
    height: 150,
    transform: [],
  },
  button: {
    padding: 10,
  },
  img: {
    flex: 1,
    width: 400,
    height: 200,
  },
});
