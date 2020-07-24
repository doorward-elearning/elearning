import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { createCustomElement } from '@angular/elements';
import { ElementZoneStrategyFactory } from 'elements-zone-strategy';
import { NgxLinkifyjsModule } from 'ngx-linkifyjs';
import { FlexLayoutModule } from '@angular/flex-layout';

// Pipes
import { LinkifyPipe } from './shared/pipes/linkfy';

import { TooltipListPipe } from './shared/pipes/tooltipList.pipe';

// Components
import { StreamComponent } from './shared/components/stream/stream.component';
import { ChatComponent } from './shared/components/chat/chat.component';
import { OpenViduVideoComponent } from './shared/components/stream/ov-video.component';
import { DialogErrorComponent } from './shared/components/dialog-error/dialog-error.component';
import { ToolbarComponent } from './shared/components/toolbar/toolbar.component';
import { ToolbarLogoComponent } from './shared/components/toolbar/logo.component';
import { RoomConfigComponent } from './shared/components/room-config/room-config.component';
import { WebComponentComponent } from './web-component/web-component.component';
import { VideoRoomComponent } from './video-room/video-room.component';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';
import { FooterComponent } from './shared/components/footer/footer.component';

// Services
import { NetworkService } from './shared/services/network/network.service';
import { OpenViduSessionService } from './shared/services/openvidu-session/openvidu-session.service';
import { UtilsService } from './shared/services/utils/utils.service';
import { DevicesService } from './shared/services/devices/devices.service';
import { RemoteUsersService } from './shared/services/remote-users/remote-users.service';
import { ChatService } from './shared/services/chat/chat.service';
import { LoggerService } from './shared/services/logger/logger.service';
import { NotificationService } from './shared/services/notifications/notification.service';
import { StorageService } from './shared/services/storage/storage.service';
import { DialogEndMeetingComponent } from './shared/components/dialog-end-meeting/dialog-end-meeting.component';
import { DialogPermissionsComponent } from './shared/components/dialog-permissions/dialog-permissions.component';
import { ParticipantsListComponent } from './shared/components/participants-list/participants-list.component';
import { ActiveUserWrapperComponent } from './shared/components/active-user-wrapper/active-user-wrapper.component';
import { UserAvatarComponent } from './shared/components/user-avatar/user-avatar.component';
import { SignalsService } from './shared/services/signals/signals.service';
import { NgxEmojiPickerModule } from 'ngx-emoji-picker';
import { MatMenuModule } from '@angular/material/menu';
import { environment } from '../environments/environment';
import { NetworkInterceptor } from './shared/services/network/network.interceptor';
import { AlertDialogComponent } from './shared/components/alert-dialog/alert-dialog.component';
import { ChatNotificationComponent } from './shared/components/chat-notification/chat-notification.component';
import { CapabilitiesPipe } from './shared/pipes/capabilities.pipe';
import { BehaviorSubject } from 'rxjs';

@NgModule({
  declarations: [
    AppComponent,
    VideoRoomComponent,
    HomeComponent,
    StreamComponent,
    ChatComponent,
    OpenViduVideoComponent,
    DialogErrorComponent,
    RoomConfigComponent,
    WebComponentComponent,
    ToolbarComponent,
    ToolbarLogoComponent,
    LinkifyPipe,
    TooltipListPipe,
    FooterComponent,
    DialogEndMeetingComponent,
    DialogPermissionsComponent,
    ParticipantsListComponent,
    ActiveUserWrapperComponent,
    UserAvatarComponent,
    AlertDialogComponent,
    ChatNotificationComponent,
    CapabilitiesPipe,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatTooltipModule,
    MatBadgeModule,
    MatGridListModule,
    MatSelectModule,
    MatOptionModule,
    MatProgressSpinnerModule,
    MatSliderModule,
    MatSidenavModule,
    MatSnackBarModule,
    AppRoutingModule,
    HttpClientModule,
    FlexLayoutModule,
    NgxEmojiPickerModule,
    NgxLinkifyjsModule.forRoot(),
    MatMenuModule,
  ],
  entryComponents: [
    DialogErrorComponent,
    WebComponentComponent,
    DialogEndMeetingComponent,
    DialogPermissionsComponent,
    AlertDialogComponent,
    ChatNotificationComponent,
  ],
  providers: [
    NetworkService,
    OpenViduSessionService,
    UtilsService,
    RemoteUsersService,
    DevicesService,
    LoggerService,
    ChatService,
    NotificationService,
    StorageService,
    SignalsService,
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: true } },
    { provide: 'BASE_API_URL', useValue: new BehaviorSubject(environment.OPENVIDU_API_URL) },
    { provide: HTTP_INTERCEPTORS, useClass: NetworkInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private injector: Injector) {
    const strategyFactory = new ElementZoneStrategyFactory(WebComponentComponent, this.injector);
    const element = createCustomElement(WebComponentComponent, { injector: this.injector, strategyFactory });
    customElements.define('openvidu-webcomponent', element);
  }

  ngDoBootstrap() {}
}
