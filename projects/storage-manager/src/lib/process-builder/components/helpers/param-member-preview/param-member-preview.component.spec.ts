import { ComponentFixture, TestBed } from '@angular/core/testing';
import defaultImportsConstant from 'src/app/default-imports.constant';
import { IParamMember } from 'src/lib/process-builder/interfaces/param-member.interface';

import { ParamMemberPreviewComponent } from './param-member-preview.component';
import { ParamMemberPathPreviewComponent } from '../param-member-path-preview/param-member-path-preview.component';

describe('ParamMemberPreviewComponent', () => {
  let component: ParamMemberPreviewComponent;
  let fixture: ComponentFixture<ParamMemberPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParamMemberPreviewComponent, ParamMemberPathPreviewComponent ],
      imports: [
        ...defaultImportsConstant
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
