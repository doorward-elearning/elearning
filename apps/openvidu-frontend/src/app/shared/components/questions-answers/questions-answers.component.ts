import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { QuestionsAnswersService } from './questions-answers.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AskQuestionDialogComponent } from '../ask-question-dialog/ask-question-dialog.component';
import { MeetingQuestion } from '@doorward/common/types/openvidu';

@Component({
  selector: 'questions-answers',
  templateUrl: './questions-answers.component.html',
  styleUrls: ['./questions-answers.component.scss'],
})
export class QuestionsAnswersComponent implements OnInit {
  @Output() closeButtonClicked = new EventEmitter<any>();

  questions: Array<MeetingQuestion>;

  private askQuestionDialog: MatDialogRef<any>;

  constructor(private qaService: QuestionsAnswersService, private matDialog: MatDialog) {}

  ngOnInit(): void {
    this._subscribeToQuestionsAndAnswers();
  }

  askQuestion() {
    this.askQuestionDialog = this.matDialog.open(AskQuestionDialogComponent, { disableClose: true });
  }

  private _subscribeToQuestionsAndAnswers() {
    this.qaService.questions.subscribe(questions => {
      this.questions = questions;
    });
  }
}
