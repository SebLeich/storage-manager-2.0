import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppModule } from 'src/app/app.module';
import defaultImportsConstant from 'src/app/default-imports.constant';

import { NoSolutionDialogComponent } from './no-solution-dialog.component';

describe('NoSolutionDialogComponent', () => {
  let component: NoSolutionDialogComponent;
  let fixture: ComponentFixture<NoSolutionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoSolutionDialogComponent ],
      imports: [
        ...defaultImportsConstant,

        AppModule,
        AppRoutingModule
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
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoSolutionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
