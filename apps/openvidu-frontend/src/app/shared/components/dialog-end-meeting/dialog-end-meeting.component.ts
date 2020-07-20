import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserModel } from '../../models/user-model';

export interface EndMeetingDialogData {
  user: UserModel;
}

export interface EndMeetingDialogResult {
  meetingEnded?: boolean;
  meetingLeft?: boolean;
}

@Component({
  selector: 'app-dialog-end-meeting',
  templateUrl: './dialog-end-meeting.component.html',
  styleUrls: ['./dialog-end-meeting.component.css'],
})
export class DialogEndMeetingComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DialogEndMeetingComponent, EndMeetingDialogResult>,
    @Inject(MAT_DIALOG_DATA) public data: EndMeetingDialogData
  ) {}

  ngOnInit(): void {}

  leaveMeeting(): void {
    this.dialogRef.close({
      meetingLeft: true,
    });
  }

  endMeeting(): void {
    this.dialogRef.close({
      meetingEnded: true,
    });
  }
}
