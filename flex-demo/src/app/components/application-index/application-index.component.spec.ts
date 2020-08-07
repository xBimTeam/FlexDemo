import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationIndexComponent } from './application-index.component';

describe('ApplicationIndexComponent', () => {
  let component: ApplicationIndexComponent;
  let fixture: ComponentFixture<ApplicationIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ApplicationIndexComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
