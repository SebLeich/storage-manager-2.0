import { IViewbox } from "src/lib/bpmn-io/i-viewbox";

export interface IBpmnJSModel {
    guid: string;
    name: string | null;
    description: string | null;
    created: string | null;
    xml: string;
    lastModified: string;
    viewbox?: IViewbox;
}
