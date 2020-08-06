import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { OpenviduUser } from '@doorward/common/types/openvidu';
import { ComponentType } from '@angular/cdk/portal';
import {
  ChatNotificationComponent,
  ChatNotificationData,
} from '../../components/chat-notification/chat-notification.component';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  newMessage({
    duration,
    ...data
  }: ChatNotificationData & {
    duration?: number;
  }) {
    this.launchCustomNotification(ChatNotificationComponent, { ...data }, duration);
  }

  launchCustomNotification<T>(
    component: ComponentType<any>,
    data: T,
    durationTimeMs = 5000,
    className = ''
  ): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.openFromComponent(component, {
      duration: durationTimeMs,
      verticalPosition: 'top',
      horizontalPosition: 'end',
      panelClass: className,
      data,
    });
  }

  private launchNotification(
    message: string,
    action: string,
    className: string,
    durationTimeMs: number
  ): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      duration: durationTimeMs,
      verticalPosition: 'top',
      horizontalPosition: 'end',
      panelClass: className,
    });
  }
}
