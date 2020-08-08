import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MeetingQuestion } from '@doorward/common/types/openvidu';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RemoteUsersService } from '../../services/remote-users/remote-users.service';

export interface AnswerQuestionDialogData {
  question: MeetingQuestion;
}
@Component({
  selector: 'app-answer-question-dialog',
  templateUrl: './answer-question-dialog.component.html',
  styleUrls: ['./answer-question-dialog.component.css'],
})
export class AnswerQuestionDialogComponent implements OnInit {
  formGroup: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: AnswerQuestionDialogData,
    private dialogRef: MatDialogRef<AnswerQuestionDialogComponent, string>,
    private formBuilder: FormBuilder,
    private remoteUsersService: RemoteUsersService
  ) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      answer: ['', Validators.required],
    });
  }

  onAnswer() {
    const answer = this.formGroup.get('answer').value;
    this.dialogRef.close(answer);
  }

  getQuestionAuthor() {
    return this.remoteUsersService.getRemoteUserByUserId(this.data.question.author);
  }

  getAuthorAvatar() {
    return this.getQuestionAuthor()?.getAvatar();
  }

  getAuthorNickname() {
    return this.getQuestionAuthor()?.getNickname();
  }
}
