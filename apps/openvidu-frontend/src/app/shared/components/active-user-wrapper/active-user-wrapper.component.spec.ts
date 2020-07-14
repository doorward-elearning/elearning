import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveUserWrapperComponent } from './active-user-wrapper.component';

describe('ActiveUserWrapperComponent', () => {
  let component: ActiveUserWrapperComponent;
  let fixture: ComponentFixture<ActiveUserWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveUserWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveUserWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
