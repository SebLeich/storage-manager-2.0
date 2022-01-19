import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoSolutionDialogComponent } from './no-solution-dialog.component';

describe('NoSolutionDialogComponent', () => {
  let component: NoSolutionDialogComponent;
  let fixture: ComponentFixture<NoSolutionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoSolutionDialogComponent ]
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
