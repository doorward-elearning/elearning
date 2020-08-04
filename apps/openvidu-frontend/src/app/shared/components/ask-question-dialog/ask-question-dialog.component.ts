import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuestionsAnswersService } from '../questions-answers/questions-answers.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MeetingQuestionTypes } from '@doorward/common/types/openvidu';

@Component({
  selector: 'app-ask-question-dialog',
  templateUrl: './ask-question-dialog.component.html',
  styleUrls: ['./ask-question-dialog.component.scss'],
})
export class AskQuestionDialogComponent implements OnInit {
  questionForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private matDialogRef: MatDialogRef<any>,
    private qaService: QuestionsAnswersService
  ) {}

  ngOnInit(): void {
    this.questionForm = this.formBuilder.group({
      type: ['', Validators.required],
      question: ['', Validators.required],
    });
  }

  onSubmitQuestion() {
    this.qaService.askQuestion(
      this.questionForm.get('type').value as MeetingQuestionTypes,
      this.questionForm.get('question').value
    );
  }
}
