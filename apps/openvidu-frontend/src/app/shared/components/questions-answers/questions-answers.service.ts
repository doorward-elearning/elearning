import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SignalsService } from '../../services/signals/signals.service';
import { MeetingQuestion, MeetingQuestionTypes } from '@doorward/common/types/openvidu';
import SignalTypes from '@doorward/common/utils/meetingSignalTypes';
import { OpenViduSessionService } from '../../services/openvidu-session/openvidu-session.service';
import { RemoteUsersService } from '../../services/remote-users/remote-users.service';
import Tools from '@doorward/common/utils/Tools';

@Injectable({
  providedIn: 'root',
})
export class QuestionsAnswersService {
  private _questions: Array<MeetingQuestion> = [];

  private questionsSubject = new BehaviorSubject<Array<MeetingQuestion>>([]);
  private numAnswersSubject = new BehaviorSubject<number>(0);
  private numQuestionsSubject = new BehaviorSubject<number>(0);

  questions = new Observable<Array<MeetingQuestion>>();
  numNewQuestions = new Observable<number>();
  numNewAnswers = new Observable<number>();

  constructor(
    private signalsService: SignalsService,
    private ovSessionService: OpenViduSessionService,
    private remoteUsersService: RemoteUsersService
  ) {
    this.questions = this.questionsSubject.asObservable();
    this.numNewQuestions = this.numQuestionsSubject.asObservable();
    this.numNewAnswers = this.numAnswersSubject.asObservable();
    this.questions.subscribe(questions => {
      this._questions = questions;
    });
    this.ovSessionService.userObs.subscribe(user => {
      if (!this._questions.length && user.getUserId() && user.isModerator()) {
        setTimeout(() => {
          this.askQuestion(MeetingQuestionTypes.TEXT_INPUT, 'What is the answer for the following question?');
          this.askQuestion(MeetingQuestionTypes.TRUE_OR_FALSE, 'What is the truth value of this question?');
        }, 1000);
      }
    });
  }

  subscribeToQuestion() {
    this.signalsService.subscribe(SignalTypes.ASK_QUESTION, data => {
      this.numQuestionsSubject.next(this.numQuestionsSubject.getValue() + 1);
      this.questionsSubject.next([...this._questions, data]);
    });
  }

  clearNewQuestions() {
    this.numQuestionsSubject.next(0);
  }

  clearNewAnswers() {
    this.numAnswersSubject.next(0);
  }

  subscribeToAnswers() {
    this.signalsService.subscribe(SignalTypes.SUBMIT_ANSWER, data => {
      this.numAnswersSubject.next(this.numAnswersSubject.getValue() + 1);
      const question = this._questions.find(que => que.id === data.questionId);
      if (question) {
        question.answers = [...(question.answers || []), data];
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
