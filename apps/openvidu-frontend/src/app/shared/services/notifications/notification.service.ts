import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { OpenviduUser } from '@doorward/common/types/openvidu';
import { ComponentType } from '@angular/cdk/portal';
import { ChatNotificationComponent } from '../../components/chat-notification/chat-notification.component';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  newMessage(sender: OpenviduUser, message: string, callback) {
    this.launchCustomNotification(
      ChatNotificationComponent,
      {
        sender,
        message,
        onClick: callback,
      },
      'messageSnackbar',
      5000
    );
  }

  private launchCustomNotification<T>(
    component: ComponentType<any>,
    data: T,
    className: string,
    durationTimeMs: number
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
