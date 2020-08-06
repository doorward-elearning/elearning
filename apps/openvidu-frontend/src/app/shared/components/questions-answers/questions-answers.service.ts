import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { SignalsService } from '../../services/signals/signals.service';
import { MeetingQuestion, MeetingQuestionTypes } from '@doorward/common/types/openvidu';
import SignalTypes from '@doorward/common/utils/meetingSignalTypes';
import { OpenViduSessionService } from '../../services/openvidu-session/openvidu-session.service';
import { RemoteUsersService } from '../../services/remote-users/remote-users.service';
import Tools from '@doorward/common/utils/Tools';
import { NotificationService } from '../../services/notifications/notification.service';
import { UtilsService } from '../../services/utils/utils.service';
import { SideNavComponents } from '../../../video-room/video-room.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AnswerQuestionDialogComponent } from '../answer-question-dialog/answer-question-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class QuestionsAnswersService {
  private _questions: Array<MeetingQuestion> = [];

  private questionsSubject = new BehaviorSubject<Array<MeetingQuestion>>([]);
  private numAnswersSubject = new BehaviorSubject<number>(0);
  private numQuestionsSubject = new BehaviorSubject<number>(0);
  private questionDialogRef: MatDialogRef<AnswerQuestionDialogComponent, string>;
  private questionDialogResponse: Subscription;

  questions = new Observable<Array<MeetingQuestion>>();
  numNewQuestions = new Observable<number>();
  numNewAnswers = new Observable<number>();

  constructor(
    private signalsService: SignalsService,
    private ovSessionService: OpenViduSessionService,
    private remoteUsersService: RemoteUsersService,
    private notificationService: NotificationService,
    private utilsService: UtilsService,
    private matDialog: MatDialog
  ) {
    this.questions = this.questionsSubject.asObservable();
    this.numNewQuestions = this.numQuestionsSubject.asObservable();
    this.numNewAnswers = this.numAnswersSubject.asObservable();
    this.questions.subscribe(questions => {
      this._questions = questions;
    });
  }

  subscribeToQuestion() {
    this.signalsService.subscribe(SignalTypes.ASK_QUESTION, data => {
      this.questionsSubject.next([...this._questions, data]);

      if (this.questionDialogResponse) {
        this.questionDialogResponse.unsubscribe();
        this.questionDialogRef.close();
        this.numQuestionsSubject.next(this.numQuestionsSubject.getValue() + 1);
      }

      this.questionDialogRef = this.matDialog.open(AnswerQuestionDialogComponent, {
        disableClose: true,
        data: {
          question: data,
        },
      });
      this.questionDialogResponse = this.questionDialogRef.afterClosed().subscribe(response => {
        if (response) {
          this.submitAnswer(response, data.id);
        } else {
          this.numQuestionsSubject.next(this.numQuestionsSubject.getValue() + 1);
        }
      });
    });
  }

  clearNewQuestions() {
    this.numQuestionsSubject.next(0);
  }

  clearNewAnswers() {
    this.numAnswersSubject.next(0);
  }

  subscribeToAnswers() {
    this.signalsService.subscribe(SignalTypes.SUBMIT_ANSWER, (data, event, user) => {
      this.numAnswersSubject.next(this.numAnswersSubject.getValue() + 1);
      const question = this._questions.find(que => que.id === data.questionId);
      if (question) {
        question.answers = [...(question.answers || []), data];
      }
      if (!this.utilsService.isQuestionsAndAnswersOpen()) {
        this.notificationService.newMessage({
          title: 'Q/A',
          icon: 'question_answer',
          sender: user.session.user,
          message: 'Responded to a question.',
          onClick: () => {
            this.utilsService.toggleSideNav(SideNavComponents.QUESTIONS_AND_ANSWERS);
          },
        });
      }
      this.questionsSubject.next([...this._questions]);
    });
  }

  askQuestion(type: MeetingQuestionTypes, question: string) {
    const newQuestion = {
      id: Tools.randomString(6),
      type,
      question,
      author: this.ovSessionService.getUser().getUserId(),
    };
    this.signalsService.send(SignalTypes.ASK_QUESTION, newQuestion, this.remoteUsersService.getPublishers());
    this.questionsSubject.next([...this._questions, newQuestion]);
  }

  submitAnswer(answer: string, questionId: string) {
    const question = this._questions.find(que => questionId === que.id);
    if (question) {
      const newAnswer = {
        id: Tools.randomString(6),
        questionId,
        author: this.ovSessionService.getUser().getUserId(),
        answer,
      };
      this.signalsService.send(SignalTypes.SUBMIT_ANSWER, newAnswer, [
        this.remoteUsersService.getRemoteUserByUserId(question.author),
      ]);
      question.answers = [...(question.answers || []), newAnswer];
      this.questionsSubject.next([...this._questions]);
    }
  }
}
