import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedQuestionListComponent } from './savedQuestionList.component';

describe('SavedQuestionListComponent', () => {
  let component: SavedQuestionListComponent;
  let fixture: ComponentFixture<SavedQuestionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavedQuestionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedQuestionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
