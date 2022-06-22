import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParamEditorComponent } from './param-editor.component';

describe('ParamEditorComponent', () => {
  let component: ParamEditorComponent;
  let fixture: ComponentFixture<ParamEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParamEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParamEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
