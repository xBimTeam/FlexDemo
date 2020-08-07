import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemIndexComponent } from './system-index.component';

describe('SystemIndexComponent', () => {
  let component: SystemIndexComponent;
  let fixture: ComponentFixture<SystemIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SystemIndexComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
