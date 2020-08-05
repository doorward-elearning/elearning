import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { QuestionsAnswersService } from './questions-answers.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AskQuestionDialogComponent } from '../ask-question-dialog/ask-question-dialog.component';
import { MeetingQuestion } from '@doorward/common/types/openvidu';
import { OpenViduSessionService } from '../../services/openvidu-session/openvidu-session.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RemoteUsersService } from '../../services/remote-users/remote-users.service';
import { RemoteUserModel } from '../../models/remote-user-model';

@Component({
  selector: 'questions-answers',
  templateUrl: './questions-answers.component.html',
  styleUrls: ['./questions-answers.component.scss'],
})
export class QuestionsAnswersComponent implements OnInit {
  @Output() closeButtonClicked = new EventEmitter<any>();

  questions: Array<MeetingQuestion>;
  formGroups: Record<string, FormGroup> = {};

  private askQuestionDialog: MatDialogRef<any>;

  constructor(
    private qaService: QuestionsAnswersService,
    private matDialog: MatDialog,
    private ovSessionService: OpenViduSessionService,
    private formBuilder: FormBuilder,
    private remoteUsersService: RemoteUsersService
  ) {}

  ngOnInit(): void {
    this._subscribeToQuestionsAndAnswers();
  }

  askQuestion() {
    this.askQuestionDialog = this.matDialog.open(AskQuestionDialogComponent, { disableClose: true });
  }

  submitAnswer(answer: string, questionId: string) {
    this.qaService.submitAnswer(answer, questionId);
  }

  private _subscribeToQuestionsAndAnswers() {
    this.qaService.questions.subscribe(questions => {
      this.questions = questions;
      questions.forEach(question => {
        if (!this.formGroups[question.id]) {
          this.formGroups[question.id] = this.formBuilder.group({
            answer: ['', Validators.required],
          });
        }
      });
    });
  }

  private isQuestionAuthor(question) {
    return question.author === this.ovSessionService.getUser()?.getUserId();
  }

  private isAnswerAuthor(answer) {
    return answer.author === this.ovSessionService.getUser()?.getUserId();
  }

  private getMyAnswer(question: MeetingQuestion) {
    return (question.answers || []).find(answer => this.isAnswerAuthor(answer));
  }

  private getMyAnswers(question: MeetingQuestion) {
    return (question.answers || []).filter(answer => this.isAnswerAuthor(answer));
  }

  private isModerator() {
    return this.ovSessionService.getUser()?.isModerator();
  }

  private getUser(id): RemoteUserModel {
    return this.remoteUsersService.getRemoteUserByUserId(id);
  }
}
