import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RemoteUsersService } from '../../services/remote-users/remote-users.service';
import { OpenViduSessionService } from '../../services/openvidu-session/openvidu-session.service';
import { RemoteUserModel } from '../../models/remote-user-model';
import { LocalUserModel } from '../../models/local-user-model';

interface Position {
  x: number;
  y: number;
}

@Component({
  selector: 'participants-window',
  templateUrl: './participants-window.component.html',
  styleUrls: ['./participants-window.component.scss'],
})
export class ParticipantsWindowComponent implements OnInit {
  remoteUsers: RemoteUserModel[];
  localUser: LocalUserModel;

  minimized = false;

  @ViewChild('participantsWindow') participantsWindow: ElementRef<HTMLDivElement>;

  constructor(private remoteUsersService: RemoteUsersService, private ovSessionService: OpenViduSessionService) {}

  ngOnInit(): void {
    this._subscribeToLocalUser();
    this._subscribeToRemoteUsers();
  }

  private _subscribeToRemoteUsers() {
    this.remoteUsersService.remoteUsers.subscribe(users => {
      this.remoteUsers = [...users];
    });
  }

  private _subscribeToLocalUser() {
    this.ovSessionService.userObs.subscribe(user => {
      this.localUser = user;
    });
  }

  getTitle(): string {
    return this.ovSessionService.getSessionTitle();
  }

  onEdge(edge: { top: boolean; left: boolean; right: boolean; bottom: boolean }) {
    const element = this.participantsWindow.nativeElement;
    const parentDimensions = element.parentElement.getBoundingClientRect();
    const { x, y, width } = element.getBoundingClientRect();

    const content = element.querySelector('.participants_content') as HTMLElement;

    const maxHeight = window.getComputedStyle(content, null).getPropertyValue('max-height');

    if (!edge.left || !edge.right) {
      if (y + Math.min(width, +maxHeight.replace('px', '') + 50) < parentDimensions.height) {
        element.classList.remove('horizontal');
      }
    }
    if (!edge.bottom || !edge.top) {
      if (!element.classList.contains('horizontal')) {
        element.classList.add('horizontal');
      }
    }
  }

  setMinimized(minimized: boolean) {
    this.minimized = minimized;
  }
}
