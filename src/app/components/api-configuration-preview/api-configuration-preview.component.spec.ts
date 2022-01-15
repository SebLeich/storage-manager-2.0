import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiConfigurationPreviewComponent } from './api-configuration-preview.component';

describe('ApiConfigurationPreviewComponent', () => {
  let component: ApiConfigurationPreviewComponent;
  let fixture: ComponentFixture<ApiConfigurationPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApiConfigurationPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiConfigurationPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
