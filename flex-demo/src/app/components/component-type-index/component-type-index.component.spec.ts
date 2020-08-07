import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentTypeIndexComponent } from './component-type-index.component';

describe('ComponentTypeIndexComponent', () => {
  let component: ComponentTypeIndexComponent;
  let fixture: ComponentFixture<ComponentTypeIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ComponentTypeIndexComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentTypeIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
