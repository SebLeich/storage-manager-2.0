import { ComponentFixture, TestBed } from '@angular/core/testing';
import defaultImportsConstant from 'src/app/default-imports.constant';
import { AutomationModule } from '../../automation.module';

import { ApiConfigurationPreviewComponent } from './api-configuration-preview.component';

describe('ApiConfigurationPreviewComponent', () => {
  let component: ApiConfigurationPreviewComponent;
  let fixture: ComponentFixture<ApiConfigurationPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApiConfigurationPreviewComponent ],
      imports: [
        ...defaultImportsConstant,

        AutomationModule
      ]
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
