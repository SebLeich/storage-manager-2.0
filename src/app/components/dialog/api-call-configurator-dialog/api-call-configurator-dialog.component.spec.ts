import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiCallConfiguratorDialogComponent } from './api-call-configurator-dialog.component';

describe('ApiCallConfiguratorDialogComponent', () => {
  let component: ApiCallConfiguratorDialogComponent;
  let fixture: ComponentFixture<ApiCallConfiguratorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApiCallConfiguratorDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiCallConfiguratorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
