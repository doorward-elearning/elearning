import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RemoteUsersService } from '../../services/remote-users/remote-users.service';
import { UserModel } from '../../models/user-model';

@Component({
  selector: 'participants-list',
  templateUrl: './participants-list.component.html',
  styleUrls: ['./participants-list.component.css'],
})
export class ParticipantsListComponent implements OnInit {
  remoteUsers: UserModel[];
  constructor(private remoteUserService: RemoteUsersService) {}

  @Output() closeButtonClicked= new EventEmitter<any>();

  ngOnInit(): void {
    this.remoteUserService.getRemoteUsers().subscribe(next => {
      this.remoteUsers = next;
    });
  }

  close(): void {
    this.closeButtonClicked.emit();
  }
}
