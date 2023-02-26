import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppModule } from 'src/app/app.module';
import defaultImportsConstant from 'src/app/default-imports.constant';
import { ISolution } from '@smgr/interfaces';
import { SolutionVisualizationDialogComponent } from './solution-visualization-dialog.component';

describe('SolutionVisualizationDialogComponent', () => {
  let component: SolutionVisualizationDialogComponent;
  let fixture: ComponentFixture<SolutionVisualizationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SolutionVisualizationDialogComponent],
      imports: [
        ...defaultImportsConstant,

        AppModule,
        AppRoutingModule
      ],
      providers: [
        {
          provide: MatDialogRef, useValue: {
            close: () => {

            }
          }
        },
        { provide: MAT_DIALOG_DATA, useValue: {} as ISolution }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SolutionVisualizationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
