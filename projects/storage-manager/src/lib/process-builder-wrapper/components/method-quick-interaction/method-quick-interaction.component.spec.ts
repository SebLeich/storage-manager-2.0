import { PROCESS_BUILDER_CONFIG_TOKEN } from 'src/lib/process-builder/interfaces/process-builder-config.interface';
import { BpmnJsService } from 'src/lib/process-builder/services/bpmn-js.service';
import { MethodQuickInteractionComponent } from './method-quick-interaction.component';
import { ControlContainer, FormGroup, FormGroupDirective } from '@angular/forms';
import { TaskCreationFormGroup } from 'src/lib/process-builder/interfaces/task-creation-form-group-value.interface';
import { Spectator, createComponentFactory } from '@ngneat/spectator';

import defaultImportsConstant from 'src/app/default-imports.constant';
import { BPMN_JS_PROVIDER } from '@/lib/process-builder/globals/bpm-js-provider.const';
import { ConfirmationService } from '@/lib/confirmation/services/confirmation.service';



describe('MethodQuickInteractionComponent', () => {
    const createComponent = createComponentFactory({
        component: MethodQuickInteractionComponent,
        imports: [
            ...defaultImportsConstant
        ],
        providers: [
            BpmnJsService,
            BPMN_JS_PROVIDER(),
            ConfirmationService,
            { provide: PROCESS_BUILDER_CONFIG_TOKEN, useValue: {} },
            {
                provide: ControlContainer,
                useFactory: () => {
                    const directive = {
                        control: new FormGroup({}) as TaskCreationFormGroup
                    } as FormGroupDirective;
                    return directive;
                }
            }
        ]
    });

    let spectator: Spectator<MethodQuickInteractionComponent>;

    beforeEach(() => spectator = createComponent());

    it('should create', () => {
        expect(spectator.component).toBeTruthy();
    });
});
