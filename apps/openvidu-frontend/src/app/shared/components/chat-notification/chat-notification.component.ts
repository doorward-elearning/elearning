import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material/snack-bar';
import { OpenviduUser } from '@doorward/common/types/openvidu';

export interface ChatNotificationData {
  sender: OpenviduUser;
  message: string;
  onClick: () => void;
}

@Component({
  selector: 'app-chat-notification',
  templateUrl: './chat-notification.component.html',
  styleUrls: ['./chat-notification.component.css'],
})
export class ChatNotificationComponent implements OnInit {
  constructor(public snackBar: MatSnackBar, @Inject(MAT_SNACK_BAR_DATA) public data: ChatNotificationData) {}

  ngOnInit(): void {}

  close() {
    this.snackBar.dismiss();
  }

  onClick() {
    this.snackBar.dismiss();
    this.data.onClick();
  }
}
