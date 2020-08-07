import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaceIndexComponent } from './space-index.component';

describe('SpaceIndexComponent', () => {
  let component: SpaceIndexComponent;
  let fixture: ComponentFixture<SpaceIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpaceIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpaceIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
