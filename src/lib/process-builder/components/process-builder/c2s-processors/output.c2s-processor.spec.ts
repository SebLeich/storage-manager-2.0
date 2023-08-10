import { Store } from "@ngrx/store";
import { OutputC2SProcessor } from "./output.c2s-processor";
import { TestBed } from "@angular/core/testing";
import defaultImportsConstant from "@/app/default-imports.constant";
import { ProcessBuilderModule } from "@/lib/process-builder/process-builder.module";
import { provideMockStore } from "@ngrx/store/testing";
import INITIAL_STATE from "../testing/inititial-state.constant";
import { ProcessBuilderComponentService } from "../process-builder-component.service";
import { FUNCTIONS_CONFIG_TOKEN, PROCESS_BUILDER_CONFIG_TOKEN } from "@/lib/process-builder/interfaces";
import processBuilderConfig from "@/config/process-builder-config";

describe('OutputC2SProcessor', () => {
    let processor: OutputC2SProcessor;
    let store: Store;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                ...defaultImportsConstant,
                ProcessBuilderModule
            ],
            providers: [
                provideMockStore({ initialState: INITIAL_STATE }),
                ProcessBuilderComponentService,
                { provide: PROCESS_BUILDER_CONFIG_TOKEN, useValue: processBuilderConfig },
                { provide: FUNCTIONS_CONFIG_TOKEN, useValue: [] },
                OutputC2SProcessor
            ]
        });
        processor = TestBed.inject(OutputC2SProcessor);
        store = TestBed.inject(Store);
    });

    it('should create', () => {
        expect(processor).toBeTruthy();
    });

});