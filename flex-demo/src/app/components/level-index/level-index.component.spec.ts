import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelIndexComponent } from './level-index.component';

describe('LevelIndexComponent', () => {
  let component: LevelIndexComponent;
  let fixture: ComponentFixture<LevelIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LevelIndexComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LevelIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
