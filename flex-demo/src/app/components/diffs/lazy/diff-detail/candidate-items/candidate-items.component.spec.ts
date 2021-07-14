import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateItemsComponent } from './candidate-items.component';

describe('CandidateItemsComponent', () => {
  let component: CandidateItemsComponent;
  let fixture: ComponentFixture<CandidateItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
