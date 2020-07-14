import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface PermissionsDialogResult {}
export interface PermissionsDialogData {
  redirectOnClose: string;
  requestAudio: boolean;
  requestVideo: boolean;
}

@Component({
  selector: 'app-dialog-permissions',
  templateUrl: './dialog-permissions.component.html',
  styleUrls: ['./dialog-permissions.component.css'],
})
export class DialogPermissionsComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DialogPermissionsComponent, PermissionsDialogResult>,
    @Inject(MAT_DIALOG_DATA) public data: PermissionsDialogData
  ) {}

  ngOnInit(): void {}

  notNow(): void {
    window.location.href = this.data.redirectOnClose;
  }

  allowAccess(): void {
    this.dialogRef.close();
  }
}
