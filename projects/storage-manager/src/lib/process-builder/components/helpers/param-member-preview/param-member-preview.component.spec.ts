import { ComponentFixture, TestBed } from '@angular/core/testing';
import defaultImportsConstant from 'src/app/default-imports.constant';
import { IParamMember } from 'src/lib/process-builder/interfaces/param-member.interface';
import { ProcessBuilderModule } from 'src/lib/process-builder/process-builder.module';

import { ParamMemberPreviewComponent } from './param-member-preview.component';

describe('ParamMemberPreviewComponent', () => {
  let component: ParamMemberPreviewComponent;
  let fixture: ComponentFixture<ParamMemberPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParamMemberPreviewComponent ],
      imports: [
        ...defaultImportsConstant,

        ProcessBuilderModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParamMemberPreviewComponent);
    component = fixture.componentInstance;
    component.paramMember = { } as IParamMember;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
