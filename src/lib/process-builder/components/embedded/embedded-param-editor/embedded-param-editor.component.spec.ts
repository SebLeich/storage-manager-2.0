import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmbeddedParamEditorComponent } from './embedded-param-editor.component';

describe('EmbeddedParamEditorComponent', () => {
  let component: EmbeddedParamEditorComponent;
  let fixture: ComponentFixture<EmbeddedParamEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmbeddedParamEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmbeddedParamEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
