import { Injectable } from '@angular/core';
import { Device, OpenVidu } from 'openvidu-browser';
import { CameraType, IDevice } from '../../types/device-type';
import { ILogger } from '../../types/logger-type';
import { LoggerService } from '../logger/logger.service';
import { UtilsService } from '../utils/utils.service';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class DevicesService {
  private readonly VIDEO_DEVICE = 'openviduCallVideoDevice';
  private readonly AUDIO_DEVICE = 'openviduCallAudioDevice';

  private OV: OpenVidu = null;
  private devices: Device[];
  private cameras: IDevice[] = [];
  private microphones: IDevice[] = [];
  private disabledDevices: Device[] = [];
  private camSelected: IDevice;
  private micSelected: IDevice;
  private log: ILogger;

  constructor(private loggerSrv: LoggerService, private utilSrv: UtilsService, private storageSrv: StorageService) {
    this.log = this.loggerSrv.get('DevicesService');
    this.OV = new OpenVidu();
  }

  async initDevices() {
    await this.initOpenViduDevices();
    this.devices.length > 0 ? this.log.d('Devices found: ', this.devices) : this.log.w('No devices found!');
    this.resetDevicesArray();
    if (this.hasAudioDeviceAvailable()) {
      this.initAudioDevices();
      this.micSelected = this.getMicSelected();
    }
    if (this.hasVideoDeviceAvailable()) {
      this.initVideoDevices();
      this.camSelected = this.cameras.find(device => device.type === CameraType.FRONT);
    }
  }
  private async initOpenViduDevices() {
    this.devices = (await this.OV.getDevices()).filter(
      device => !this.disabledDevices.find(disabledDevice => disabledDevice.deviceId === device.deviceId)
    );
  }

  private initAudioDevices() {
    const audioDevices = this.devices.filter(device => device.kind === 'audioinput');
    audioDevices.forEach((device: Device) => {
      this.microphones.push({ label: device.label, device: device.deviceId });
    });
  }

  private initVideoDevices() {
    const FIRST_POSITION = 0;
    const videoDevices = this.devices.filter(device => device.kind === 'videoinput');
    videoDevices.forEach((device: Device, index: number) => {
      const myDevice: IDevice = {
        label: device.label,
        device: device.deviceId,
        type: CameraType.BACK,
      };
      if (this.utilSrv.isMobile()) {
        // We assume front video device has 'front' in its label in Mobile devices
        if (myDevice.label.toLowerCase().includes(CameraType.FRONT.toLowerCase())) {
          myDevice.type = CameraType.FRONT;
        }
      } else {
        // We assume first device is web camera in Browser Desktop
        if (index === FIRST_POSITION) {
          myDevice.type = CameraType.FRONT;
        }
      }

      this.cameras.push(myDevice);
    });
    this.log.d('Camera selected', this.camSelected);
  }

  getCamSelected(): IDevice {
    if (this.cameras.length === 0) {
      this.log.e('No video devices found!');
      return;
    }
    const storageDevice = this.getCamFromStorage();
    if (storageDevice) {
      return storageDevice;
    }
    return this.camSelected || this.cameras[0];
  }

  private getCamFromStorage() {
    let storageDevice = this.storageSrv.get(this.VIDEO_DEVICE);
    storageDevice = this.getCameraByDeviceField(storageDevice?.device);
    if (storageDevice) {
      return storageDevice;
    }
  }

  getMicSelected(): IDevice {
    if (this.microphones.length === 0) {
      this.log.e('No audio devices found!');
      return;
    }
    const storageDevice = this.getMicFromStorage();
    if (storageDevice) {
      return storageDevice;
    }
    return this.micSelected || this.microphones[0];
  }

  private getMicFromStorage(): IDevice {
    let storageDevice = this.storageSrv.get(this.AUDIO_DEVICE);
    storageDevice = this.getMicrophoneByDeviceField(storageDevice?.device);
    if (storageDevice) {
      return storageDevice;
    }
  }

  setCamSelected(deviceField: any) {
    this.camSelected = this.getCameraByDeviceField(deviceField);
    this.saveCamToStorage(this.camSelected);
  }

  private saveCamToStorage(cam: IDevice) {
    this.storageSrv.set(this.VIDEO_DEVICE, cam);
  }

  setMicSelected(deviceField: any) {
    this.micSelected = this.getMicrophoneByDeviceField(deviceField);
    this.saveMicToStorage(this.micSelected);
  }
  private saveMicToStorage(mic: IDevice) {
    this.storageSrv.set(this.AUDIO_DEVICE, mic);
  }

  needUpdateVideoTrack(newVideoSource: string): boolean {
    return this.getCamSelected().device !== newVideoSource;
  }

  needUpdateAudioTrack(newAudioSource: string): boolean {
    return this.getMicSelected().device !== newAudioSource;
  }

  getCameras(): IDevice[] {
    return this.cameras;
  }

  getMicrophones(): IDevice[] {
    return this.microphones;
  }

  hasVideoDeviceAvailable(): boolean {
    return !!this.devices?.find(device => device.kind === 'videoinput');
  }

  hasAudioDeviceAvailable(): boolean {
    return !!this.devices?.find(device => device.kind === 'audioinput');
  }

  cameraNeedsMirror(deviceField: string): boolean {
    return this.getCameraByDeviceField(deviceField)?.type === CameraType.FRONT;
  }

  areEmptyLabels(): boolean {
    return !!this.cameras.find(device => device.label === '') || !!this.microphones.find(device => device.label === '');
  }

  private getCameraByDeviceField(deviceField: any): IDevice {
    return this.cameras.find((opt: IDevice) => opt.device === deviceField || opt.label === deviceField);
  }

  private getMicrophoneByDeviceField(deviceField: any): IDevice {
    return this.microphones.find((opt: IDevice) => opt.device === deviceField || opt.label === deviceField);
  }

  private resetDevicesArray() {
    this.cameras = [{ label: 'None', device: null, type: null }];
    this.microphones = [{ label: 'None', device: null, type: null }];
  }

  public disableVideoDevice(videoDevice: string) {
    this.disabledDevices.push(this.devices.find(device => device.deviceId === videoDevice));
    this.devices = this.devices.filter(device => device.deviceId !== videoDevice);
    this.cameras = this.cameras.filter(camera => camera.device !== videoDevice);
  }
}
