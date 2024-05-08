import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ControlContainer, FormControl, FormGroup } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { IContainer, IGood, ISolution } from '@smgr/interfaces';
import { AppModule } from 'src/app/app.module';
import defaultImportsConstant from 'src/app/default-imports.constant';
import { addSolutions } from 'src/lib/storage-manager/store/actions/solution.actions';

import { CalculationContextOverviewComponent } from './calculation-context-overview.component';

describe('CalculationContextOverviewComponent', () => {
  let component: CalculationContextOverviewComponent;
  let fixture: ComponentFixture<CalculationContextOverviewComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalculationContextOverviewComponent],
      imports: [
        ...defaultImportsConstant,

        AppModule
      ],
      providers: [
        {
          provide: ControlContainer,
          useValue: {
            control: new FormGroup({
              'containerHeight': new FormControl(500),
              'containerWidth': new FormControl(500),
              'unit': new FormControl('mm')
            })
          }
        }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CalculationContextOverviewComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Solutions Overview', () => {

    const solutions: ISolution[] = [
      {
        id: 'solution1', description: 'solution 1', 'container': {
          goods: [] as IGood[]
        } as IContainer,
        calculationSource: {
          title: 'static 1'
        }
      } as ISolution,
      {
        id: 'solution2', description: 'solution 2', 'container': {
          goods: [] as IGood[]
        } as IContainer,
        calculationSource: {
          title: 'static 2'
        }
      } as ISolution,
      {
        id: 'solution3', description: 'solution 3', 'container': {
          goods: [] as IGood[],
        } as IContainer,
        calculationSource: {
          title: 'static 3'
        }
      } as ISolution,
    ];

    beforeEach(() => {
      const store = TestBed.inject(Store);
      store.dispatch(addSolutions({
        solutions: solutions
      }));
    });

    it('should display all available solutions', () => {

      fixture.detectChanges();
  
      const solutionPreviews = debugElement.queryAll(By.css('.solution-preview'));  
      expect(solutionPreviews.length).toBe(solutions.length);
    });

    it('should display descriptions for all solutions within editable input', () => {

      fixture.detectChanges();
  
      const headlineInputs = debugElement.queryAll(By.css('.solution-preview .headline .text input'));

      const inputElements: HTMLInputElement[] = headlineInputs.map(element => (element.nativeElement as HTMLInputElement));
      const inputTexts = inputElements.map(element => element.value).sort();
      const solutionDescriptions = solutions.map(solution => solution.description).sort() as string[];

      expect(inputElements.some(element => element.readOnly)).toBeFalsy();
      expect(inputElements.some(element => element.disabled)).toBeFalsy();
      expect(inputTexts).toEqual(solutionDescriptions);
    });

    it('should display calculation source title for all solutions within sub title', () => {

      fixture.detectChanges();
  
      const subTitles = debugElement.queryAll(By.css('.solution-preview .sub-title'));
      const sortedSubTitles: string[] = subTitles.map(subTitle => subTitle.nativeElement.textContent).sort();
      const sortedCalculationSources = solutions.map(solution => solution.calculationSource.title).sort();
      expect(sortedSubTitles.every((subTitle, index) => sortedCalculationSources.indexOf(sortedCalculationSources[index]) > -1)).toBeTruthy();
    });
  });

});
