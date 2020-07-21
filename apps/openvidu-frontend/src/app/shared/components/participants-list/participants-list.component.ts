import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RemoteUsersService } from '../../services/remote-users/remote-users.service';
import { UserModel } from '../../models/user-model';
import { OpenViduSessionService } from '../../services/openvidu-session/openvidu-session.service';

@Component({
  selector: 'participants-list',
  templateUrl: './participants-list.component.html',
  styleUrls: ['./participants-list.component.css'],
})
export class ParticipantsListComponent implements OnInit {
  remoteUsers: UserModel[];
  localUsers: UserModel[];
  constructor(private remoteUserService: RemoteUsersService, private openviduSessionService: OpenViduSessionService) {}

  @Output() closeButtonClicked = new EventEmitter<any>();
  @Output() muteAllButtonClicked = new EventEmitter<any>();
  @Output() turnOffVideoForAllButtonClicked = new EventEmitter<any>();

  allMuted = false;
  allVideosTurnedOff = false;

  ngOnInit(): void {
    this.remoteUserService.getRemoteUsers().subscribe(next => {
      this.remoteUsers = next.filter(user => !user.isScreen());
      this.allVideosTurnedOff = !this.remoteUsers.find(user => user?.streamManager?.stream?.videoActive);
      this.allMuted = !this.remoteUsers.find(user => user?.streamManager?.stream?.audioActive);
    });

    this.openviduSessionService.getUsers().subscribe(next => {
      this.localUsers = next.filter(user => !user.isScreen());
    });
  }

  close(): void {
    this.closeButtonClicked.emit();
  }

  muteAll(): void {
    this.muteAllButtonClicked.emit(this.allMuted);
  }

  turnOfVideoForAll(): void {
    this.turnOffVideoForAllButtonClicked.emit(this.allVideosTurnedOff);
  }
}
