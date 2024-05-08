import { PROCESS_BUILDER_CONFIG_TOKEN } from 'src/lib/process-builder/interfaces/process-builder-config.interface';
import { EmbeddedParamEditorComponent } from './embedded-param-editor.component';
import { Spectator, createComponentFactory } from '@ngneat/spectator';

import defaultImportsConstant from 'src/app/default-imports.constant';

describe('EmbeddedParamEditorComponent', () => {
    let spectator: Spectator<EmbeddedParamEditorComponent>;
    const createComponent = createComponentFactory({
        component: EmbeddedParamEditorComponent,
        imports: [...defaultImportsConstant],
        providers: [
            { provide: PROCESS_BUILDER_CONFIG_TOKEN, useValue: {} }
        ]
    });

    beforeEach(() => spectator = createComponent());

    it('should create', () => {
        expect(spectator.component).toBeTruthy();
    });
});
