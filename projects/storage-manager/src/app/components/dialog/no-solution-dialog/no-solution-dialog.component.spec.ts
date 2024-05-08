import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { AppModule } from 'src/app/app.module';
import defaultImportsConstant from 'src/app/default-imports.constant';
import { NoSolutionDialogComponent } from './no-solution-dialog.component';

describe('NoSolutionDialogComponent', () => {
  let component: NoSolutionDialogComponent;
  let fixture: ComponentFixture<NoSolutionDialogComponent>;
  let debugElement: DebugElement;

  const targets = [
    { class: 'data-pipeline', tileName: 'data pipeline app' },
    { class: 'static-orders', tileName: 'static order' },
    { class: 'exemplary-data', tileName: 'exemplary data' },
    { class: 'exemplary-solution', tileName: 'exemplary solution' },
    { class: 'upload-own-solution', tileName: 'upload solution' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoSolutionDialogComponent ],
      imports: [
        ...defaultImportsConstant,

        AppModule
      ],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            closeControlEnabled: true
          }
        },
        {
          provide: MatDialogRef<NoSolutionDialogComponent>,
          useValue: {
            close: () => {
              
            }
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoSolutionDialogComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  targets.forEach(target => {
    it(`should contain ${target.tileName} tile`, () => {
      const tile = debugElement.query(By.css(`.${target.class}`));
      expect(tile).toBeTruthy();
    });
  });

});
