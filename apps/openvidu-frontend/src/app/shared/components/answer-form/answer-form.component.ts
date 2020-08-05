import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MeetingQuestion } from '@doorward/common/types/openvidu';

@Component({
  selector: 'answer-form',
  templateUrl: './answer-form.component.html',
  styleUrls: ['./answer-form.component.css'],
})
export class AnswerFormComponent implements OnInit {
  @Input() question: MeetingQuestion;
  formGroup: FormGroup;

  @Output() submitAnswer = new EventEmitter<string>();

  constructor(formBuilder: FormBuilder) {
    this.formGroup = formBuilder.group({
      answer: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onFormSubmit() {
    this.submitAnswer.emit(this.formGroup.get('answer').value);
  }
}
