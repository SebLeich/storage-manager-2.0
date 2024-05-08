// @ts-ignore
import * as BpmnJS from 'bpmn-js/dist/bpmn-modeler.production.min.js';

// @ts-ignore
import customBPMNJSModule from '../extensions/bpmn-js';

// @ts-ignore
import gridModule from "../extensions/bpmn-js/grid";

// @ts-ignore
import CliModule from 'bpmn-js-cli';

// @ts-ignore
import * as tooltips from "diagram-js/lib/features/tooltips";

import { BPMN_JS } from '../injection-token';

import sebleichProcessBuilderExtension from './sebleich-process-builder-extension';

export const BPMN_JS_PROVIDER = () => ({
    provide: BPMN_JS,
    useFactory: () => (new BpmnJS({
        additionalModules: [
            customBPMNJSModule,
            gridModule,
            CliModule,
            tooltips
        ],
        cli: {
            bindTo: 'cli'
        },
        moddleExtensions: {
            processBuilderExtension: sebleichProcessBuilderExtension
        }
    }))
})