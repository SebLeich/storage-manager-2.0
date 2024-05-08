import { PROCESS_BUILDER_CONFIG_TOKEN } from 'src/lib/process-builder/interfaces/process-builder-config.interface';
import { EmbeddedFunctionImplementationComponent } from './embedded-function-implementation.component';
import { ControlContainer, FormControl, FormGroup } from '@angular/forms';
import { CodeEditorModule } from '@/lib/code-editor/code-editor.module';
import { CodemirrorRepository } from '@/lib/core/codemirror.repository';
import { StoreModule } from '@ngrx/store';
import { Spectator, createComponentFactory } from '@ngneat/spectator';

import defaultImportsConstant from 'src/app/default-imports.constant';

describe('EmbeddedFunctionImplementationComponent', () => {
    const createComponent = createComponentFactory({
        component: EmbeddedFunctionImplementationComponent,
        imports: [
            ...defaultImportsConstant,

            CodeEditorModule,
            StoreModule.forRoot({})
        ],
        providers: [
            { provide: PROCESS_BUILDER_CONFIG_TOKEN, useValue: {} },
            {
                provide: ControlContainer, useFactory: () => ({
                    control: new FormGroup({
                        functionCanFail: new FormControl(),
                        functionImplementation: new FormControl(null),
                        functionName: new FormControl(''),
                        outputIsArray: new FormControl(false),
                        outputParamName: new FormControl(''),
                        outputParamInterface: new FormControl(''),
                        outputParamType: new FormControl(''),
                    })
                })
            }
        ]
    });

    let spectator: Spectator<EmbeddedFunctionImplementationComponent>;

    beforeEach(() => spectator = createComponent());

    it('should create', () => {
        expect(spectator.component).toBeTruthy();
    });

    it('should correctly update interface control', () => {
        spectator.component.formGroup.controls.functionImplementation!.setValue(CodemirrorRepository.stringToTextLeaf([
            'async (injector) => {',
            'return injector.mySolution',
            '}'
        ]));

        expect(spectator.component).toBeTruthy();
    });
});
