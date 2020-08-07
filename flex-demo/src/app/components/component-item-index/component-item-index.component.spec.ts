import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentItemIndexComponent } from './component-item-index.component';

describe('ComponentItemIndexComponent', () => {
  let component: ComponentItemIndexComponent;
  let fixture: ComponentFixture<ComponentItemIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ComponentItemIndexComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentItemIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
