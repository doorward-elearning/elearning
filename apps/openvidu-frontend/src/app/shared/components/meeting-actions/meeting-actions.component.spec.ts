import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingActionsComponent } from './meeting-actions.component';

describe('MeetingActionsComponent', () => {
  let component: MeetingActionsComponent;
  let fixture: ComponentFixture<MeetingActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetingActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
