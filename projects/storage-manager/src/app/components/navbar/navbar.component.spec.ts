import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Store, StoreModule } from '@ngrx/store';
import { addSolution } from 'src/lib/storage-manager/store/actions/solution.actions';
import { NavbarComponent } from './navbar.component';
import { featureKey, reducer } from 'src/app/store/reducers/application.reducer';
import { APP_BASE_HREF } from '@angular/common';

import defaultImportsConstant from 'src/app/default-imports.constant';
import exampleSolution from 'src/config/example-solution';


describe('NavbarComponent', () => {
    let component: NavbarComponent;
    let fixture: ComponentFixture<NavbarComponent>;

    const items = [
        { title: 'routing', disabled: true },
        { title: 'pipeline', disabled: false },
        { title: 'run pipe', disabled: false },
        { title: 'local data', disabled: false },
        { title: 'calculation', disabled: false },
        { title: 'visualization', disabled: true },
        { title: 'about', disabled: false },
    ]

    beforeEach(async () => {
        await TestBed
            .configureTestingModule({
                declarations: [NavbarComponent],
                imports: [
                    ...defaultImportsConstant,
                    StoreModule.forFeature(featureKey, reducer),
                ],
                providers: [
                    { provide: APP_BASE_HREF, useValue: '/' }
                ]
            })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(NavbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    items.forEach((item, index) => {

        it(`should display ${item.title} with the correct status disabled: ${item.disabled}`, () => {

            const optionWrappers = fixture.debugElement.queryAll(By.css('.option-wrapper'));

            expect(optionWrappers[index]).toBeTruthy();
            expect(optionWrappers[index].classes['disabled'])[item.disabled ? 'toBeTruthy' : 'toBeFalsy']();

            const optionTitle = optionWrappers[index].query(By.css('.option > .text')).nativeElement as HTMLSpanElement;
            expect(optionTitle).toBeTruthy();
            expect(optionTitle.textContent).toContain(item.title);

        });
    })

    it('should show enabled visualization feature if at least one solution setted', () => {

        const visualizationOptionWrapper = fixture.debugElement.query(By.css('#visualization-option-wrapper'));

        expect(visualizationOptionWrapper.classes['disabled']).toBeTruthy();

        const store = TestBed.inject(Store);
        store.dispatch(addSolution({ solution: exampleSolution as any }));
        fixture.detectChanges();

        expect(visualizationOptionWrapper.classes['disabled']).toBeFalsy();

    });

});
