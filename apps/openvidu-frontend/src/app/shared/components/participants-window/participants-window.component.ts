import { Component, OnInit } from '@angular/core';
import { RemoteUsersService } from '../../services/remote-users/remote-users.service';
import { OpenViduSessionService } from '../../services/openvidu-session/openvidu-session.service';
import { RemoteUserModel } from '../../models/remote-user-model';
import { LocalUserModel } from '../../models/local-user-model';

@Component({
  selector: 'participants-window',
  templateUrl: './participants-window.component.html',
  styleUrls: ['./participants-window.component.scss'],
})
export class ParticipantsWindowComponent implements OnInit {
  remoteUsers: RemoteUserModel[];
  localUser: LocalUserModel;

  constructor(private remoteUsersService: RemoteUsersService, private ovSessionService: OpenViduSessionService) {}

  ngOnInit(): void {
    this._subscribeToLocalUser();
    this._subscribeToRemoteUsers();
  }

  private _subscribeToRemoteUsers() {
    this.remoteUsersService.remoteUsers.subscribe(users => {
      this.remoteUsers = users;
    });
  }

  private _subscribeToLocalUser() {
    this.ovSessionService.userObs.subscribe(user => {
      this.localUser = user;
    });
  }
}
