import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { UtilsService } from '../../services/utils/utils.service';
import { MeetingCapabilitiesComponent } from '@doorward/common/types/openvidu';
import { LocalUserModel } from '../../models/local-user-model';
import { OpenViduSessionService } from '../../services/openvidu-session/openvidu-session.service';
import { SignalsService } from '../../services/signals/signals.service';
import SignalTypes from '@doorward/common/utils/meetingSignalTypes';
import { RemoteUsersService } from '../../services/remote-users/remote-users.service';
import { QuestionsAnswersService } from '../questions-answers/questions-answers.service';

@Component({
  selector: 'meeting-actions',
  templateUrl: './meeting-actions.component.html',
  styleUrls: ['./meeting-actions.component.scss'],
})
export class MeetingActionsComponent extends MeetingCapabilitiesComponent implements OnInit {
  @Input() isFullSize = false;
  @Input() whiteboardActive: boolean;

  @Output() toggleWhiteboard = new EventEmitter<any>();
  @Output() toggleFullSize = new EventEmitter<any>();

  @Output() toggleQuestionsAndAnswers = new EventEmitter<any>();

  isFullScreen = false;
  localUser: LocalUserModel;
  newQuestions = 0;
  newAnswers = 0;

  constructor(
    private utilsService: UtilsService,
    private ovSessionService: OpenViduSessionService,
    private signalsService: SignalsService,
    private remoteUsersService: RemoteUsersService,
    private qaService: QuestionsAnswersService
  ) {
    super();
  }

  ngOnInit(): void {
    this._subscribeToLocalUser();
    this._subscribeToNewQuestionsAndAnswers();
    this.utilsService.sidenavContentObs.subscribe(() => {
      this._onSideBarToggle();
    });
  }

  private _onSideBarToggle() {
    this.qaService.clearNewQuestions();
    this.qaService.clearNewAnswers();
  }

  private _subscribeToNewQuestionsAndAnswers() {
    this.qaService.numNewQuestions.subscribe(questions => {
      if (!this.utilsService.isQuestionsAndAnswersOpen()) {
        this.newQuestions = questions;
      }
    });
    this.qaService.numNewAnswers.subscribe(answers => {
      if (!this.utilsService.isQuestionsAndAnswersOpen()) {
        this.newAnswers = answers;
      }
    });
  }

  private _subscribeToLocalUser() {
    this.ovSessionService.userObs.subscribe(user => {
      this.localUser = user;
    });
  }

  @HostListener('window:resize', ['$event'])
  sizeChange(event) {
    const maxHeight = window.screen.height;
    const maxWidth = window.screen.width;
    const curHeight = window.innerHeight;
    const curWidth = window.innerWidth;
    if (maxWidth !== curWidth && maxHeight !== curHeight) {
      this.isFullScreen = true;
    }
  }

  toggleFullScreen() {
    this.utilsService.toggleFullscreen('videoRoomNavBar');
    this.isFullScreen = !this.isFullScreen;
  }

  toggleRaisingHand() {
    if (!this.localUser.isRaisingHand()) {
      this.signalsService.send(SignalTypes.RAISE_HAND, undefined, this.remoteUsersService.getModerators());
    }
    this.ovSessionService.updateLocalUserSession(user => {
      user.toggleRaisingHand();
      return user;
    });
  }

  toggleBounds() {
    this.toggleFullSize.emit();
  }

  toggleQAPanel() {
    this._onSideBarToggle();
    this.toggleQuestionsAndAnswers.emit();
  }
}
