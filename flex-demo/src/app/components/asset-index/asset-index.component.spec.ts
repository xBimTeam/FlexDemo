import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetIndexComponent } from './asset-index.component';

describe('AssetIndexComponent', () => {
  let component: AssetIndexComponent;
  let fixture: ComponentFixture<AssetIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
