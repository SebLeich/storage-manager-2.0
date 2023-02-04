// @ts-ignore
import BaseRenderer from 'diagram-js/lib/draw/BaseRenderer';

import {
    append as svgAppend,
    attr as svgAttr,
    create as svgCreate,
    remove as svgRemove
} from 'tiny-svg';

import { BPMNJsRepository } from 'src/lib/core/bpmn-js.repository';

// @ts-ignore
import { isAny } from 'bpmn-js/lib/features/modeling/util/ModelingUtil';
import shapeTypes from 'src/lib/bpmn-io/shape-types';

const HIGH_PRIORITY = 1500;

export default class CustomRenderer extends BaseRenderer {

    static $inject = ['eventBus', 'bpmnRenderer'];
    public eventBus: any;
    public bpmnRenderer: any;

    constructor(eventBus: any, bpmnRenderer: any) {
        super(eventBus, HIGH_PRIORITY);

        this.eventBus = eventBus;
        this.bpmnRenderer = bpmnRenderer;
    }

    canRender(element: any) {
        return isAny(element, [shapeTypes.DataObjectReference]) && !element.labelTarget;
    }

    drawShape(parentNode: any, element: any) {

        const shape = this.bpmnRenderer.drawShape(parentNode, element);

        let matchesProcessOutputInterface = BPMNJsRepository.getSLPBExtension(element.businessObject, 'DataObjectExtension', (ext) => ext.matchesProcessOutputInterface), isProcessOutput = BPMNJsRepository.getSLPBExtension(element.businessObject, 'DataObjectExtension', (ext) => ext.isProcessOutput);

        if (matchesProcessOutputInterface) {
            let transform = 'translate(-10, 0)';
            const rect = CustomRenderer.drawRect(parentNode, 20, 20, CustomRenderer.TASK_BORDER_RADIUS, '#e8e8e8');
            svgAttr(rect, { transform: transform });
            if (isProcessOutput) {
                const checkmark = CustomRenderer.drawCheckmark(parentNode, '#4d7a25');
                svgAttr(checkmark, { transform: transform });
            }
        }

        return shape;
    }

    static TASK_BORDER_RADIUS = 2;
    static drawRect(parentNode: any, width: any, height: any, borderRadius: any, strokeColor: any) {

        const rect = svgCreate('rect');

        svgAttr(rect, {
            width: width,
            height: height,
            rx: borderRadius,
            ry: borderRadius,
            stroke: strokeColor || '#000',
            strokeWidth: 2,
            fill: '#fff',

        });

        svgAppend(parentNode, rect);

        return rect;
    }
    static drawCheckmark(parentNode: any, strokeColor: any) {

        const checkmark = svgCreate('path');

        svgAttr(checkmark, {
            stroke: strokeColor || '#000',
            strokeWidth: 3,
            fill: '#fff',
            d: 'M 4 9 l 4 4 l 8 -8'
        });

        svgAppend(parentNode, checkmark);

        return checkmark;
    }
    static prependTo(newNode: any, parentNode: any, siblingNode: any) {
        parentNode.insertBefore(newNode, siblingNode || parentNode.firstChild);
    }

}
