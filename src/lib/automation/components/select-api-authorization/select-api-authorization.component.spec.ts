import { ComponentFixture, TestBed } from '@angular/core/testing';
import defaultImportsConstant from 'src/app/default-imports.constant';
import { AutomationModule } from '../../automation.module';

import { SelectApiAuthorizationComponent } from './select-api-authorization.component';

describe('SelectApiAuthorizationComponent', () => {
  let component: SelectApiAuthorizationComponent;
  let fixture: ComponentFixture<SelectApiAuthorizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectApiAuthorizationComponent ],
      imports: [
        ...defaultImportsConstant,

        AutomationModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectApiAuthorizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
