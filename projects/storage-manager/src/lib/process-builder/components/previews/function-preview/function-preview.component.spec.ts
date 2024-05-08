import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { FunctionPreviewComponent } from './function-preview.component';
import { IFunction } from 'src/lib/process-builder/interfaces/function.interface';
import { v4 as generateGuid } from 'uuid';
import { InputParamPipe } from '@/lib/process-builder/pipes/input-param.pipe';
import { OutputParamPipe } from '@/lib/process-builder/pipes/output-param.pipe';

import defaultImportsConstant from 'src/app/default-imports.constant';
import { NgLetModule } from 'ng-let';
import { CommaSeparatedListComponent } from '@/lib/comma-separated-list/components/comma-separated-list/comma-separated-list.component';



describe('FunctionPreviewComponent', () => {
    const createComponent = createComponentFactory({
        component: FunctionPreviewComponent,
        declarations: [CommaSeparatedListComponent, InputParamPipe, OutputParamPipe],
        imports: [
            ...defaultImportsConstant,

            NgLetModule
        ]
    });

    let spectator: Spectator<FunctionPreviewComponent>;

    beforeEach(() => spectator = createComponent());

    it('should create', () => {
        expect(spectator.component).toBeTruthy();
    });

    it('should display function name', () => {
        const func: IFunction = { name: generateGuid() } as IFunction;
        spectator.setInput('func', func);

        const componentText = (spectator.debugElement.nativeElement as HTMLElement).textContent ?? '';
        expect(componentText.toLowerCase()).toContain(func.name.toLowerCase());
    });

    it('should display function description', () => {
        const func: IFunction = { description: generateGuid() } as IFunction;
        spectator.setInput('func', func);

        const componentText = (spectator.debugElement.nativeElement as HTMLElement).innerText;
        expect(componentText).toContain(func.description!);
    });

    [true, false].forEach(customImplementationRequired => {

        it(`should display custom implementation required hint: ${customImplementationRequired}`, () => {
            const func: IFunction = { requireCustomImplementation: customImplementationRequired } as IFunction;
            spectator.setInput('func', func);

            const componentText = (spectator.debugElement.nativeElement as HTMLElement).innerText;
            if (customImplementationRequired) {
                expect(componentText).toContain(spectator.component.customImplementationRequiredText);
            }
            else {
                expect(componentText).not.toContain(spectator.component.customImplementationRequiredText);
            }
        });

    });

});
