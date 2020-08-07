import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantIndexComponent } from './tenant-index.component';

describe('LoginComponent', () => {
  let component: TenantIndexComponent;
  let fixture: ComponentFixture<TenantIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TenantIndexComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
