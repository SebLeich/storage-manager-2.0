import { ConfirmationService } from '@/lib/confirmation/services/confirmation.service';
import { BPMN_JS_PROVIDER } from '../../globals/bpm-js-provider.const';
import { FUNCTIONS_CONFIG_TOKEN } from '../../interfaces/function.interface';
import { PROCESS_BUILDER_CONFIG_TOKEN } from '../../interfaces/process-builder-config.interface';
import { BpmnJsService } from '../../services/bpmn-js.service';
import { ProcessBuilderService } from '../../services/process-builder.service';
import { ProcessBuilderComponent } from './process-builder.component';
import { Spectator, createComponentFactory } from '@ngneat/spectator';

import defaultImportsConstant from 'src/app/default-imports.constant';



describe('ProcessBuilderComponent', () => {
    const createComponent = createComponentFactory({
        component: ProcessBuilderComponent,
        imports: [...defaultImportsConstant],
        providers: [
            BPMN_JS_PROVIDER(),
            BpmnJsService,
            ConfirmationService,
            ProcessBuilderService,
            { provide: FUNCTIONS_CONFIG_TOKEN, useValue: [] },
            { provide: PROCESS_BUILDER_CONFIG_TOKEN, useValue: {} },
        ]
    });

    let spectator: Spectator<ProcessBuilderComponent>;

    beforeEach(() => spectator = createComponent());

    it('should create', () => {
        expect(spectator.component).toBeTruthy();
    });
}); 
