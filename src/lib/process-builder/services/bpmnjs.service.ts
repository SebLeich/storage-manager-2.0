import { Injectable } from '@angular/core';

// @ts-ignore
import * as BpmnJS from 'bpmn-js/dist/bpmn-modeler.production.min.js';

// @ts-ignore
import gridModule from "diagram-js/lib/features/grid-snapping/visuals";

// @ts-ignore
import CliModule from 'bpmn-js-cli';

// @ts-ignore
import * as tooltips from "diagram-js/lib/features/tooltips";

// @ts-ignore
import customRendererModule from '../extensions/custom-renderer';

import sebleichProcessBuilderExtension from '../globals/sebleich-process-builder-extension';
import { IBpmnJS } from '../globals/i-bpmn-js';
import { getElementRegistryModule, getTooltipModule } from 'src/lib/bpmn-io/bpmn-modules';


@Injectable()
export class BpmnjsService {

  public bpmnjs: IBpmnJS = new BpmnJS({
    additionalModules: [
      customRendererModule,
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
  });

  public get elementRegistry() {
    return getElementRegistryModule(this.bpmnjs);
  }

  public get tooltipModule() {
    return getTooltipModule(this.bpmnjs);
  }
}
