import { FUNCTIONS_CONFIG_TOKEN } from 'src/lib/process-builder/interfaces/function.interface';
import { PROCESS_BUILDER_CONFIG_TOKEN } from 'src/lib/process-builder/interfaces/process-builder-config.interface';
import { BpmnJsService } from 'src/lib/process-builder/services/bpmn-js.service';
import { ProcessBuilderWrapperComponent } from './process-builder-wrapper.component';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { BPMN_JS_PROVIDER } from '@/lib/process-builder/globals/bpm-js-provider.const';
import { ConfirmationService } from '@/lib/confirmation/services/confirmation.service';

import defaultImportsConstant from 'src/app/default-imports.constant';
import { ProcessBuilderService } from '@/lib/process-builder/services/process-builder.service';
import { MarkdownEditorComponent } from '@/lib/markdown-editor/components/markdown-editor/markdown-editor.component';
import { ProcessBuilderComponent } from '@/lib/process-builder/components/process-builder/process-builder.component';
import { QuillModule } from 'ngx-quill';



describe('ProcessBuilderWrapperComponent', () => {
    const createComponent = createComponentFactory({
        component: ProcessBuilderWrapperComponent,
        declarations: [
            MarkdownEditorComponent,
            ProcessBuilderComponent
        ],
        imports: [
            ...defaultImportsConstant,

            QuillModule.forRoot({
                modules: {
                    history: {
                        delay: 2000,
                        maxStack: 500,
                        userOnly: true
                    }
                }
            }),
        ],
        providers: [
            BpmnJsService,
            BPMN_JS_PROVIDER(),
            ConfirmationService,
            ProcessBuilderService,
            { provide: PROCESS_BUILDER_CONFIG_TOKEN, useValue: {} },
            { provide: FUNCTIONS_CONFIG_TOKEN, useValue: [] },
        ]
    });

    let spectator: Spectator<ProcessBuilderWrapperComponent>;

    beforeEach(() => spectator = createComponent());

    it('should create', () => {
        expect(spectator.component).toBeTruthy();
    });
});
