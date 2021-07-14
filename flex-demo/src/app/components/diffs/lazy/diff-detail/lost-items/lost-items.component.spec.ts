import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LostItemsComponent } from './lost-items.component';

describe('LostItemsComponent', () => {
  let component: LostItemsComponent;
  let fixture: ComponentFixture<LostItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LostItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LostItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
