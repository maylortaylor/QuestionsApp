import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitQuestionComponent } from './submitQuestion.component';

describe('SubmitQuestionComponent', () => {
  let component: SubmitQuestionComponent;
  let fixture: ComponentFixture<SubmitQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
