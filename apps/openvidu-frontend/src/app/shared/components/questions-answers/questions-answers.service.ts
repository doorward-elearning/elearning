import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SignalsService } from '../../services/signals/signals.service';
import { MeetingQuestion, MeetingQuestionTypes } from '@doorward/common/types/openvidu';
import SignalTypes from '@doorward/common/utils/meetingSignalTypes';
import { OpenViduSessionService } from '../../services/openvidu-session/openvidu-session.service';
import { RemoteUsersService } from '../../services/remote-users/remote-users.service';

@Injectable({
  providedIn: 'root',
})
export class QuestionsAnswersService {
  private _questions: Array<MeetingQuestion> = [];

  private questionsSubject = new BehaviorSubject<Array<MeetingQuestion>>([]);

  questions = new Observable<Array<MeetingQuestion>>();

  constructor(
    private signalsService: SignalsService,
    private ovSessionService: OpenViduSessionService,
    private remoteUsersService: RemoteUsersService
  ) {
    this.questions = this.questionsSubject.asObservable();
    this._subscribeToQuestion();
  }

  private _subscribeToQuestion() {
    this.signalsService.subscribe(SignalTypes.ASK_QUESTION, data => {
      this.questionsSubject.next([...this._questions, data]);
    });
  }

  askQuestion(type: MeetingQuestionTypes, question: string) {
    this.signalsService.send(
      SignalTypes.ASK_QUESTION,
      {
        type,
        question,
        author: this.ovSessionService.getUser().getUserId(),
      },
      this.remoteUsersService.getPublishers()
    );
  }
}
