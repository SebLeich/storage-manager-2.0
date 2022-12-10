import { IViewbox } from "src/lib/bpmn-io/interfaces/viewbox.interface";

export interface IBpmnJSModel {
    guid: string;
    name: string | null;
    description: string | null;
    created: string | null;
    xml: string;
    lastModified: string;
    viewbox?: IViewbox | undefined;
}
