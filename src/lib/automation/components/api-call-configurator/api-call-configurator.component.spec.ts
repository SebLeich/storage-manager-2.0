import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiCallConfiguratorComponent } from './api-call-configurator.component';

describe('ApiCallConfiguratorComponent', () => {
  let component: ApiCallConfiguratorComponent;
  let fixture: ComponentFixture<ApiCallConfiguratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApiCallConfiguratorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiCallConfiguratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
