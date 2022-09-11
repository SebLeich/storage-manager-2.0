import { ComponentFixture, TestBed } from '@angular/core/testing';
import defaultImportsConstant from 'src/app/default-imports.constant';
import { ProcessBuilderComponentService } from './process-builder-component.service';

import { ProcessBuilderComponent } from './process-builder.component';

describe('ProcessBuilderComponent', () => {
  let component: ProcessBuilderComponent;
  let fixture: ComponentFixture<ProcessBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProcessBuilderComponent],
      imports: [
        ...defaultImportsConstant
      ],
      providers: [
        {
          provide: ProcessBuilderComponentService, useValue: {
            dispose: () => {
                
            },
            init: () => {

            }
          }
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
