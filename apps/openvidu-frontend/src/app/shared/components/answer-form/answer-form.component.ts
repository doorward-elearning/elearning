import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MeetingQuestion } from '@doorward/common/types/openvidu';

@Component({
  selector: 'answer-form',
  templateUrl: './answer-form.component.html',
  styleUrls: ['./answer-form.component.css'],
})
export class AnswerFormComponent implements OnInit {
  @Input() question: MeetingQuestion;
  @Input() formGroup: FormGroup;

  constructor() {}

  ngOnInit(): void {}
}
