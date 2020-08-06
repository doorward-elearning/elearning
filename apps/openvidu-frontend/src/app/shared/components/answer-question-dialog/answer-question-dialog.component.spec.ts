import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerQuestionDialogComponent } from './answer-question-dialog.component';

describe('AnswerQuestionDialogComponent', () => {
  let component: AnswerQuestionDialogComponent;
  let fixture: ComponentFixture<AnswerQuestionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnswerQuestionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswerQuestionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
