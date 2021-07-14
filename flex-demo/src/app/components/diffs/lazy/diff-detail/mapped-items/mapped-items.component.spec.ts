import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MappedItemsComponent } from './mapped-items.component';

describe('MappedItemsComponent', () => {
  let component: MappedItemsComponent;
  let fixture: ComponentFixture<MappedItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MappedItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MappedItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
