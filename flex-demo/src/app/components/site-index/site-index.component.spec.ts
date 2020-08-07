import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteIndexComponent } from './site-index.component';

describe('SiteIndexComponent', () => {
  let component: SiteIndexComponent;
  let fixture: ComponentFixture<SiteIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SiteIndexComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
