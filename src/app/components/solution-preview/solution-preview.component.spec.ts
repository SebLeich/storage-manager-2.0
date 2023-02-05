import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppModule } from 'src/app/app.module';
import defaultImports from 'src/app/default-imports.constant';
import { ISolution } from 'src/lib/storage-manager-store/interfaces/solution.interface';
import { addSolution, setCurrentSolution } from 'src/app/store/actions/i-solution.actions';
import { v4 as generateGuid } from 'uuid';

import { SolutionPreviewComponent } from './solution-preview.component';
import moment from 'moment';
import { IGood } from 'src/lib/storage-manager-store/interfaces/good.interface';
import { VISUALIZER_CONTEXT } from 'src/app/interfaces/i-visualizer-context.service';

describe('SolutionPreviewComponent', () => {
  let component: SolutionPreviewComponent;
  let fixture: ComponentFixture<SolutionPreviewComponent>;
  let store: Store;
  const solution = {
    calculated: moment().format(),
    description: 'test solution',
    container: {
      goods: [] as IGood[]
    },
    id: generateGuid()
  } as ISolution;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SolutionPreviewComponent],
      imports: [
        ...defaultImports,

        AppModule,
        AppRoutingModule
      ],
      providers: [
        { provide: VISUALIZER_CONTEXT, useValue: {} }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SolutionPreviewComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);

    store.dispatch(addSolution({
      solution: solution
    }));

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display solution description', () => {
    const solutionHeadline = fixture.debugElement.queryAll(By.css('.expansion-panel-headline'))[0];
    store.dispatch(setCurrentSolution({ solution: solution }));
    fixture.detectChanges();

    expect((solutionHeadline.nativeElement as HTMLDivElement).innerHTML).toContain(solution.description!);
  });

  it('should display solution calculation date', () => {
    store.dispatch(setCurrentSolution({ solution: solution }));
    fixture.detectChanges();

    const solutionCalculationDate = fixture.debugElement.queryAll(By.css('.calculated'))[0];
    expect((solutionCalculationDate.nativeElement as HTMLDivElement).innerHTML).toContain(moment(solution.calculated).format('DD.MM.YYYY HH:mm'));
  });

});
