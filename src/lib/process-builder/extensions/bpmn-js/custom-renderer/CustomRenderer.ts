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
import { Shape } from 'diagram-js/lib/model';

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

    drawShape(parentNode: SVGElement, element: Shape): SVGElement {
        const shape = this.bpmnRenderer.drawShape(parentNode, element),
            matchesProcessOutputInterface = BPMNJsRepository.getSLPBExtension(element.businessObject, 'DataObjectExtension', (ext) => ext.matchesProcessOutputInterface),
            isProcessOutput = BPMNJsRepository.getSLPBExtension(element.businessObject, 'DataObjectExtension', (ext) => ext.isProcessOutput);

        if (matchesProcessOutputInterface) {
            let transform = 'translate(-10, 0)';
            const rect = CustomRenderer.drawRect(parentNode, 20, 20, CustomRenderer.TASK_BORDER_RADIUS, '#e8e8e8');
            svgAttr(rect, { transform: transform });
            if (isProcessOutput) {
                const checkmark = CustomRenderer.drawCheckmark(parentNode, 20, 20);
                svgAttr(checkmark, { transform: transform });
            }
        }

        return shape;
    }

    static TASK_BORDER_RADIUS = 10;
    static drawRect(parentNode: any, width: number, height: number, borderRadius: any, strokeColor: string = '#000', fillColor: string = '#fff') {
        const rect = svgCreate('rect');
        svgAttr(rect, {
            width: width,
            height: height,
            rx: borderRadius,
            ry: borderRadius,
            stroke: strokeColor,
            strokeWidth: 2,
            fill: fillColor,
        });
        svgAppend(parentNode, rect);
        return rect;
    }
    static drawCheckmark(parentNode: any, width: number, height: number) {
        const checkMark = svgCreate('path');
        svgAttr(checkMark, {
            d: `M${width / 4} ${height / 2}, L${width / 2} ${height - 4}, L${width} 4`,
            style: 'stroke: #7cbe4f;stroke-width:3;fill:none;'
        });
        svgAppend(parentNode, checkMark);
        return checkMark;
    }
    static prependTo(newNode: any, parentNode: any, siblingNode: any) {
        parentNode.insertBefore(newNode, siblingNode || parentNode.firstChild);
    }

}
