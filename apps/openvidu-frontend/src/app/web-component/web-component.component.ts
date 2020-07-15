import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { VideoRoomComponent } from '../video-room/video-room.component';
import { OvSettings } from '../shared/types/ov-settings';
import { WebComponentModel } from '../shared/models/webcomponent-model';
import { LoggerService } from '../shared/services/logger/logger.service';
import { ILogger } from '../shared/types/logger-type';
import { ConnectionEvent, Publisher } from 'openvidu-browser';
import { OpenviduWebComponentConfig } from '@doorward/common/types/openvidu';

@Component({
  selector: 'app-web-component',
  template: `
    <app-video-room
      #videoRoom
      *ngIf="display"
      [externalConfig]="webComponent"
      (_error)="emitErrorEvent($event)"
      (_session)="emitSession($event)"
      (_publisher)="emitPublisher($event)"
      (_leaveSession)="emitLeaveSessionEvent($event)"
      (_joinSession)="emitJoinSessionEvent($event)"
    >
    </app-video-room>
  `,
  styleUrls: ['./web-component.component.css'],
})
export class WebComponentComponent {
  @Output() sessionCreated = new EventEmitter<any>();
  @Output() publisherCreated = new EventEmitter<any>();
  @Output() error = new EventEmitter<any>();

  // !Deprecated
  @Output() joinSession = new EventEmitter<any>();
  // !Deprecated
  @Output() leaveSession = new EventEmitter<any>();
  @ViewChild('videoRoom') videoRoom: VideoRoomComponent;

  display = true;

  webComponent: WebComponentModel = new WebComponentModel();

  private log: ILogger;

  constructor(private loggerSrv: LoggerService) {
    this.log = this.loggerSrv.get('WebComponentComponent');
  }

  @Input('config')
  set sessionConfig(key) {
    let config: any = localStorage.getItem(key);
    localStorage.removeItem(key);
    this.log.d('Webcomponent sessionConfig: ', config);
    if (typeof config === 'string') {
      try {
        config = JSON.parse(config);
      } catch (error) {
        this.log.e('Unexpected JSON', error);
        return;
      }
    }
    // Leave session when sessionConfig is an empty Object
    if (this.isEmpty(config)) {
      this.log.w('Parameters received are incorrect.', config);
      this.log.w('Exit session');
      this.videoRoom?.leaveSession();
      return;
    }

    this.webComponent.setSessionConfig(config as OpenviduWebComponentConfig);
    this.display = this.webComponent.canJoinToSession();
  }

  emitErrorEvent(event) {
    setTimeout(() => this.error.emit(event), 20);
  }

  emitSession(session: any) {
    session.on('sessionDisconnected', e => (this.display = false));
    session.on('connectionCreated', (e: ConnectionEvent) => {
      this.videoRoom.checkSizeComponent();
    });
    this.sessionCreated.emit(session);
  }

  emitPublisher(publisher: Publisher) {
    this.publisherCreated.emit(publisher);
  }

  // !Deprecated
  emitJoinSessionEvent(event): void {
    // Do not work. Observers always are 1 in webcomponent.
    // if (this.joinSession.observers.length > 0) {
    // 	this.log.w('joinSession event is DEPRECATED. Please consider to use sessionCreated event');
    // }
    this.joinSession.emit(event);
  }

  // !Deprecated
  emitLeaveSessionEvent(event): void {
    // Do not work. Observers always are 1 in webcomponent.
    // if (this.leaveSession.observers.length > 0) {
    // 	this.log.w('leaveSession event is DEPRECATED. Please consider to use sessionCreated event');
    // }
    this.leaveSession.emit(event);
  }

  private isEmpty(obj: any): boolean {
    return Object.keys(obj).length === 0;
  }
}
