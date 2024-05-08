import { EmbeddedInputParamSelectionComponent } from './embedded-input-param-selection.component';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { PROCESS_BUILDER_CONFIG_TOKEN } from '@/lib/process-builder/interfaces';
import { ControlContainer, FormControl, FormGroup } from '@angular/forms';

import defaultImportsConstant from '@/app/default-imports.constant';

describe('EmbeddedInputParamSelectionComponent', () => {
    const createComponent = createComponentFactory({
        component: EmbeddedInputParamSelectionComponent,
        imports: [
            ...defaultImportsConstant,
        ],
        providers: [
            { provide: PROCESS_BUILDER_CONFIG_TOKEN, useValue: {} },
            {
                provide: ControlContainer, useFactory: () => ({
                    control: new FormGroup({
                        functionIdentifier: new FormControl(),
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

    let spectator: Spectator<EmbeddedInputParamSelectionComponent>;

    beforeEach(() => spectator = createComponent());

    it('should create', () => {
        expect(spectator.component).toBeTruthy();
    });
});
