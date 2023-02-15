import { IElement } from "src/lib/bpmn-io/interfaces/element.interface";
import shapeTypes from "src/lib/bpmn-io/shape-types";
import { IAutoPlace } from "../interfaces/auto-place.interface";
import { IPaletteEntry } from "./palette-entry.interface";
import { ContextPaletteEntryType } from "./palette-entry.type";

export default class CustomPalette {
    public static $inject = [
        'autoPlace',
        'create',
        'elementFactory',
        'palette',
        'handTool',
        'lassoTool',
        'spaceTool',
        'globalConnect'
    ];
    constructor(public autoPlace: IAutoPlace, public create: any, public elementFactory: any, palette: any, public handTool: any, public lassoTool: any, public spaceTool: any, public globalConnect: any) {
        palette.registerProvider(this);
    }

    public getPaletteEntries(): { [key: string]: any } {
        let palette: { [key in ContextPaletteEntryType]?: IPaletteEntry } = {
            'hand-tool': {
                group: 'tools',
                className: 'bpmn-icon-hand-tool',
                title: 'Activate the hand tool',
                action: (event) => this.handTool.activateHand(event)
            },
            'lasso-tool': {
                group: 'tools',
                className: 'bpmn-icon-lasso-tool',
                title: 'Activate the lasso tool',
                action: (event) => this.lassoTool.activateSelection(event)
            },
            'space-tool': {
                group: 'tools',
                className: 'bpmn-icon-space-tool',
                title: 'Activate the create/remove space tool',
                action: (event) => this.spaceTool.activateSelection(event)
            },
            'global-connect-tool': {
                group: 'tools',
                className: 'bpmn-icon-connection-multi',
                title: 'Connect elements',
                action: (event) => this.globalConnect.toggle(event)
            },
            'create.start-event': {
                action: (event: PointerEvent) => {
                    const shape = this.elementFactory.createShape({ type: shapeTypes.StartEvent });
                    this.create.start(event, shape);
                },
                className: 'bpmn-icon-start-event-none',
                group: 'model',
                title: 'Create start event'
            },
            'create.task': {
                action: (event: PointerEvent) => {
                    const shape = this.elementFactory.createShape({ type: shapeTypes.Task });
                    this.create.start(event, shape);
                },
                className: 'bpmn-icon-task',
                group: 'model',
                title: 'Create task'
            },
            'create.exclusive-gateway': {
                action: (event: PointerEvent) => {
                    const shape = this.elementFactory.createShape({ type: shapeTypes.ExclusiveGateway });
                    this.create.start(event, shape);
                },
                className: 'bpmn-icon-gateway-xor',
                group: 'model',
                title: 'Create exclusive gateway'
            },
            'create.end-event': {
                action: (event: PointerEvent) => {
                    const shape = this.elementFactory.createShape({ type: shapeTypes.EndEvent });
                    this.create.start(event, shape);
                },
                className: 'bpmn-icon-end-event-none',
                group: 'model',
                title: 'Create end event'
            },
        };
        return palette;
    }
}
