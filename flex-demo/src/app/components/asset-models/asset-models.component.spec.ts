import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetModelsComponent } from './asset-models.component';

describe('AssetModelsComponent', () => {
  let component: AssetModelsComponent;
  let fixture: ComponentFixture<AssetModelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetModelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetModelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
